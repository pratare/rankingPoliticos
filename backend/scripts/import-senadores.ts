import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter});

interface SenadorAPI {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  uri: string;
  urlFoto: string;
  email: string;
}

async function fetchSenadores(): Promise<SenadorAPI[]> {
  console.log('Buscando senadores da API do Senado Federal...');
  
  // A API do Senado retorna XML, vamos usar um endpoint alternativo
  // que oferece dados em JSON
  const response = await fetch('https://legis.senado.leg.br/dadosabertos/senador/lista/atual');
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar senadores: ${response.statusText}`);
  }
  
  const text = await response.text();
  
  // Tentar parsear como JSON (caso o endpoint responda com JSON)
  try {
    const data = JSON.parse(text);
    
    if (!data.ListaParlamentarEmExercicio || !data.ListaParlamentarEmExercicio.Parlamentares) {
      throw new Error('Formato de resposta não esperado da API do Senado');
    }
    
    const parlamentares = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
    const senadores = Array.isArray(parlamentares) ? parlamentares : [parlamentares];
    
    return senadores.map((s: any) => ({
      id: s.IdentificacaoParlamentar.CodigoParlamentar,
      nome: s.IdentificacaoParlamentar.NomeParlamentar,
      siglaPartido: s.IdentificacaoParlamentar.SiglaPartidoParlamentar,
      siglaUf: s.IdentificacaoParlamentar.UfParlamentar,
      uri: s.IdentificacaoParlamentar.UrlParlamentar,
      urlFoto: s.IdentificacaoParlamentar.UrlFotoParlamentar,
      email: s.IdentificacaoParlamentar.EmailParlamentar,
    }));
  } catch (e) {
    // Se falhar o parse JSON, é XML - vamos usar regex para extrair dados
    console.log('Resposta em XML detectada, usando parse manual...');
    
    const senadores: SenadorAPI[] = [];
    
    // Extrair blocos de parlamentares usando regex
    const parlamentarRegex = /<Parlamentar>([\s\S]*?)<\/Parlamentar>/g;
    let match;
    
    while ((match = parlamentarRegex.exec(text)) !== null) {
      const bloco = match[1];
      
      const codigo = extractValue(bloco, 'CodigoParlamentar');
      const nome = extractValue(bloco, 'NomeParlamentar');
      const partido = extractValue(bloco, 'SiglaPartidoParlamentar');
      const uf = extractValue(bloco, 'UfParlamentar');
      const url = extractValue(bloco, 'UrlParlamentar');
      const foto = extractValue(bloco, 'UrlFotoParlamentar');
      const email = extractValue(bloco, 'EmailParlamentar');
      
      if (codigo && nome) {
        senadores.push({
          id: parseInt(codigo),
          nome,
          siglaPartido: partido || '',
          siglaUf: uf || '',
          uri: url || '',
          urlFoto: foto || '',
          email: email || '',
        });
      }
    }
    
    return senadores;
  }
}

function extractValue(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

async function importSenadores() {
  try {
    const senadores = await fetchSenadores();
    console.log(`Encontrados ${senadores.length} senadores.`);

    let imported = 0;
    let updated = 0;

    for (const senador of senadores) {
      const parlamentarId = `sen-${senador.id}`;
      
      const existing = await prisma.parlamentar.findUnique({
        where: { id: parlamentarId },
      });

      if (existing) {
        await prisma.parlamentar.update({
          where: { id: parlamentarId },
          data: {
            nome: senador.nome,
            cargo: 'senador',
            uf: senador.siglaUf,
            partido: senador.siglaPartido,
            fotoUrl: senador.urlFoto,
            perfilUrl: senador.uri,
            ativo: true,
          },
        });
        updated++;
      } else {
        await prisma.parlamentar.create({
          data: {
            id: parlamentarId,
            nome: senador.nome,
            cargo: 'senador',
            uf: senador.siglaUf,
            partido: senador.siglaPartido,
            fotoUrl: senador.urlFoto,
            perfilUrl: senador.uri,
            ativo: true,
          },
        });
        imported++;
      }
    }

    console.log(`Importação concluída:`);
    console.log(`- Novos senadores: ${imported}`);
    console.log(`- Senadores atualizados: ${updated}`);
    console.log(`- Total processado: ${senadores.length}`);
  } catch (error) {
    console.error('Erro durante importação:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importSenadores();
