import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface RankingFilters {
  periodo?: string;
  cargo?: string;
  uf?: string;
  partido?: string;
}

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: RankingFilters = {}) {
    const where = {
      ...(filters.periodo ? { periodo: { equals: filters.periodo.trim() } } : {}),
      ...(filters.cargo || filters.uf || filters.partido
        ? {
            parlamentar: {
              is: {
                ...(filters.cargo ? { cargo: { equals: filters.cargo.trim() } } : {}),
                ...(filters.uf ? { uf: { equals: filters.uf.trim() } } : {}),
                ...(filters.partido
                  ? { partido: { equals: filters.partido.trim() } }
                  : {}),
              },
            },
          }
        : {}),
    };

    return this.prisma.rankingGeral.findMany({
      where,
      orderBy: [{ periodo: 'desc' }, { posicao: 'asc' }],
      include: {
        parlamentar: true,
      },
    });
  }

  async findByPeriodo(periodo: string, filters: Omit<RankingFilters, 'periodo'> = {}) {
    // Tenta buscar ranking pré-calculado primeiro
    let ranking = await this.prisma.rankingGeral.findMany({
      where: {
        periodo,
        ...(filters.cargo || filters.uf || filters.partido
          ? {
              parlamentar: {
                is: {
                  ...(filters.cargo ? { cargo: { equals: filters.cargo.trim() } } : {}),
                  ...(filters.uf ? { uf: { equals: filters.uf.trim() } } : {}),
                  ...(filters.partido
                    ? { partido: { equals: filters.partido.trim() } }
                    : {}),
                },
              },
            }
          : {}),
      },
      orderBy: { posicao: 'asc' },
      include: {
        parlamentar: true,
      },
    });

    // Se não encontrar ranking pré-calculado, calcula dinamicamente
    if (!ranking.length) {
      ranking = await this.calculateRanking(periodo, filters);
    }

    return ranking;
  }

  private async calculateRanking(periodo: string, filters: Omit<RankingFilters, 'periodo'> = {}) {
    // Busca todos os critérios com seus pesos
    const criterios = await this.prisma.criterioAvaliacao.findMany({
      orderBy: { ordem: 'asc' },
    });

    if (!criterios.length) {
      throw new NotFoundException('Critérios de avaliação não encontrados.');
    }

    // Busca todos os parlamentares com filtros
    const parlamentares = await this.prisma.parlamentar.findMany({
      where: {
        ...(filters.cargo ? { cargo: { equals: filters.cargo.trim() } } : {}),
        ...(filters.uf ? { uf: { equals: filters.uf.trim() } } : {}),
        ...(filters.partido ? { partido: { equals: filters.partido.trim() } } : {}),
      },
    });

    if (!parlamentares.length) {
      throw new NotFoundException('Nenhum parlamentar encontrado com os filtros informados.');
    }

    // Calcula nota final para cada parlamentar
    const rankingCalculado = await Promise.all(
      parlamentares.map(async (parlamentar) => {
        // Busca métricas do parlamentar
        const metricas = await this.prisma.metricasParlamentar.findMany({
          where: {
            parlamentarId: parlamentar.id,
            criterioId: { in: criterios.map(c => c.id) },
          },
        });

        // Calcula nota final ponderada
        let notaFinal = 0;
        let pesoTotal = 0;
        let metricasComNota = 0;

        criterios.forEach(criterio => {
          const metrica = metricas.find(m => m.criterioId === criterio.id);
          if (metrica && metrica.nota !== null) {
            notaFinal += (criterio.peso * metrica.nota);
            pesoTotal += criterio.peso;
            metricasComNota++;
          }
        });

        // Normaliza a nota final se houver critérios sem nota
        if (pesoTotal > 0) {
          notaFinal = notaFinal / pesoTotal;
        }

        return {
          id: `${parlamentar.id}-${periodo}`, // ID composto temporário
          parlamentarId: parlamentar.id,
          periodo,
          posicao: 0, // Será definido após ordenação
          notaFinal: Number(notaFinal.toFixed(2)),
          parlamentar,
        };
      })
    );

    // Ordena por nota final (decrescente)
    rankingCalculado.sort((a, b) => b.notaFinal - a.notaFinal);

    // Atribui posições
    rankingCalculado.forEach((item, index) => {
      item.posicao = index + 1;
    });

    // Salva no banco (opcional - descomente se quiser persistir)
    // await this.prisma.rankingGeral.createMany({
    //   data: rankingCalculado.map(r => ({
    //     parlamentarId: r.parlamentarId,
    //     periodo: r.periodo,
    //     posicao: r.posicao,
    //     notaFinal: r.notaFinal,
    //   })),
    //   skipDuplicates: true,
    // });

    return rankingCalculado;
  }
}
