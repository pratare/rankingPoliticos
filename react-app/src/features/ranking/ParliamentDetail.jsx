import { parseScore } from '../../domain/scoring'

export default function ParliamentDetail({ parliament, onOpenTransparency = () => {} }) {
  if (!parliament) {
    return null
  }

  const score = parseScore(parliament.score)
  const average = parseScore(parliament.averageRanking)
  const difference = score - average

  return (
    <section className="section-block profile-section">
      <div className="profile-card">
        <div className="profile-header">
          <div>
            <p className="eyebrow">Perfil do parlamentar</p>
            <h2>{parliament.name}</h2>
            <p className="profile-meta">
              {parliament.role} • {parliament.state} • {parliament.party}
            </p>
            <div className="profile-badges">
              <span>Posição #{parliament.position}</span>
              <span>Atualizado em {parliament.updatedAt}</span>
            </div>
          </div>

          <div className="profile-score-box">
            <span className="score-label">Nota final</span>
            <strong>{parliament.score}</strong>
          </div>
        </div>

        <div className="profile-summary-grid">
          <div className="summary-item">
            <span>Nota geral</span>
            <strong>{parliament.score}</strong>
          </div>
          <div className="summary-item">
            <span>Média do ranking</span>
            <strong>{parliament.averageRanking}</strong>
          </div>
          <div className="summary-item">
            <span>Diferença</span>
            <strong className={difference >= 0 ? 'positive' : 'negative'}>
              {difference >= 0 ? '+' : ''}
              {difference.toFixed(1).replace('.', ',')}
            </strong>
          </div>
        </div>

        <div className="insight-grid">
          <div className="insight-box">
            <h3>Pontos fortes</h3>
            <ul>
              {parliament.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="insight-box">
            <h3>Pontos fracos</h3>
            <ul>
              {parliament.weaknesses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="criteria-panel">
          <div className="section-header compact-header">
            <h3>Detalhamento por critério</h3>
          </div>

          <div className="criteria-detail-grid">
            {parliament.criteria.map((criterion) => (
              <article className="criterion-detail-card" key={criterion.id}>
                <div className="criterion-top-row">
                  <h4>{criterion.title}</h4>
                  <span className="criterion-score-tag">{criterion.score}</span>
                </div>
                <p>{criterion.description}</p>
                <div className="criterion-meta">
                  <span>Peso: {criterion.weight}%</span>
                  <span>{criterion.source}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="profile-footer-panel single-resource-panel">
          <h3>Gestão de recursos</h3>
          <div className="resource-grid">
            <div className="resource-stat">
              <span>Recursos declarados</span>
              <strong>{parliament.resourceManagement.declaredAmount}</strong>
            </div>
            <div className="resource-stat">
              <span>Uso da verba</span>
              <strong>{parliament.resourceManagement.usageRate}</strong>
            </div>
            <div className="resource-stat">
              <span>Valor utilizado</span>
              <strong>{parliament.resourceManagement.usedAmount}</strong>
            </div>
            <div className="resource-stat">
              <span>Verba disponível</span>
              <strong>{parliament.resourceManagement.availableBudget}</strong>
            </div>
          </div>

          <div className="transparency-box">
            <h4>Fonte da gestão</h4>
            <p>Uso da verba declarado: {parliament.resourceManagement.usageRate}</p>
            <p>Fonte: {parliament.resourceManagement.source}</p>
          </div>
        </div>

        <div className="profile-actions">
          <a href="#ranking" className="secondary-button">
            Voltar ao ranking
          </a>
          <button type="button" className="ghost-button" onClick={onOpenTransparency}>
            Entender a nota
          </button>
        </div>
      </div>
    </section>
  )
}
