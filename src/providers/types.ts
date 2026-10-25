export type ProviderId = 'deepseek'

export interface ProviderCapabilities {
  /** The provider exposes a balance endpoint. */
  balance: boolean
  /** The provider exposes a model catalogue endpoint. */
  models: boolean
}

export interface ProviderMeta {
  id: ProviderId
  name: string
  baseUrl: string
  docsUrl: string
  apiKeysUrl: string
  capabilities: ProviderCapabilities
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

/**
 * Only the two datasets currently documented and supported by DeepSeek are
 * represented. There is no Account or Usage field because those APIs do not
 * exist in the public documentation.
 */
export interface DashboardData {
  provider: ProviderMeta
  fetchedAt: string
  balance: BalanceSnapshot
  models: ModelInfo[]
}

export interface ApiProvider {
  meta: ProviderMeta

  /**
   * Fetches a dashboard snapshot directly from the official provider API.
   * Implementations must never route requests through an application server.
   */
  getDashboard(apiKey: string, signal?: AbortSignal): Promise<DashboardData>
}
