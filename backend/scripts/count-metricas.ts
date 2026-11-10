import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const totalMetricas = await prisma.metricasParlamentar.count();
  console.log(`Total de métricas no banco: ${totalMetricas}`);
  
  const metricasPresenca = await prisma.metricasParlamentar.count({
    where: { criterio: { codigo: 'presenca' } }
  });
  console.log(`Métricas de presença: ${metricasPresenca}`);
  
  const metricasProducao = await prisma.metricasParlamentar.count({
    where: { criterio: { codigo: 'producao' } }
  });
  console.log(`Métricas de produção: ${metricasProducao}`);
  
  // Verificar média das notas
  const mediaPresenca = await prisma.metricasParlamentar.aggregate({
    where: { criterio: { codigo: 'presenca' } },
    _avg: { nota: true }
  });
  console.log(`Média de notas de presença: ${mediaPresenca._avg.nota?.toFixed(2) || 0}`);
  
  const mediaProducao = await prisma.metricasParlamentar.aggregate({
    where: { criterio: { codigo: 'producao' } },
    _avg: { nota: true }
  });
  console.log(`Média de notas de produção: ${mediaProducao._avg.nota?.toFixed(2) || 0}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
