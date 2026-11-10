export default function TransparencyModal({ isOpen, parliament, onClose }) {
  if (!isOpen || !parliament) {
    return null
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="transparency-modal-title">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Transparência da nota</p>
            <h3 id="transparency-modal-title">Como a nota foi calculada?</h3>
          </div>
          <button type="button" className="ghost-button" onClick={onClose}>
            Fechar
          </button>
        </div>

        <p className="modal-description">
          A nota final de {parliament.name} é calculada pela média ponderada dos critérios públicos, com
          transparência da metodologia e fonte dos dados em cada avaliação.
        </p>

        <ul className="methodology-list">
          {parliament.methodology.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="transparency-box">
          <h4>Fontes e atualização</h4>
          <p>Dados atualizados em: {parliament.updatedAt}</p>
          <p>{parliament.sources.join(' • ')}</p>
        </div>
      </div>
    </div>
  )
}
