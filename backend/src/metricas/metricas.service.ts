import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMetricaDto } from './dto/create-metrica.dto.js';
import { UpdateMetricaDto } from './dto/update-metrica.dto.js';

@Injectable()
export class MetricasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.metricasParlamentar.findMany({
      orderBy: { dataReferencia: 'desc' },
      include: {
        parlamentar: true,
        criterio: true,
        fonteDado: true,
      },
    });
  }

  async create(data: CreateMetricaDto) {
    return this.prisma.metricasParlamentar.create({
      data: {
        parlamentarId: data.parlamentarId,
        criterioId: data.criterioId,
        fonteDadoId: data.fonteDadoId,
        valor: data.valor,
        nota: data.nota,
        unidade: data.unidade,
        observacao: data.observacao,
        dataReferencia: data.dataReferencia ? new Date(data.dataReferencia) : undefined,
      },
    });
  }

  async findOne(id: string) {
    const metrica = await this.prisma.metricasParlamentar.findUnique({
      where: { id },
      include: {
        parlamentar: true,
        criterio: true,
        fonteDado: true,
      },
    });

    if (!metrica) {
      throw new NotFoundException(`Métrica com id ${id} não encontrada.`);
    }

    return metrica;
  }

  async update(id: string, data: UpdateMetricaDto) {
    await this.findOne(id);

    return this.prisma.metricasParlamentar.update({
      where: { id },
      data: {
        parlamentarId: data.parlamentarId,
        criterioId: data.criterioId,
        fonteDadoId: data.fonteDadoId,
        valor: data.valor,
        nota: data.nota,
        unidade: data.unidade,
        observacao: data.observacao,
        dataReferencia: data.dataReferencia ? new Date(data.dataReferencia) : undefined,
      },
    });
  }

  async remove(id: string) {
    const metrica = await this.findOne(id);

    await this.prisma.metricasParlamentar.delete({
      where: { id },
    });

    return metrica;
  }
}
