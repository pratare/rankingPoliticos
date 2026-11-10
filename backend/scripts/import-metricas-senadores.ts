import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function importMetricasSenadores() {
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
    
    console.log('Buscando senadores...');
    const senadores = await prisma.parlamentar.findMany({
      where: { cargo: 'senador' },
    });
    
    console.log(`Encontrados ${senadores.length} senadores. Iniciando importação de métricas...`);
    
    const dataReferencia = new Date('2025-01-01T00:00:00.000Z');
    let totalProcessados = 0;
    
    for (const senador of senadores) {
      // Gerar dados simulados para demonstração
      // A API do Senado também pode não ter dados completos de 2025
      const presencaValor = Math.floor(Math.random() * 50) + 20; // 20-70 eventos
      const presencaNota = Math.min(10, (presencaValor / 50) * 10);
      
      const producaoValor = Math.floor(Math.random() * 30) + 5; // 5-35 proposições
      const producaoNota = Math.min(10, (producaoValor / 20) * 10);
      
      // Upsert métrica de presença
      await prisma.metricasParlamentar.upsert({
        where: {
          parlamentarId_criterioId_dataReferencia: {
            parlamentarId: senador.id,
            criterioId: criterioPresenca.id,
            dataReferencia,
          },
        },
        update: {
          valor: presencaValor,
          nota: presencaNota,
          unidade: 'eventos',
          observacao: `${presencaValor} eventos registrados em 2025 (dado simulado para demonstração)`,
        },
        create: {
          parlamentarId: senador.id,
          criterioId: criterioPresenca.id,
          fonteDadoId: fonte.id,
          valor: presencaValor,
          nota: presencaNota,
          unidade: 'eventos',
          observacao: `${presencaValor} eventos registrados em 2025 (dado simulado para demonstração)`,
          dataReferencia,
        },
      });
      
      // Upsert métrica de produção
      await prisma.metricasParlamentar.upsert({
        where: {
          parlamentarId_criterioId_dataReferencia: {
            parlamentarId: senador.id,
            criterioId: criterioProducao.id,
            dataReferencia,
          },
        },
        update: {
          valor: producaoValor,
          nota: producaoNota,
          unidade: 'proposições',
          observacao: `${producaoValor} proposições apresentadas em 2025 (dado simulado para demonstração)`,
        },
        create: {
          parlamentarId: senador.id,
          criterioId: criterioProducao.id,
          fonteDadoId: fonte.id,
          valor: producaoValor,
          nota: producaoNota,
          unidade: 'proposições',
          observacao: `${producaoValor} proposições apresentadas em 2025 (dado simulado para demonstração)`,
          dataReferencia,
        },
      });
      
      totalProcessados++;
      
      if (totalProcessados % 20 === 0) {
        console.log(`Processados ${totalProcessados}/${senadores.length} senadores...`);
      }
    }
    
    console.log(`\nImportação concluída:`);
    console.log(`- Senadores processados: ${totalProcessados}`);
    console.log(`- Total de senadores: ${senadores.length}`);
    
  } catch (error) {
    console.error('Erro durante importação:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importMetricasSenadores();
