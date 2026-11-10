export const rankingRows = [
  { id: 'parlamentar-x', position: 1, name: 'Parlamentar X', role: 'Deputado', state: 'SP', party: 'PSX', score: '8,7' },
  { id: 'parlamentar-y', position: 2, name: 'Parlamentar Y', role: 'Senador', state: 'RJ', party: 'ABC', score: '8,4' },
  { id: 'parlamentar-z', position: 3, name: 'Parlamentar Z', role: 'Deputado', state: 'MG', party: 'XYZ', score: '8,1' },
  { id: 'parlamentar-a', position: 4, name: 'Parlamentar A', role: 'Senador', state: 'SP', party: 'PSX', score: '7,9' },
  { id: 'parlamentar-b', position: 5, name: 'Parlamentar B', role: 'Deputado', state: 'BA', party: 'PT', score: '7,8' },
  { id: 'parlamentar-c', position: 6, name: 'Parlamentar C', role: 'Deputado', state: 'RJ', party: 'PL', score: '7,6' },
  { id: 'parlamentar-d', position: 7, name: 'Parlamentar D', role: 'Senador', state: 'MG', party: 'ABC', score: '7,4' },
  { id: 'parlamentar-e', position: 8, name: 'Parlamentar E', role: 'Deputado', state: 'GO', party: 'XYZ', score: '7,2' },
]

const criterionCatalog = [
  { id: 'presence', title: 'Presença e assiduidade', description: 'Comparecimento em sessões, comissões e plenário.', source: 'Câmara dos Deputados' },
  { id: 'legislation', title: 'Produção legislativa', description: 'Projetos e iniciativas apresentadas e aprovadas.', source: 'Portal da Transparência' },
  { id: 'reports', title: 'Relatoria', description: 'Participação em relatorias e comissões relevantes.', source: 'Dados abertos' },
  { id: 'votes', title: 'Participação em votações', description: 'Comparecimento e posicionamento em votações-chave.', source: 'Sistema de votações' },
  { id: 'transparency', title: 'Transparência', description: 'Clareza sobre declarações, gastos e prestação de contas.', source: 'Portal da Transparência' },
  { id: 'service', title: 'Atendimento ao eleitor', description: 'Respostas a demandas e presença em ações públicas.', source: 'Dados públicos e contato' },
]

const scoreById = {
  'parlamentar-x': ['8,9', '8,8', '8,4', '9,0', '7,8', '7,6'],
  'parlamentar-y': ['8,4', '7,9', '8,7', '8,5', '8,2', '7,2'],
  'parlamentar-z': ['8,0', '7,6', '8,2', '8,6', '7,5', '7,1'],
  'parlamentar-a': ['8,1', '7,8', '7,9', '8,3', '8,0', '7,4'],
  'parlamentar-b': ['7,8', '7,5', '7,2', '7,9', '7,6', '7,1'],
  'parlamentar-c': ['7,6', '7,2', '7,8', '7,7', '7,5', '6,9'],
  'parlamentar-d': ['7,4', '7,0', '8,1', '7,9', '7,8', '6,8'],
  'parlamentar-e': ['7,1', '6,9', '7,4', '7,5', '7,3', '6,7'],
}

const buildProfile = (row, index = 0) => {
  const scores = scoreById[row.id] ?? ['7,5', '7,4', '7,3', '7,2', '7,1', '7,0']

  return {
    id: row.id,
    name: row.name,
    role: row.role,
    state: row.state,
    party: row.party,
    position: row.position,
    score: row.score,
    averageRanking: '7,3',
    updatedAt: '24/10/2026',
    strengths: [
      index % 2 === 0 ? 'Presença e assiduidade' : 'Relatoria',
      index % 3 === 0 ? 'Produção legislativa' : 'Transparência',
      'Participação em votações',
    ],
    weaknesses: [
      index % 2 === 0 ? 'Atendimento ao eleitor' : 'Produção legislativa',
      'Transparência',
    ],
    methodology: [
      'Peso da presença: 25%',
      'Peso da produção legislativa: 20%',
      'Peso da relatoria: 15%',
      'Peso das votações: 15%',
      'Peso da transparência: 15%',
      'Peso do atendimento: 10%',
    ],
    resourceManagement: {
      declaredAmount: 'R$ 240.000',
      usedAmount: 'R$ 163.200',
      usageRate: '68%',
      availableBudget: 'R$ 360.000',
      source: 'Portal da Transparência',
    },
    sources: row.role === 'Senador' ? ['Senado Federal', 'Portal da Transparência', 'Dados abertos da União'] : ['Câmara dos Deputados', 'Portal da Transparência', 'Dados abertos da União'],
    criteria: criterionCatalog.map((criterion, criterionIndex) => ({
      ...criterion,
      score: scores[criterionIndex],
      weight: [25, 20, 15, 15, 15, 10][criterionIndex],
    })),
  }
}

export const parliamentProfiles = rankingRows.map((row, index) => buildProfile(row, index))

export const criteria = [
  { id: 'presence', title: 'Presença', description: 'Comparecimento em sessões e comissões.', score: '8,5' },
  { id: 'legislation', title: 'Legislação', description: 'Projetos e iniciativas apresentadas.', score: '8,2' },
  { id: 'reports', title: 'Relatoria', description: 'Participação em relatorias relevantes.', score: '7,9' },
  { id: 'votes', title: 'Votações', description: 'Frequência e posicionamento em pautas.', score: '8,6' },
  { id: 'transparency', title: 'Transparência', description: 'Prestação de contas e clareza pública.', score: '7,8' },
  { id: 'service', title: 'Atendimento', description: 'Resposta e comunicação com eleitores.', score: '8,0' },
]

export const methodology = [
  'Presença e assiduidade: 25%',
  'Produção legislativa: 20%',
  'Relatoria: 15%',
  'Participação em votações: 15%',
  'Transparência: 15%',
  'Atendimento ao eleitor: 10%',
]

export const defaultWeights = {
  presence: 25,
  legislation: 20,
  reports: 15,
  votes: 15,
  transparency: 15,
  service: 10,
}

export const weightProfiles = {
  balanced: { ...defaultWeights },
  institutional: {
    presence: 20,
    legislation: 20,
    reports: 20,
    votes: 20,
    transparency: 10,
    service: 10,
  },
  legislative: {
    presence: 15,
    legislation: 30,
    reports: 20,
    votes: 15,
    transparency: 10,
    service: 10,
  },
  transparency: {
    presence: 20,
    legislation: 15,
    reports: 10,
    votes: 15,
    transparency: 30,
    service: 10,
  },
}
