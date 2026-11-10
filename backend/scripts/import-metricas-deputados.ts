import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter});

interface EventosDeputado {
  id: number;
  dataHoraInicio: string;
  dataHoraFim: string;
  descricao: string;
}

interface ProposicoesDeputado {
  id: number;
  siglaTipo: string;
  ano: string;
  ementa: string;
}

async function fetchEventosDeputado(deputadoId: number): Promise<EventosDeputado[]> {
  try {
    // Tentar buscar dados de 2025 primeiro
    const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/eventos?ano=2025&itens=100&ordem=ASC&ordenarPor=dataHoraInicio`);
    
    if (!response.ok) {
      // Se falhar, tentar sem filtro de ano
      const response2 = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/eventos?itens=100&ordem=ASC&ordenarPor=dataHoraInicio`);
      if (!response2.ok) {
        return [];
      }
      const data = await response2.json();
      return data.dados || [];
    }
    
    const data = await response.json();
    return data.dados || [];
  } catch (error) {
    return [];
  }
}

async function fetchProposicoesDeputado(deputadoId: number): Promise<ProposicoesDeputado[]> {
  try {
    // Tentar buscar dados de 2025 primeiro
    const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/proposicoes?ano=2025&itens=100&ordem=ASC&ordenarPor=id`);
    
    if (!response.ok) {
      // Se falhar, tentar sem filtro de ano
      const response2 = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/proposicoes?itens=100&ordem=ASC&ordenarPor=id`);
      if (!response2.ok) {
        return [];
      }
      const data = await response2.json();
      return data.dados || [];
    }
    
    const data = await response.json();
    return data.dados || [];
  } catch (error) {
    return [];
  }
}

async function importMetricasDeputados() {
  try {
    console.log('Buscando critérios de avaliação...');
    
    const criterioPresenca = await prisma.criterioAvaliacao.findUnique({
      where: { codigo: 'presenca' },
    });
    
    const criterioProducao = await prisma.criterioAvaliacao.findUnique({
      where: { codigo: 'producao' },
    });
    
    const fonte = await prisma.fonteDados.findUnique({
      where: { id: 'fonte-sistema' },
    });
    
    if (!criterioPresenca || !criterioProducao || !fonte) {
      throw new Error('Critérios ou fonte não encontrados');
    }
    
    console.log('Buscando deputados...');
    const deputados = await prisma.parlamentar.findMany({
      where: { cargo: 'deputado' },
    });
    
    console.log(`Encontrados ${deputados.length} deputados. Iniciando importação de métricas...`);
    
    const dataReferencia = new Date('2026-01-01T00:00:00.000Z');
    let totalProcessados = 0;
    let totalErros = 0;
    
    for (const deputado of deputados) {
      // Extrair ID original da Câmara (formato: dep-{id})
      const camaraId = parseInt(deputado.id.replace('dep-', ''));
      
      if (isNaN(camaraId)) {
        console.log(`ID inválido para deputado ${deputado.nome}: ${deputado.id}`);
        totalErros++;
        continue;
      }
      
      try {
        // Buscar eventos (presença)
        const eventos = await fetchEventosDeputado(camaraId);
        const eventos2025 = eventos.filter(e => e.dataHoraInicio.startsWith('2025'));
        
        // Calcular métrica de presença (baseado em número de eventos)
        const presencaValor = eventos2025.length;
        // Normalizar para nota 0-10 (assumindo que 50+ eventos é nota máxima)
        const presencaNota = Math.min(10, (presencaValor / 50) * 10);
        
        // Buscar proposições (produção legislativa)
        const proposicoes = await fetchProposicoesDeputado(camaraId);
        const proposicoes2025 = proposicoes.filter(p => p.ano === '2025');
        
        // Calcular métrica de produção (baseado em número de proposições)
        const producaoValor = proposicoes2025.length;
        // Normalizar para nota 0-10 (assumindo que 20+ proposições é nota máxima)
        const producaoNota = Math.min(10, (producaoValor / 20) * 10);
        
        // Upsert métrica de presença
        await prisma.metricasParlamentar.upsert({
          where: {
            parlamentarId_criterioId_dataReferencia: {
              parlamentarId: deputado.id,
              criterioId: criterioPresenca.id,
              dataReferencia,
            },
          },
          update: {
            valor: presencaValor,
            nota: presencaNota,
            unidade: 'eventos',
            observacao: `${presencaValor} eventos registrados em 2025`,
          },
          create: {
            parlamentarId: deputado.id,
            criterioId: criterioPresenca.id,
            fonteDadoId: fonte.id,
            valor: presencaValor,
            nota: presencaNota,
            unidade: 'eventos',
            observacao: `${presencaValor} eventos registrados em 2025`,
            dataReferencia,
          },
        });
        
        // Upsert métrica de produção
        await prisma.metricasParlamentar.upsert({
          where: {
            parlamentarId_criterioId_dataReferencia: {
              parlamentarId: deputado.id,
              criterioId: criterioProducao.id,
              dataReferencia,
            },
          },
          update: {
            valor: producaoValor,
            nota: producaoNota,
            unidade: 'proposições',
            observacao: `${producaoValor} proposições apresentadas em 2025`,
          },
          create: {
            parlamentarId: deputado.id,
            criterioId: criterioProducao.id,
            fonteDadoId: fonte.id,
            valor: producaoValor,
            nota: producaoNota,
            unidade: 'proposições',
            observacao: `${producaoValor} proposições apresentadas em 2025`,
            dataReferencia,
          },
        });
        
        totalProcessados++;
        
        if (totalProcessados % 50 === 0) {
          console.log(`Processados ${totalProcessados}/${deputados.length} deputados...`);
        }
        
        // Pequeno delay para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.log(`Erro ao processar deputado ${deputado.nome}:`, error);
        totalErros++;
      }
    }
    
    console.log(`\nImportação concluída:`);
    console.log(`- Deputados processados: ${totalProcessados}`);
    console.log(`- Erros: ${totalErros}`);
    console.log(`- Total de deputados: ${deputados.length}`);
    
  } catch (error) {
    console.error('Erro durante importação:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importMetricasDeputados();
