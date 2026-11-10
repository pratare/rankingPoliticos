import { describe, expect, it } from 'vitest'
import { average, calculateWeightedScore, parseScore } from './scoring'

describe('scoring helpers', () => {
  it('parses a comma-formatted score into a number', () => {
    expect(parseScore('8,7')).toBe(8.7)
    expect(parseScore(' 9, 5 ')).toBe(9.5)
  })

  it('returns 0 when averaging an empty list', () => {
    expect(average([])).toBe(0)
  })

  it('computes a weighted average for a non-empty list', () => {
    expect(calculateWeightedScore([8, 10], [2, 1])).toBe(8.666666666666666)
  })

  it('returns 0 when there are no weighted values', () => {
    expect(calculateWeightedScore([8, 10], [0, 0])).toBe(0)
  })
})
