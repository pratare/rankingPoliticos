import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const totalMetricas = await prisma.metricasParlamentar.count();
  console.log(`Total de métricas no banco: ${totalMetricas}`);
  
  const criterios = await prisma.criterioAvaliacao.findMany({
    orderBy: { ordem: 'asc' },
  });
  
  console.log('\nMétricas por critério:');
  for (const criterio of criterios) {
    const count = await prisma.metricasParlamentar.count({
      where: { criterioId: criterio.id }
    });
    
    const media = await prisma.metricasParlamentar.aggregate({
      where: { criterioId: criterio.id },
      _avg: { nota: true }
    });
    
    console.log(`- ${criterio.nome} (${criterio.codigo}): ${count} métricas, média nota: ${media._avg.nota?.toFixed(2) || 0}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
