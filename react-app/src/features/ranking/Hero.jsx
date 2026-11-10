import { rankingRows } from '../../data/mockData'
import { average, parseScore } from '../../domain/scoring'

export default function Hero() {
  const deputyScores = rankingRows
    .filter((row) => row.role.toLowerCase().includes('deputado'))
    .map((row) => parseScore(row.score))

  const senatorScores = rankingRows
    .filter((row) => row.role.toLowerCase().includes('senador'))
    .map((row) => parseScore(row.score))

  const averageDeputados = average(deputyScores)
  const averageSenadores = average(senatorScores)

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Transparência pública</span>
          <h1>Ranking objetivo de deputados e senadores</h1>
          <p>
            Avaliação baseada em critérios públicos, comparáveis e explicáveis.
          </p>

          <div className="hero-actions">
            <a href="#ranking" className="primary-button">
              Ver ranking
            </a>
            <a href="#metodologia" className="secondary-button">
              Como a nota é calculada?
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-metrics">
            <div className="metric-card">
              <span className="metric-label">Deputados</span>
              <strong className="metric-value">{averageDeputados.toFixed(1).replace('.', ',')}</strong>
              <span className="metric-caption">Média do ranking</span>
            </div>

            <div className="metric-card">
              <span className="metric-label">Senadores</span>
              <strong className="metric-value">{averageSenadores.toFixed(1).replace('.', ',')}</strong>
              <span className="metric-caption">Média do ranking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
