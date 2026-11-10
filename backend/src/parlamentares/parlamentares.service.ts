import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateParlamentarDto } from './dto/create-parlamentar.dto.js';
import { UpdateParlamentarDto } from './dto/update-parlamentar.dto.js';

export interface ParlamentarFilters {
  search?: string;
  cargo?: string;
  uf?: string;
  partido?: string;
}

@Injectable()
export class ParlamentaresService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: ParlamentarFilters = {}) {
    const where = {
      ...(filters.cargo ? { cargo: { equals: filters.cargo.trim() } } : {}),
      ...(filters.uf ? { uf: { equals: filters.uf.trim() } } : {}),
      ...(filters.partido ? { partido: { equals: filters.partido.trim() } } : {}),
      ...(filters.search
        ? {
            OR: [
              { nome: { contains: filters.search.trim() } },
              { cargo: { contains: filters.search.trim() } },
              { uf: { contains: filters.search.trim() } },
              { partido: { contains: filters.search.trim() } },
            ],
          }
        : {}),
    };

    return this.prisma.parlamentar.findMany({
      where,
      orderBy: { nome: 'asc' },
      include: {
        metricas: true,
        historicoNotas: true,
      },
    });
  }

  async create(data: CreateParlamentarDto) {
    return this.prisma.parlamentar.create({
      data: {
        nome: data.nome,
        cargo: data.cargo,
        uf: data.uf,
        partido: data.partido,
        fotoUrl: data.fotoUrl,
        perfilUrl: data.perfilUrl,
        ativo: data.ativo ?? true,
      },
    });
  }

  async findOne(id: string) {
    const parlamentar = await this.prisma.parlamentar.findUnique({
      where: { id },
      include: {
        metricas: {
          include: {
            criterio: true,
          },
        },
        historicoNotas: true,
      },
    });

    if (!parlamentar) {
      throw new NotFoundException(`Parlamentar com id ${id} não encontrado.`);
    }

    return parlamentar;
  }

  async update(id: string, data: UpdateParlamentarDto) {
    await this.findOne(id);

    return this.prisma.parlamentar.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const parlamentar = await this.findOne(id);

    await this.prisma.parlamentar.delete({
      where: { id },
    });

    return parlamentar;
  }
}
