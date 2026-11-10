import { parseScore } from '../../domain/scoring'

export default function RankingTable({ rows, isLoading = false, onSelectParliament = () => {} }) {
  const orderedRows = [...rows]
    .sort((left, right) => parseScore(right.score) - parseScore(left.score))
    .map((row, index) => ({ ...row, position: index + 1 }))

  return (
    <section className="section-block" id="ranking">
      <div className="section-header">
        <div>
          <h2>Ranking geral</h2>
          <p className="results-summary">{isLoading ? 'Carregando...' : `${orderedRows.length} parlamentares encontrados`}</p>
        </div>
        <button type="button" className="ghost-button">
          Ordenar por critério
        </button>
      </div>

      {isLoading ? (
        <div className="empty-state" role="status" aria-live="polite">
          Carregando dados do ranking...
        </div>
      ) : orderedRows.length === 0 ? (
        <div className="empty-state" role="status" aria-live="polite">
          Nenhum parlamentar encontrado com os filtros selecionados.
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Estado</th>
                <th>Partido</th>
                <th>Nota final</th>
              </tr>
            </thead>
            <tbody>
              {orderedRows.map((row) => (
                <tr key={`${row.id}-${row.state}-${row.party}`} className={row.position === 1 ? 'top-row' : ''}>
                  <td>#{row.position}</td>
                  <td>
                    <button
                      type="button"
                      className="parliament-link"
                      onClick={() => onSelectParliament(row.id)}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td>{row.role}</td>
                  <td>{row.state}</td>
                  <td>{row.party}</td>
                  <td>
                    <span className="score-pill">{row.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
