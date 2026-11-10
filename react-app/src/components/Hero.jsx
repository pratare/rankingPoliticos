import { rankingRows } from '../data/mockData'

const parseScore = (value) => Number(String(value).replace(',', '.'))

export default function Hero() {
  const deputyScores = rankingRows
    .filter((row) => row.role.toLowerCase().includes('deputado'))
    .map((row) => parseScore(row.score))

  const senatorScores = rankingRows
    .filter((row) => row.role.toLowerCase().includes('senador'))
    .map((row) => parseScore(row.score))

  const average = (items) => {
    if (!items.length) return 0
    return items.reduce((sum, value) => sum + value, 0) / items.length
  }

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
            <button className="primary-button">Ver ranking</button>
            <button className="secondary-button">Como a nota é calculada?</button>
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
