import type { ProviderErrorKind } from '../lib/errors'
import type { TranslationKey } from './translations'

export const ERROR_TITLE_KEYS: Record<ProviderErrorKind, TranslationKey> = {
  'key-required': 'errors.keyRequired.title',
  'invalid-key': 'errors.invalidKey.title',
  forbidden: 'errors.forbidden.title',
  'insufficient-balance': 'errors.insufficientBalance.title',
  'not-found': 'errors.notFound.title',
  'rate-limit': 'errors.rateLimit.title',
  server: 'errors.server.title',
  network: 'errors.network.title',
  timeout: 'errors.timeout.title',
  'bad-response': 'errors.badResponse.title',
  unknown: 'errors.unknown.title',
  aborted: 'errors.aborted.title',
}

export const ERROR_MESSAGE_KEYS: Record<ProviderErrorKind, TranslationKey> = {
  'key-required': 'errors.keyRequired.message',
  'invalid-key': 'errors.invalidKey.message',
  forbidden: 'errors.forbidden.message',
  'insufficient-balance': 'errors.insufficientBalance.message',
  'not-found': 'errors.notFound.message',
  'rate-limit': 'errors.rateLimit.message',
  server: 'errors.server.message',
  network: 'errors.network.message',
  timeout: 'errors.timeout.message',
  'bad-response': 'errors.badResponse.message',
  unknown: 'errors.unknown.message',
  aborted: 'errors.aborted.message',
}
