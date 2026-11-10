import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { RankingController } from './ranking.controller.js';
import { RankingService } from './ranking.service.js';

describe('RankingController', () => {
  let controller: RankingController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [RankingService, PrismaService],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    prisma = module.get<PrismaService>(PrismaService);

    const parlamentar = await prisma.parlamentar.create({
      data: {
        nome: 'Ana Souza',
        cargo: 'deputada',
        uf: 'SP',
        partido: 'PT',
        ativo: true,
      },
    });

    await prisma.rankingGeral.create({
      data: {
        parlamentarId: parlamentar.id,
        periodo: '2025',
        posicao: 1,
        notaFinal: 8.75,
      },
    });
  });

  afterEach(async () => {
    await prisma.rankingGeral.deleteMany();
    await prisma.parlamentar.deleteMany();
    await prisma.$disconnect();
  });

  it('should return the ranking for a given period', async () => {
    const result = await controller.findByPeriodo('2025');

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          periodo: '2025',
          posicao: 1,
          notaFinal: 8.75,
        }),
      ]),
    );
  });

  it('should filter the rank by parliamentary attributes', async () => {
    const result = await controller.findAll({
      periodo: '2025',
      cargo: 'deputada',
      uf: 'SP',
      partido: 'PT',
    });

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          periodo: '2025',
          parlamentar: expect.objectContaining({
            nome: 'Ana Souza',
            cargo: 'deputada',
            uf: 'SP',
            partido: 'PT',
          }),
        }),
      ]),
    );
  });
});
