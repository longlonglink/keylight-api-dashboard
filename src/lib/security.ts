/**
 * Secret-handling helpers.
 *
 * The API key is kept in React memory by design. This module only defines the
 * small amount of normalization and cleanup needed by the UI. It never writes,
 * logs, or transmits a key.
 */

export const APP_STORAGE_PREFIX = 'keylight.'

/** Trim accidental whitespace from a pasted credential, but never transform it otherwise. */
export function normalizeApiKey(rawValue: string): string {
  return rawValue.trim()
}

export function isApiKeyBlank(rawValue: string): boolean {
  return normalizeApiKey(rawValue).length === 0
}

/**
 * Removes every storage entry owned by this app from localStorage and
 * sessionStorage. It intentionally does not touch cookies.
 */
export function purgeAppBrowserStorage(): void {
  const stores: Storage[] = []

  try {
    stores.push(window.localStorage)
  } catch {
    /* Storage can be unavailable in hardened browser contexts. */
  }

  try {
    stores.push(window.sessionStorage)
  } catch {
    /* Storage can be unavailable in hardened browser contexts. */
  }

  for (const store of stores) {
    try {
      const keysToRemove: string[] = []

      for (let index = 0; index < store.length; index += 1) {
        const key = store.key(index)
        if (key && key.startsWith(APP_STORAGE_PREFIX)) {
          keysToRemove.push(key)
        }
      }

      for (const key of keysToRemove) {
        store.removeItem(key)
      }
    } catch {
      /* Cleanup should never break the UI. */
    }
  }
}
