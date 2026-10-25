import {
  createHttpError,
  createMalformedResponseError,
  createNetworkError,
  createTimeoutError,
  isAbortError,
} from '../lib/errors'
import type {
  ApiProvider,
  BalanceEntry,
  BalanceSnapshot,
  DashboardData,
  ModelInfo,
  ProviderMeta,
} from './types'

const PROVIDER_NAME = 'DeepSeek'
const API_ROOT = 'https://api.deepseek.com'
const MODELS_PATH = '/models'
const BALANCE_PATH = '/user/balance'
const REQUEST_TIMEOUT_MS = 20_000

const meta: ProviderMeta = {
  id: 'deepseek',
  name: PROVIDER_NAME,
  baseUrl: API_ROOT,
  docsUrl: 'https://api-docs.deepseek.com/',
  apiKeysUrl: 'https://platform.deepseek.com/api_keys',
  capabilities: {
    balance: true,
    models: true,
  },
}

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function optionalString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function optionalNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function abortError(): DOMException {
  return new DOMException('The request was cancelled.', 'AbortError')
}

/**
 * Issues a GET request from the browser straight to the official API.
 * The key is placed only in the Authorization header — never in a URL.
 */
async function requestJson(
  path: string,
  apiKey: string,
  signal?: AbortSignal,
): Promise<unknown> {
  const controller = new AbortController()
  let timedOut = false

  const forwardAbort = () => controller.abort()
  if (signal?.aborted) {
    controller.abort()
  } else {
    signal?.addEventListener('abort', forwardAbort, { once: true })
  }

  const timeoutId = window.setTimeout(() => {
    timedOut = true
    controller.abort()
  }, REQUEST_TIMEOUT_MS)

  try {
    let response: Response

    try {
      response = await fetch(`${API_ROOT}${path}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        cache: 'no-store',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
      })
    } catch {
      if (signal?.aborted) throw abortError()
      if (timedOut) throw createTimeoutError()
      throw createNetworkError()
    }

    if (!response.ok) {
      throw createHttpError(response.status)
    }

    try {
      return (await response.json()) as unknown
    } catch (error) {
      if (signal?.aborted || isAbortError(error)) throw abortError()
      if (timedOut) throw createTimeoutError()
      throw createMalformedResponseError()
    }
  } finally {
    window.clearTimeout(timeoutId)
    signal?.removeEventListener('abort', forwardAbort)
  }
}

function parseModels(payload: unknown): ModelInfo[] {
  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw createMalformedResponseError()
  }

  const models: ModelInfo[] = []

  for (const item of payload.data) {
    if (!isRecord(item) || typeof item.id !== 'string') continue

    const effort = isRecord(item.effort) ? item.effort : null

    models.push({
      id: item.id,
      name: optionalString(item.name) ?? item.id,
      ownedBy: optionalString(item.owned_by),
      contextWindow: optionalNumber(item.context_window),
      maxOutputTokens: optionalNumber(item.max_output_tokens),
      inputModalities: stringArray(item.input_modalities),
      outputModalities: stringArray(item.output_modalities),
      effortLevels: effort ? stringArray(effort.supported_levels) : [],
    })
  }

  return models
}

function parseBalanceEntry(value: unknown): BalanceEntry | null {
  if (!isRecord(value)) return null

  const { currency, total_balance, granted_balance, topped_up_balance } = value

  if (
    typeof currency !== 'string' ||
    typeof total_balance !== 'string' ||
    typeof granted_balance !== 'string' ||
    typeof topped_up_balance !== 'string'
  ) {
    return null
  }

  return {
    currency,
    totalBalance: total_balance,
    grantedBalance: granted_balance,
    toppedUpBalance: topped_up_balance,
  }
}

function parseBalance(payload: unknown): BalanceSnapshot {
  if (
    !isRecord(payload) ||
    typeof payload.is_available !== 'boolean' ||
    !Array.isArray(payload.balance_infos)
  ) {
    throw createMalformedResponseError()
  }

  const entries = payload.balance_infos.map(parseBalanceEntry)

  if (entries.some((entry) => entry === null)) {
    throw createMalformedResponseError()
  }

  return {
    isAvailable: payload.is_available,
    entries: entries as BalanceEntry[],
  }
}

export const deepseekProvider: ApiProvider = {
  meta,

  async getDashboard(apiKey: string, signal?: AbortSignal): Promise<DashboardData> {
    // Both endpoints are documented read-only operations. /models also acts as
    // authentication validation; no billable chat or completion request is used.
    const modelsPayload = await requestJson(MODELS_PATH, apiKey, signal)
    const models = parseModels(modelsPayload)

    const balancePayload = await requestJson(BALANCE_PATH, apiKey, signal)
    const balance = parseBalance(balancePayload)

    return {
      provider: meta,
      fetchedAt: new Date().toISOString(),
      balance,
      models,
    }
  },
}
