import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function importMetricasNovosCriterios() {
  try {
    console.log('Buscando critérios de avaliação...');
    
    const criterioRelatoria = await prisma.criterioAvaliacao.findUnique({
      where: { codigo: 'relatoria' },
    });
    
    const criterioVotacoes = await prisma.criterioAvaliacao.findUnique({
      where: { codigo: 'votacoes' },
    });
    
    const criterioTransparencia = await prisma.criterioAvaliacao.findUnique({
      where: { codigo: 'transparencia' },
    });
    
    const criterioAtendimento = await prisma.criterioAvaliacao.findUnique({
      where: { codigo: 'atendimento' },
    });
    
    const fonte = await prisma.fonteDados.findUnique({
      where: { id: 'fonte-sistema' },
    });
    
    if (!criterioRelatoria || !criterioVotacoes || !criterioTransparencia || !criterioAtendimento || !fonte) {
      throw new Error('Critérios ou fonte não encontrados');
    }
    
    console.log('Buscando parlamentares...');
    const parlamentares = await prisma.parlamentar.findMany();
    
    console.log(`Encontrados ${parlamentares.length} parlamentares. Iniciando importação de métricas...`);
    
    const dataReferencia = new Date('2025-01-01T00:00:00.000Z');
    let totalProcessados = 0;
    
    for (const parlamentar of parlamentares) {
      // Gerar dados simulados para demonstração dos novos critérios
      
      // Relatoria: número de relatorias assumidas (0-15)
      const relatoriaValor = Math.floor(Math.random() * 15);
      const relatoriaNota = Math.min(10, (relatoriaValor / 10) * 10);
      
      // Participação em votações: porcentagem de votações (0-100%)
      const votacoesValor = Math.floor(Math.random() * 30) + 70; // 70-100%
      const votacoesNota = votacoesValor / 10;
      
      // Transparência: índice de transparência (0-10)
      const transparenciaValor = Math.floor(Math.random() * 4) + 6; // 6-10
      const transparenciaNota = transparenciaValor;
      
      // Atendimento ao eleitor: número de atendimentos (0-50)
      const atendimentoValor = Math.floor(Math.random() * 50);
      const atendimentoNota = Math.min(10, (atendimentoValor / 30) * 10);
      
      // Upsert métrica de relatoria
      await prisma.metricasParlamentar.upsert({
        where: {
          parlamentarId_criterioId_dataReferencia: {
            parlamentarId: parlamentar.id,
            criterioId: criterioRelatoria.id,
            dataReferencia,
          },
        },
        update: {
          valor: relatoriaValor,
          nota: relatoriaNota,
          unidade: 'relatorias',
          observacao: `${relatoriaValor} relatorias assumidas em 2025 (dado simulado para demonstração)`,
        },
        create: {
          parlamentarId: parlamentar.id,
          criterioId: criterioRelatoria.id,
          fonteDadoId: fonte.id,
          valor: relatoriaValor,
          nota: relatoriaNota,
          unidade: 'relatorias',
          observacao: `${relatoriaValor} relatorias assumidas em 2025 (dado simulado para demonstração)`,
          dataReferencia,
        },
      });
      
      // Upsert métrica de votações
      await prisma.metricasParlamentar.upsert({
        where: {
          parlamentarId_criterioId_dataReferencia: {
            parlamentarId: parlamentar.id,
            criterioId: criterioVotacoes.id,
            dataReferencia,
          },
        },
        update: {
          valor: votacoesValor,
          nota: votacoesNota,
          unidade: '%',
          observacao: `${votacoesValor}% de participação em votações em 2025 (dado simulado para demonstração)`,
        },
        create: {
          parlamentarId: parlamentar.id,
          criterioId: criterioVotacoes.id,
          fonteDadoId: fonte.id,
          valor: votacoesValor,
          nota: votacoesNota,
          unidade: '%',
          observacao: `${votacoesValor}% de participação em votações em 2025 (dado simulado para demonstração)`,
          dataReferencia,
        },
      });
      
      // Upsert métrica de transparência
      await prisma.metricasParlamentar.upsert({
        where: {
          parlamentarId_criterioId_dataReferencia: {
            parlamentarId: parlamentar.id,
            criterioId: criterioTransparencia.id,
            dataReferencia,
          },
        },
        update: {
          valor: transparenciaValor,
          nota: transparenciaNota,
          unidade: 'índice',
          observacao: `Índice de transparência ${transparenciaValor}/10 em 2025 (dado simulado para demonstração)`,
        },
        create: {
          parlamentarId: parlamentar.id,
          criterioId: criterioTransparencia.id,
          fonteDadoId: fonte.id,
          valor: transparenciaValor,
          nota: transparenciaNota,
          unidade: 'índice',
          observacao: `Índice de transparência ${transparenciaValor}/10 em 2025 (dado simulado para demonstração)`,
          dataReferencia,
        },
      });
      
      // Upsert métrica de atendimento
      await prisma.metricasParlamentar.upsert({
        where: {
          parlamentarId_criterioId_dataReferencia: {
            parlamentarId: parlamentar.id,
            criterioId: criterioAtendimento.id,
            dataReferencia,
          },
        },
        update: {
          valor: atendimentoValor,
          nota: atendimentoNota,
          unidade: 'atendimentos',
          observacao: `${atendimentoValor} atendimentos ao eleitor em 2025 (dado simulado para demonstração)`,
        },
        create: {
          parlamentarId: parlamentar.id,
          criterioId: criterioAtendimento.id,
          fonteDadoId: fonte.id,
          valor: atendimentoValor,
          nota: atendimentoNota,
          unidade: 'atendimentos',
          observacao: `${atendimentoValor} atendimentos ao eleitor em 2025 (dado simulado para demonstração)`,
          dataReferencia,
        },
      });
      
      totalProcessados++;
      
      if (totalProcessados % 50 === 0) {
        console.log(`Processados ${totalProcessados}/${parlamentares.length} parlamentares...`);
      }
    }
    
    console.log(`\nImportação concluída:`);
    console.log(`- Parlamentares processados: ${totalProcessados}`);
    console.log(`- Total de parlamentares: ${parlamentares.length}`);
    
  } catch (error) {
    console.error('Erro durante importação:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importMetricasNovosCriterios();
