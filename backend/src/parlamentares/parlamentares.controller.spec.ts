import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParlamentaresController } from './parlamentares.controller.js';
import { ParlamentaresService } from './parlamentares.service.js';

describe('ParlamentaresController', () => {
  let controller: ParlamentaresController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParlamentaresController],
      providers: [ParlamentaresService, PrismaService],
    }).compile();

    controller = module.get<ParlamentaresController>(ParlamentaresController);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.parlamentar.create({
      data: {
        nome: 'Ana Souza',
        cargo: 'deputada',
        uf: 'SP',
        partido: 'PT',
        ativo: true,
      },
    });
  });

  afterEach(async () => {
    await prisma.parlamentar.deleteMany();
    await prisma.$disconnect();
  });

  it('should return a list of parliamentarians', async () => {
    const result = await controller.findAll();

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: 'Ana Souza',
          cargo: 'deputada',
        }),
      ]),
    );
  });

  it('should return an empty list when the search does not match any parliamentarian', async () => {
    const result = await controller.findAll({
      search: 'nome-que-nao-existe',
      cargo: 'deputada',
      uf: 'SP',
    });

    expect(result).toEqual([]);
  });

  it('should create a parliamentarian', async () => {
    const result = await controller.create({
      nome: 'Carla Mendes',
      cargo: 'deputada',
      uf: 'MG',
      partido: 'PSDB',
    });

    expect(result).toEqual(
      expect.objectContaining({
        nome: 'Carla Mendes',
        cargo: 'deputada',
        uf: 'MG',
      }),
    );
  });

  it('should update a parliamentarian', async () => {
    const created = await controller.create({
      nome: 'Luna Costa',
      cargo: 'senadora',
      uf: 'PR',
      partido: 'PSD',
    });

    const result = await controller.update(created.id, {
      nome: 'Luna Costa Silva',
      partido: 'PSOL',
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: created.id,
        nome: 'Luna Costa Silva',
        partido: 'PSOL',
      }),
    );
  });

  it('should remove a parliamentarian', async () => {
    const created = await controller.create({
      nome: 'Nilo Peixoto',
      cargo: 'deputado',
      uf: 'CE',
      partido: 'REPUBLICANOS',
    });

    const result = await controller.remove(created.id);

    expect(result).toEqual(
      expect.objectContaining({
        id: created.id,
      }),
    );

    await expect(controller.findOne(created.id)).rejects.toThrow();
  });
});
