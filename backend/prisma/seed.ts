import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const dataReferencia = new Date('2026-01-01T00:00:00.000Z');

  const fonte = await prisma.fonteDados.upsert({
    where: { id: 'fonte-sistema' },
    update: {},
    create: {
      id: 'fonte-sistema',
      nome: 'Dados públicos oficiais',
      tipo: 'governo',
      descricao: 'Fonte base para a avaliação inicial do ranking.',
      url: 'https://www.gov.br/',
    },
  });

  const criterioPresenca = await prisma.criterioAvaliacao.upsert({
    where: { codigo: 'presenca' },
    update: {},
    create: {
      codigo: 'presenca',
      nome: 'Presença e comparecimento',
      descricao: 'Avalia presença em sessões e votações relevantes.',
      peso: 0.25,
      ordem: 1,
      fontePrincipalId: fonte.id,
    },
  });

  const criterioProducao = await prisma.criterioAvaliacao.upsert({
    where: { codigo: 'producao' },
    update: {},
    create: {
      codigo: 'producao',
      nome: 'Produção legislativa',
      descricao: 'Avalia proposições e projetos apresentados.',
      peso: 0.3,
      ordem: 2,
      fontePrincipalId: fonte.id,
    },
  });

  const parlamentar1 = await prisma.parlamentar.upsert({
    where: { id: 'parlamentar-ana' },
    update: {},
    create: {
      id: 'parlamentar-ana',
      nome: 'Ana Souza',
      cargo: 'deputada',
      uf: 'SP',
      partido: 'PT',
      perfilUrl: 'https://example.com/perfil/ana',
      fotoUrl: 'https://example.com/foto/ana.jpg',
      ativo: true,
    },
  });

  const parlamentar2 = await prisma.parlamentar.upsert({
    where: { id: 'parlamentar-bruno' },
    update: {},
    create: {
      id: 'parlamentar-bruno',
      nome: 'Bruno Lima',
      cargo: 'senador',
      uf: 'RJ',
      partido: 'PL',
      perfilUrl: 'https://example.com/perfil/bruno',
      fotoUrl: 'https://example.com/foto/bruno.jpg',
      ativo: true,
    },
  });

  await prisma.metricasParlamentar.upsert({
    where: {
      parlamentarId_criterioId_dataReferencia: {
        parlamentarId: parlamentar1.id,
        criterioId: criterioPresenca.id,
        dataReferencia,
      },
    },
    update: {},
    create: {
      parlamentarId: parlamentar1.id,
      criterioId: criterioPresenca.id,
      fonteDadoId: fonte.id,
      valor: 8.5,
      nota: 8.5,
      unidade: 'pontos',
      observacao: 'Registro inicial para demo.',
      dataReferencia,
    },
  });

  await prisma.metricasParlamentar.upsert({
    where: {
      parlamentarId_criterioId_dataReferencia: {
        parlamentarId: parlamentar1.id,
        criterioId: criterioProducao.id,
        dataReferencia,
      },
    },
    update: {},
    create: {
      parlamentarId: parlamentar1.id,
      criterioId: criterioProducao.id,
      fonteDadoId: fonte.id,
      valor: 8.7,
      nota: 8.7,
      unidade: 'pontos',
      observacao: 'Produção legislativa relevante.',
      dataReferencia,
    },
  });

  await prisma.rankingGeral.upsert({
    where: {
      periodo_parlamentarId: {
        periodo: '2026',
        parlamentarId: parlamentar1.id,
      },
    },
    update: {},
    create: {
      periodo: '2026',
      posicao: 1,
      notaFinal: 8.7,
      parlamentarId: parlamentar1.id,
    },
  });

  await prisma.rankingGeral.upsert({
    where: {
      periodo_parlamentarId: {
        periodo: '2026',
        parlamentarId: parlamentar2.id,
      },
    },
    update: {},
    create: {
      periodo: '2026',
      posicao: 2,
      notaFinal: 8.1,
      parlamentarId: parlamentar2.id,
    },
  });

  console.log('Seed concluída com dados de demonstração.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
