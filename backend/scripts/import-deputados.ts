import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter});

interface DeputadoAPI {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  uri: string;
  urlFoto: string;
  email: string;
}

async function fetchDeputados(): Promise<DeputadoAPI[]> {
  console.log('Buscando deputados da API da Câmara dos Deputados...');
  
  const allDeputados: DeputadoAPI[] = [];
  let pagina = 1;
  const itensPorPagina = 100;
  
  while (true) {
    const url = `https://dadosabertos.camara.leg.br/api/v2/deputados?itens=${itensPorPagina}&pagina=${pagina}&ordem=ASC&ordenarPor=nome`;
    console.log(`Buscando página ${pagina}...`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar deputados: ${response.statusText}`);
    }
    
    const data = await response.json();
    const deputados = data.dados;
    
    if (deputados.length === 0) {
      break;
    }
    
    allDeputados.push(...deputados);
    console.log(`  Página ${pagina}: ${deputados.length} deputados`);
    
    if (deputados.length < itensPorPagina) {
      break;
    }
    
    pagina++;
  }
  
  return allDeputados;
}

async function importDeputados() {
  try {
    const deputados = await fetchDeputados();
    console.log(`Encontrados ${deputados.length} deputados.`);

    let imported = 0;
    let updated = 0;

    for (const deputado of deputados) {
      const parlamentarId = `dep-${deputado.id}`;
      
      const existing = await prisma.parlamentar.findUnique({
        where: { id: parlamentarId },
      });

      if (existing) {
        await prisma.parlamentar.update({
          where: { id: parlamentarId },
          data: {
            nome: deputado.nome,
            cargo: 'deputado',
            uf: deputado.siglaUf,
            partido: deputado.siglaPartido,
            fotoUrl: deputado.urlFoto,
            perfilUrl: deputado.uri,
            ativo: true,
          },
        });
        updated++;
      } else {
        await prisma.parlamentar.create({
          data: {
            id: parlamentarId,
            nome: deputado.nome,
            cargo: 'deputado',
            uf: deputado.siglaUf,
            partido: deputado.siglaPartido,
            fotoUrl: deputado.urlFoto,
            perfilUrl: deputado.uri,
            ativo: true,
          },
        });
        imported++;
      }
    }

    console.log(`Importação concluída:`);
    console.log(`- Novos deputados: ${imported}`);
    console.log(`- Deputados atualizados: ${updated}`);
    console.log(`- Total processado: ${deputados.length}`);
  } catch (error) {
    console.error('Erro durante importação:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importDeputados();
