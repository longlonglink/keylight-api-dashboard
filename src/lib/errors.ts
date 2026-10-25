export type ProviderErrorKind =
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

export interface ProviderErrorCopy {
  title: string
  message: string
}

/**
 * A user-safe error. It never contains the API key, the Authorization header,
 * or a raw provider response.
 */
export class ProviderError extends Error {
  readonly kind: ProviderErrorKind
  readonly title: string
  readonly status?: number

  constructor(kind: ProviderErrorKind, title: string, message: string, status?: number) {
    super(message)
    this.name = 'ProviderError'
    this.kind = kind
    this.title = title
    this.status = status
  }
}

export function createHttpError(status: number, providerName: string): ProviderError {
  if (status === 401) {
    return new ProviderError(
      'invalid-key',
      'Invalid API key',
      `${providerName} rejected this key. Check it and try again.`,
      status,
    )
  }

  if (status === 402) {
    return new ProviderError(
      'insufficient-balance',
      'Insufficient balance',
      `The ${providerName} account has no available balance for API calls.`,
      status,
    )
  }

  if (status === 403) {
    return new ProviderError(
      'forbidden',
      'Permission denied',
      `This key does not have permission to read that information from ${providerName}.`,
      status,
    )
  }

  if (status === 404) {
    return new ProviderError(
      'not-found',
      'Endpoint unavailable',
      `${providerName} may have changed its API. The requested endpoint was not found.`,
      status,
    )
  }

  if (status === 429) {
    return new ProviderError(
      'rate-limit',
      'Too many requests',
      `${providerName} is rate limiting this key. Wait a moment, then refresh.`,
      status,
    )
  }

  if (status >= 500) {
    return new ProviderError(
      'server',
      'Provider unavailable',
      `${providerName} returned a server error. Try refreshing in a moment.`,
      status,
    )
  }

  return new ProviderError(
    'unknown',
    'Request failed',
    `${providerName} could not complete the request (HTTP ${status}).`,
    status,
  )
}

export function createNetworkError(providerName: string): ProviderError {
  return new ProviderError(
    'network',
    'Browser request blocked or offline',
    `The browser could not read a response from ${providerName}. This can be caused by a network problem or a CORS policy. This static app has no proxy and cannot bypass browser restrictions.`,
  )
}

export function createTimeoutError(providerName: string): ProviderError {
  return new ProviderError(
    'timeout',
    'Request timed out',
    `${providerName} took too long to respond. The request was stopped; try again.`,
  )
}

export function createMalformedResponseError(providerName: string): ProviderError {
  return new ProviderError(
    'bad-response',
    'Unexpected API response',
    `${providerName} returned data this dashboard could not read. No values were guessed or filled in.`,
  )
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException
    ? error.name === 'AbortError'
    : error instanceof Error && error.name === 'AbortError'
}

export function toProviderError(error: unknown): ProviderError {
  if (error instanceof ProviderError) return error
  if (isAbortError(error)) {
    return new ProviderError('aborted', 'Request cancelled', 'The request was cancelled.')
  }
  return new ProviderError(
    'unknown',
    'Could not load dashboard',
    'An unexpected browser error occurred while preparing the dashboard.',
  )
}
