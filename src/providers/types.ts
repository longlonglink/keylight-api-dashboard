export type ProviderId = 'deepseek'

export interface ProviderCapabilities {
  /** The provider exposes a balance endpoint. */
  balance: boolean
  /** The provider exposes a model catalogue endpoint. */
  models: boolean
  /** The provider exposes current usage totals. */
  usage: boolean
  /** The provider exposes historical usage data suitable for a chart. */
  usageHistory: boolean
  /** The provider exposes account metadata such as plan or creation date. */
  account: boolean
}

export interface ProviderMeta {
  id: ProviderId
  name: string
  description: string
  baseUrl: string
  docsUrl: string
  apiKeysUrl: string
  capabilities: ProviderCapabilities
  limitations: string[]
}

export interface ModelInfo {
  id: string
  name: string
  ownedBy: string | null
  contextWindow: number | null
  maxOutputTokens: number | null
  inputModalities: string[]
  outputModalities: string[]
  effortLevels: string[]
}

export interface BalanceEntry {
  currency: string
  totalBalance: string
  grantedBalance: string
  toppedUpBalance: string
}

export interface BalanceSnapshot {
  isAvailable: boolean
  entries: BalanceEntry[]
}

export interface AccountSnapshot {
  /** Derived from a successful authenticated request, not invented account data. */
  status: 'Connected'
  plan: string | null
  accountId: string | null
  createdAt: string | null
  currency: string | null
}

export interface UsageAmount {
  amount: number
  currency: string
}

export interface UsagePoint {
  date: string
  amount: number
  currency: string
}

export interface UsageSnapshot {
  currency: string | null
  today: UsageAmount | null
  last7Days: UsageAmount | null
  last30Days: UsageAmount | null
  allTime: UsageAmount | null
  history: UsagePoint[]
}

export interface DashboardWarning {
  title: string
  detail: string
}

export interface DashboardData {
  provider: ProviderMeta
  fetchedAt: string
  models: ModelInfo[]
  balance: BalanceSnapshot | null
  account: AccountSnapshot | null
  usage: UsageSnapshot | null
  capabilities: ProviderCapabilities
  warnings: DashboardWarning[]
}

export interface ApiProvider {
  meta: ProviderMeta

  /**
   * Verifies that the key can reach an authenticated endpoint.
   * Implementations must never log or persist the key.
   */
  validateApiKey(apiKey: string, signal?: AbortSignal): Promise<void>

  /**
   * Fetches a dashboard snapshot directly from the official provider API.
   * Implementations must never route the request through an application server.
   */
  getDashboard(apiKey: string, signal?: AbortSignal): Promise<DashboardData>
}
