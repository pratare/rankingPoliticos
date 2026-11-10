export default function RankingTable({ rows }) {
  return (
    <section className="section-block" id="ranking">
      <div className="section-header">
        <h2>Ranking geral</h2>
        <button className="ghost-button">Ordenar por critério</button>
      </div>

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
            {rows.map((row) => (
              <tr key={row.position} className={row.position === 1 ? 'top-row' : ''}>
                <td>#{row.position}</td>
                <td>{row.name}</td>
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
    </section>
  )
}
