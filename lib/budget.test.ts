import { describe, expect, it, beforeEach } from 'vitest'
import { BudgetTracker, createBudgetTracker, BudgetStatus } from '@/lib/budget'

describe('budget tracker', () => {
  beforeEach(() => {
    // Create a fresh tracker instance for each test
    // The internal memory store is shared, so we need to reset it
    // We'll use a unique config to create separate store keys per test
  })

  it('starts with zero spend and allows requests', () => {
    const tracker = createBudgetTracker({ monthlyBudgetUsd: 10, alertThresholdUsd: 8 })
    const status = tracker.getStatus()
    expect(status.currentSpendUsd).toBe(0)
    expect(status.allowed).toBe(true)
    expect(status.alert).toBe(false)
  })

  it('records spend and updates remaining budget', () => {
    const tracker = createBudgetTracker({ monthlyBudgetUsd: 10, alertThresholdUsd: 8 })
    tracker.recordSpend(0.005) // ~one turn
    const status = tracker.getStatus()
    expect(status.currentSpendUsd).toBeCloseTo(0.005, 3)
    expect(status.remainingUsd).toBeCloseTo(9.995, 3)
    expect(status.allowed).toBe(true)
  })

  it('triggers alert at threshold', () => {
    const tracker = createBudgetTracker({ monthlyBudgetUsd: 10, alertThresholdUsd: 8 })
    tracker.recordSpend(8.5)
    const status = tracker.getStatus()
    expect(status.alert).toBe(true)
    expect(status.allowed).toBe(true) // still allowed at alert
  })

  it('blocks requests when budget exhausted', () => {
    const tracker = createBudgetTracker({ monthlyBudgetUsd: 10, alertThresholdUsd: 8 })
    tracker.recordSpend(10.5)
    const status = tracker.getStatus()
    expect(status.allowed).toBe(false)
    expect(status.exhausted).toBe(true)
  })

  it('calculates projected spend per turn', () => {
    // Use a fresh budget config with a different month-like key by using unique budget
    const tracker = createBudgetTracker({ monthlyBudgetUsd: 100, alertThresholdUsd: 80 })
    tracker.reset() // Ensure clean slate
    // projectTurns returns current + projected, so with 0 current spend:
    const projected = tracker.projectTurns(400, 0.0045) // 400 turns * $0.0045 = $1.80
    expect(projected).toBeCloseTo(1.8, 1)
  })
})