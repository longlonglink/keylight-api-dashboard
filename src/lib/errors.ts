export type ProviderErrorKind =
  | 'key-required'
  | 'invalid-key'
  | 'forbidden'
  | 'insufficient-balance'
  | 'not-found'
  | 'rate-limit'
  | 'server'
  | 'network'
  | 'timeout'
  | 'bad-response'
  | 'unknown'
  | 'aborted'

/**
 * A user-safe error code. It never contains an API key, the Authorization
 * header, or a raw provider response. Localized copy lives in the i18n layer.
 */
export class ProviderError extends Error {
  readonly kind: ProviderErrorKind
  readonly status?: number

  constructor(kind: ProviderErrorKind, status?: number) {
    super(kind)
    this.name = 'ProviderError'
    this.kind = kind
    this.status = status
  }
}

export function createHttpError(status: number): ProviderError {
  if (status === 401) return new ProviderError('invalid-key', status)
  if (status === 402) return new ProviderError('insufficient-balance', status)
  if (status === 403) return new ProviderError('forbidden', status)
  if (status === 404) return new ProviderError('not-found', status)
  if (status === 429) return new ProviderError('rate-limit', status)
  if (status >= 500) return new ProviderError('server', status)
  return new ProviderError('unknown', status)
}

export function createNetworkError(): ProviderError {
  return new ProviderError('network')
}

export function createTimeoutError(): ProviderError {
  return new ProviderError('timeout')
}

export function createMalformedResponseError(): ProviderError {
  return new ProviderError('bad-response')
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException
    ? error.name === 'AbortError'
    : error instanceof Error && error.name === 'AbortError'
}

export function toProviderError(error: unknown): ProviderError {
  if (error instanceof ProviderError) return error
  if (isAbortError(error)) return new ProviderError('aborted')
  return new ProviderError('unknown')
}
