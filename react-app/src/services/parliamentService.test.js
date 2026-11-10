import { describe, expect, it } from 'vitest'
import { filterRanking, getRankingSnapshot } from './parliamentService'

describe('parliamentService', () => {
  it('returns the ranking snapshot without mutating the source list', () => {
    const snapshot = getRankingSnapshot()

    expect(snapshot).toHaveLength(8)
    expect(snapshot[0]).toMatchObject({ id: 'parlamentar-x', name: 'Parlamentar X' })
    snapshot[0].name = 'Mutated'
    expect(getRankingSnapshot()[0].name).toBe('Parlamentar X')
  })

  it('filters by role, state, party and name query together', () => {
    const rows = filterRanking(
      [
        { id: '1', name: 'Ana Souza', role: 'Deputado', state: 'SP', party: 'PSX' },
        { id: '2', name: 'Bruno Lima', role: 'Senador', state: 'RJ', party: 'PSX' },
        { id: '3', name: 'Carla Reis', role: 'Deputado', state: 'MG', party: 'PT' },
      ],
      {
        cargo: 'Deputado',
        estado: 'SP',
        partido: 'PSX',
        query: 'Ana',
      },
    )

    expect(rows).toHaveLength(1)
    expect(rows[0].name).toBe('Ana Souza')
  })

  it('returns empty list when there are no matches', () => {
    expect(
      filterRanking(
        [
          { id: '1', name: 'Ana Souza', role: 'Deputado', state: 'SP', party: 'PSX' },
          { id: '2', name: 'Bruno Lima', role: 'Senador', state: 'RJ', party: 'PSX' },
        ],
        { cargo: 'Deputado', estado: 'RJ', partido: 'PT', query: 'Zé' },
      ),
    ).toEqual([])
  })
})
