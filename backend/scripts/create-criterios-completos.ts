import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Buscando fonte de dados...');
  const fonte = await prisma.fonteDados.findUnique({
    where: { id: 'fonte-sistema' },
  });

  if (!fonte) {
    throw new Error('Fonte de dados não encontrada');
  }

  console.log('Atualizando critério de Produção Legislativa...');
  await prisma.criterioAvaliacao.update({
    where: { codigo: 'producao' },
    data: {
      peso: 0.20, // Ajustando de 30% para 20%
      descricao: 'Avalia proposições e projetos apresentados. Peso ajustado para 20% conforme documentação.',
    },
  });

  console.log('Criando critério: Relatoria...');
  await prisma.criterioAvaliacao.upsert({
    where: { codigo: 'relatoria' },
    update: {},
    create: {
      codigo: 'relatoria',
      nome: 'Relatoria',
      descricao: 'Mede a capacidade de conduzir e acompanhar temas relevantes em comissões.',
      peso: 0.15,
      ordem: 3,
      fontePrincipalId: fonte.id,
    },
  });

  console.log('Criando critério: Participação em votações...');
  await prisma.criterioAvaliacao.upsert({
    where: { codigo: 'votacoes' },
    update: {},
    create: {
      codigo: 'votacoes',
      nome: 'Participação em votações',
      descricao: 'Mede o engajamento do parlamentar no processo legislativo.',
      peso: 0.15,
      ordem: 4,
      fontePrincipalId: fonte.id,
    },
  });

  console.log('Criando critério: Transparência e prestação de contas...');
  await prisma.criterioAvaliacao.upsert({
    where: { codigo: 'transparencia' },
    update: {},
    create: {
      codigo: 'transparencia',
      nome: 'Transparência e prestação de contas',
      descricao: 'Mede a clareza da atuação pública e a disponibilidade de informações.',
      peso: 0.15,
      ordem: 5,
      fontePrincipalId: fonte.id,
    },
  });

  console.log('Criando critério: Atendimento ao eleitor...');
  await prisma.criterioAvaliacao.upsert({
    where: { codigo: 'atendimento' },
    update: {},
    create: {
      codigo: 'atendimento',
      nome: 'Atendimento ao eleitor e conexão com a base',
      descricao: 'Mede a relação com a população representada.',
      peso: 0.10,
      ordem: 6,
      fontePrincipalId: fonte.id,
    },
  });

  console.log('\nCritérios criados/atualizados com sucesso!');
  
  const criterios = await prisma.criterioAvaliacao.findMany({
    orderBy: { ordem: 'asc' },
  });
  
  console.log('\nLista de critérios:');
  criterios.forEach(c => {
    console.log(`- ${c.nome} (${c.codigo}): Peso ${(c.peso * 100).toFixed(0)}%`);
  });
  
  const pesoTotal = criterios.reduce((sum, c) => sum + c.peso, 0);
  console.log(`\nPeso total: ${(pesoTotal * 100).toFixed(0)}%`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
