import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.parlamentar.count();
  console.log(`Total de parlamentares no banco: ${count}`);
  
  const deputados = await prisma.parlamentar.count({
    where: { cargo: 'deputado' }
  });
  console.log(`Total de deputados: ${deputados}`);
  
  const senadores = await prisma.parlamentar.count({
    where: { cargo: 'senador' }
  });
  console.log(`Total de senadores: ${senadores}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
