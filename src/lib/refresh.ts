export const REFRESH_INTERVALS = [10_000, 30_000, 60_000, 300_000, 600_000] as const

export type RefreshIntervalMs = (typeof REFRESH_INTERVALS)[number]

export const DEFAULT_REFRESH_INTERVAL_MS: RefreshIntervalMs = 30_000

export function isRefreshInterval(value: number): value is RefreshIntervalMs {
  return (REFRESH_INTERVALS as readonly number[]).includes(value)
}
