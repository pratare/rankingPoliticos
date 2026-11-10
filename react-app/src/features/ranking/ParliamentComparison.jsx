import { calculateWeightedScore, parseScore } from '../../domain/scoring'
import { defaultWeights } from '../../data/mockData'

export default function ParliamentComparison({
  rows,
  leftId,
  rightId,
  weights,
  profilePreset = 'balanced',
  onApplyPreset,
  onLeftChange,
  onRightChange,
  onWeightChange,
}) {
  const leftRow = rows.find((row) => row.id === leftId) ?? rows[0]
  const rightRow = rows.find((row) => row.id === rightId) ?? rows[1] ?? rows[0]

  const leftProfile = leftRow?.profile ?? leftRow
  const rightProfile = rightRow?.profile ?? rightRow

  const criterionMeta = [
    { id: 'presence', label: 'Presença' },
    { id: 'legislation', label: 'Legislação' },
    { id: 'reports', label: 'Relatoria' },
    { id: 'votes', label: 'Votações' },
    { id: 'transparency', label: 'Transparência' },
    { id: 'service', label: 'Atendimento' },
  ]

  const presetLabels = {
    balanced: 'Equilibrado',
    institutional: 'Institucional',
    legislative: 'Legislativo',
    transparency: 'Transparência',
  }

  const effectiveScores = [leftProfile, rightProfile].map((profile) => {
    const scoreList = criterionMeta.map((criterion) => {
      const found = profile?.criteria?.find((item) => item.id === criterion.id)
      return parseScore(found?.score ?? profile?.score ?? '0')
    })

    const weightedScore = calculateWeightedScore(
      scoreList,
      criterionMeta.map((criterion) => weights[criterion.id] ?? 0),
    )

    return {
      profile,
      weightedScore,
    }
  })

  const baseScores = [leftProfile, rightProfile].map((profile) => {
    const scoreList = criterionMeta.map((criterion) => {
      const found = profile?.criteria?.find((item) => item.id === criterion.id)
      return parseScore(found?.score ?? profile?.score ?? '0')
    })

    return calculateWeightedScore(scoreList, criterionMeta.map((criterion) => defaultWeights[criterion.id] ?? 0))
  })

  const leftWeighted = effectiveScores[0].weightedScore
  const rightWeighted = effectiveScores[1].weightedScore
  const leftBase = baseScores[0]
  const rightBase = baseScores[1]
  const currentPresetLabel = presetLabels[profilePreset] ?? 'Personalizado'
  const scoreDifferences = criterionMeta.map((criterion) => {
    const leftValue = parseScore(
      leftProfile?.criteria?.find((item) => item.id === criterion.id)?.score ?? leftProfile?.score ?? '0',
    )
    const rightValue = parseScore(
      rightProfile?.criteria?.find((item) => item.id === criterion.id)?.score ?? rightProfile?.score ?? '0',
    )

    return {
      criterion: criterion.label,
      difference: leftValue - rightValue,
    }
  })

  const winnerSummary = (() => {
    const positive = scoreDifferences.filter((item) => item.difference > 0)
    const negative = scoreDifferences.filter((item) => item.difference < 0)

    if (!positive.length && !negative.length) {
      return 'Os dois parlamentares ficaram equilibrados em todos os critérios principais.'
    }

    const lead = positive.length >= negative.length ? leftProfile?.name : rightProfile?.name
    const strongestCriteria = (positive.length >= negative.length ? positive : negative)
      .slice(0, 3)
      .map((item) => item.criterion)
      .join(', ')

    return `${lead} aparece com vantagem em ${strongestCriteria}.`
  })()

  return (
    <section className="section-block" id="comparar">
      <div className="section-header">
        <h2>Comparação entre parlamentares</h2>
      </div>

      <div className="comparison-panel">
        <div className="comparison-selects">
          <label>
            Parlamentar A
            <select value={leftRow?.id ?? ''} onChange={(event) => onLeftChange(event.target.value)}>
              {rows.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Parlamentar B
            <select value={rightRow?.id ?? ''} onChange={(event) => onRightChange(event.target.value)}>
              {rows.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="comparison-summary">
          <div className="comparison-card">
            <span>{leftProfile?.name}</span>
            <strong>{leftProfile?.score ?? '0,0'}</strong>
            <small>Nota final</small>
          </div>

          <div className="comparison-card center-card">
            <span>Nota ponderada</span>
            <strong>{leftWeighted.toFixed(1).replace('.', ',')} × {rightWeighted.toFixed(1).replace('.', ',')}</strong>
            <small>{leftWeighted >= rightWeighted ? 'A favor de A' : 'A favor de B'}</small>
          </div>

          <div className="comparison-card">
            <span>{rightProfile?.name}</span>
            <strong>{rightProfile?.score ?? '0,0'}</strong>
            <small>Nota final</small>
          </div>
        </div>

        <p className="comparison-summary-text">{winnerSummary}</p>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Critério</th>
                <th>{leftProfile?.name}</th>
                <th>{rightProfile?.name}</th>
                <th>Diferença</th>
              </tr>
            </thead>
            <tbody>
              {criterionMeta.map((criterion) => {
                const leftValue = parseScore(
                  leftProfile?.criteria?.find((item) => item.id === criterion.id)?.score ?? leftProfile?.score ?? '0',
                )
                const rightValue = parseScore(
                  rightProfile?.criteria?.find((item) => item.id === criterion.id)?.score ?? rightProfile?.score ?? '0',
                )
                const difference = leftValue - rightValue

                return (
                  <tr key={criterion.id}>
                    <td>{criterion.label}</td>
                    <td>{leftValue.toFixed(1).replace('.', ',')}</td>
                    <td>{rightValue.toFixed(1).replace('.', ',')}</td>
                    <td className={difference >= 0 ? 'positive-value' : 'negative-value'}>
                      {difference >= 0 ? '+' : ''}
                      {difference.toFixed(1).replace('.', ',')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="weight-panel">
          <div className="section-header compact-header">
            <h3>Ajuste de pesos por critério</h3>
          </div>

          <div className="profile-preset-row">
            {Object.entries(presetLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`profile-preset ${profilePreset === key ? 'active' : ''}`}
                onClick={() => onApplyPreset?.(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="profile-preset-summary">
            Perfil ativo: <strong>{currentPresetLabel}</strong> · Nota base: {leftBase.toFixed(1).replace('.', ',')} / {rightBase.toFixed(1).replace('.', ',')} · Nota ponderada: {leftWeighted.toFixed(1).replace('.', ',')} / {rightWeighted.toFixed(1).replace('.', ',')}
          </p>

          <div className="weight-grid">
            {criterionMeta.map((criterion) => (
              <label key={criterion.id} className="weight-control">
                <span>{criterion.label}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights[criterion.id] ?? 0}
                  onChange={(event) => onWeightChange(criterion.id, Number(event.target.value))}
                />
                <strong>{weights[criterion.id] ?? 0}%</strong>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
