export const parseScore = (value) => Number(String(value).replace(',', '.').replace(/\s+/g, ''))

export const average = (items) => {
  if (!items.length) return 0
  return items.reduce((sum, value) => sum + value, 0) / items.length
}

export const calculateWeightedScore = (scores = [], weights = []) => {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

  if (!scores.length || !totalWeight) {
    return 0
  }

  const weightedSum = scores.reduce((sum, score, index) => sum + score * (weights[index] || 0), 0)

  return weightedSum / totalWeight
}
