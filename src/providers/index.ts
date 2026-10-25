import { deepseekProvider } from './deepseek'
import type { ApiProvider, ProviderId } from './types'

export const DEFAULT_PROVIDER_ID: ProviderId = 'deepseek'

export const PROVIDER_LIST: ReadonlyArray<ApiProvider> = [deepseekProvider]

const PROVIDERS: Record<ProviderId, ApiProvider> = {
  deepseek: deepseekProvider,
}

export function getProviderById(id: string): ApiProvider {
  if (id in PROVIDERS) {
    return PROVIDERS[id as ProviderId]
  }

  return PROVIDERS[DEFAULT_PROVIDER_ID]
}

export type { ApiProvider, ProviderId }
