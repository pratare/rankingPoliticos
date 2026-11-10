import { weightProfiles } from '../../data/mockData'

const metricMap = [
  { key: 'presence', label: 'Presença e assiduidade' },
  { key: 'legislation', label: 'Produção legislativa' },
  { key: 'reports', label: 'Relatoria' },
  { key: 'votes', label: 'Participação em votações' },
  { key: 'transparency', label: 'Transparência' },
  { key: 'service', label: 'Atendimento ao eleitor' },
]

const profileLabels = {
  balanced: 'Equilibrado',
  institutional: 'Institucional',
  legislative: 'Legislativo',
  transparency: 'Transparência',
  custom: 'Personalizado',
}

export default function Methodology({ items = [], weights = null, selectedProfile = 'balanced' }) {
  const profileKey = selectedProfile in profileLabels ? selectedProfile : 'balanced'
  const activeWeights =
    selectedProfile === 'custom'
      ? weights ?? {}
      : weightProfiles[selectedProfile] ?? weights ?? { ...weightProfiles.balanced }

  const profileLabel = profileLabels[profileKey] ?? 'Equilibrado'

  const profileEntries = ['balanced', 'institutional', 'legislative', 'transparency'].map((key) => ({
    key,
    label: profileLabels[key],
    items: metricMap.map(({ key: criterionKey, label: criterionLabel }) => {
      const value = weightProfiles[key]?.[criterionKey] ?? 0
      return `${criterionLabel}: ${Number(value).toFixed(0)}%`
    }),
  }))

  const methodologyItems = weights
    ? metricMap.map(({ key, label }) => `${label}: ${Number(activeWeights[key] ?? 0).toFixed(0)}%`)
    : items

  return (
    <section className="section-block" id="metodologia">
      <div className="methodology-box">
        <h3>Metodologia da avaliação</h3>
        <p>
          A nota final é calculada por uma média ponderada entre os critérios públicos e a transparência das
          informações declaradas pelo parlamentar.
        </p>

        <p className="profile-preset-summary">
          Perfil da metodologia: <strong>{profileLabel}</strong>. A soma dos pesos permanece em 100% em todos os perfis.
        </p>

        <div className="methodology-grid">
          {profileEntries.map(({ key, label, items: profileItems }) => (
            <article key={key} className={`methodology-profile-card ${profileKey === key ? 'active' : ''}`}>
              <h4>{label}</h4>
              <ul className="methodology-list compact-list">
                {profileItems.map((item) => (
                  <li key={`${key}-${item}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <ul className="methodology-list">
          {methodologyItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
