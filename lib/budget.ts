interface BudgetConfig {
  monthlyBudgetUsd: number
  alertThresholdUsd: number
}

interface BudgetStatus {
  currentSpendUsd: number
  remainingUsd: number
  allowed: boolean
  alert: boolean
  exhausted: boolean
  projectedMonthlySpendUsd?: number
}

export interface BudgetTracker {
  recordSpend(amountUsd: number): void
  getStatus(): BudgetStatus
  projectTurns(estimatedTurns: number, costPerTurnUsd: number): number
  reset(): void
}

const memorySpendStore = new Map<string, { spend: number; month: string }>()

function getCurrentMonthKey(): string {
  const now = new Date()
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
}

export function createBudgetTracker(config: BudgetConfig) {
  const monthKey = getCurrentMonthKey()
  const storeKey = `budget:${monthKey}`

  function getStoredSpend(): number {
    const stored = memorySpendStore.get(storeKey)
    if (stored && stored.month === monthKey) {
      return stored.spend
    }
    return 0
  }

  function setStoredSpend(spend: number): void {
    memorySpendStore.set(storeKey, { spend, month: monthKey })
  }

  return {
    recordSpend(amountUsd: number): void {
      const current = getStoredSpend()
      setStoredSpend(current + amountUsd)
    },

    getStatus(): BudgetStatus {
      const currentSpendUsd = getStoredSpend()
      const remainingUsd = Math.max(0, config.monthlyBudgetUsd - currentSpendUsd)
      const allowed = currentSpendUsd < config.monthlyBudgetUsd
      const alert = currentSpendUsd >= config.alertThresholdUsd
      const exhausted = currentSpendUsd >= config.monthlyBudgetUsd

      return {
        currentSpendUsd,
        remainingUsd,
        allowed,
        alert,
        exhausted,
      }
    },

    projectTurns(estimatedTurns: number, costPerTurnUsd: number): number {
      const currentSpendUsd = getStoredSpend()
      return currentSpendUsd + estimatedTurns * costPerTurnUsd
    },

    // For testing / manual reset
    reset(): void {
      memorySpendStore.delete(storeKey)
    },
  }
}

export type { BudgetConfig, BudgetStatus }