import { rankingRows } from '../data/mockData'

const normalizeText = (value) => String(value ?? '').trim().toLowerCase()
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const formatScore = (value) => {
  const numeric = Number(value ?? 0)

  if (!Number.isFinite(numeric)) {
    return '0,0'
  }

  return numeric.toFixed(1).replace('.', ',')
}

const toDisplayRole = (value) => {
  const text = String(value ?? '').trim()

  if (!text) {
    return 'Deputado'
  }

  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const normalizeRankingRow = (row, index = 0) => ({
  id: row.id ?? `parlamentar-${index + 1}`,
  name: row.name ?? row.nome ?? 'Parlamentar sem nome',
  role: row.role ?? toDisplayRole(row.cargo ?? row.role),
  state: row.state ?? row.uf ?? 'SP',
  party: row.party ?? row.partido ?? 'SEM PARTIDO',
  position: Number(row.position ?? row.posicao ?? index + 1),
  score: row.score ?? formatScore(row.notaFinal ?? row.score),
  averageRanking: row.averageRanking ?? '7,3',
  updatedAt: row.updatedAt ?? new Date().toLocaleDateString('pt-BR'),
})

export const mapBackendRanking = (items = []) =>
  (Array.isArray(items) ? items : []).map((item, index) => {
    const parlamentar = item.parlamentar ?? item

    return normalizeRankingRow(
      {
        id: parlamentar.id ?? item.id,
        name: parlamentar.nome ?? item.name,
        role: toDisplayRole(parlamentar.cargo ?? item.role),
        state: parlamentar.uf ?? item.state,
        party: parlamentar.partido ?? item.party,
        position: item.posicao ?? index + 1,
        score: formatScore(item.notaFinal ?? item.score),
        notaFinal: item.notaFinal ?? item.score,
        cargo: parlamentar.cargo,
        uf: parlamentar.uf,
        partido: parlamentar.partido,
      },
      index,
    )
  })

export const fetchRankingFromApi = async (filters = {}) => {
  const params = new URLSearchParams()

  if (filters.cargo && filters.cargo !== 'Todos') {
    params.set('cargo', filters.cargo)
  }

  if (filters.estado && filters.estado !== 'Todos') {
    params.set('uf', filters.estado)
  }

  if (filters.partido && filters.partido !== 'Todos') {
    params.set('partido', filters.partido)
  }

  if (filters.query) {
    params.set('search', filters.query)
  }

  const queryString = params.toString()
  const url = `${API_BASE_URL}/ranking/2025${queryString ? `?${queryString}` : ''}`
  
  console.log('Fetching ranking from:', url)
  
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Falha ao carregar ranking: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  console.log('Received payload:', payload.length, 'items')
  return mapBackendRanking(payload)
}

export const getRankingSnapshot = () => rankingRows.map((row) => ({ ...row }))

export const filterRanking = (rows = rankingRows, filters = {}) => {
  const {
    cargo = 'Todos',
    estado = 'Todos',
    partido = 'Todos',
    query = '',
  } = filters

  return rows.filter((row) => {
    const matchesCargo = cargo === 'Todos' || row.role === cargo
    const matchesEstado = estado === 'Todos' || row.state === estado
    const matchesPartido = partido === 'Todos' || row.party === partido
    const matchesSearch = !query || normalizeText(row.name).includes(normalizeText(query))

    return matchesCargo && matchesEstado && matchesPartido && matchesSearch
  })
}
