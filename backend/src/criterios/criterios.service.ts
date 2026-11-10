import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCriterioDto } from './dto/create-criterio.dto.js';
import { UpdateCriterioDto } from './dto/update-criterio.dto.js';

@Injectable()
export class CriteriosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.criterioAvaliacao.findMany({
      orderBy: { ordem: 'asc' },
      include: {
        fontePrincipal: true,
      },
    });
  }

  async create(data: CreateCriterioDto) {
    return this.prisma.criterioAvaliacao.create({
      data: {
        codigo: data.codigo,
        nome: data.nome,
        descricao: data.descricao,
        peso: data.peso,
        ordem: data.ordem,
        fontePrincipalId: data.fontePrincipalId,
      },
    });
  }

  async findOne(id: string) {
    const criterio = await this.prisma.criterioAvaliacao.findUnique({
      where: { id },
      include: {
        fontePrincipal: true,
      },
    });

    if (!criterio) {
      throw new NotFoundException(`Critério com id ${id} não encontrado.`);
    }

    return criterio;
  }

  async update(id: string, data: UpdateCriterioDto) {
    await this.findOne(id);

    return this.prisma.criterioAvaliacao.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const criterio = await this.findOne(id);

    await this.prisma.criterioAvaliacao.delete({
      where: { id },
    });

    return criterio;
  }
}
