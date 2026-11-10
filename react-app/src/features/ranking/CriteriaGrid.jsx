export default function CriteriaGrid({ criteria }) {
  return (
    <section className="section-block">
      <div className="section-header">
        <h2>Critérios da avaliação</h2>
      </div>

      <div className="criteria-grid">
        {criteria.map((criterion) => (
          <article className="criterion-card" key={criterion.id}>
            <div className="criterion-icon">{criterion.title.charAt(0)}</div>
            <div className="criterion-content">
              <h3>{criterion.title}</h3>
              <p>{criterion.description}</p>
            </div>
            <div className="criterion-score">{criterion.score}</div>
          </article>
        ))}
      </div>
    </section>
  )
}
