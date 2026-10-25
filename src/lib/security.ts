/**
 * Secret-handling helpers.
 *
 * This version of Keylight deliberately has no feature that persists an API
 * key. The key is held only in React memory for the current page.
 */

export const APP_STORAGE_PREFIX = 'keylight.'

/** Trim accidental whitespace from a pasted credential. */
export function normalizeApiKey(rawValue: string): string {
  return rawValue.trim()
}

/**
 * Removes credentials left by older versions of this app.
 *
 * Earlier builds offered an optional "remember" feature. The current version
 * never writes a key to storage, but this cleanup prevents a stale credential
 * from a previous visit from remaining in the user's browser.
 */
export function purgeLegacyCredentialStorage(): void {
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
        if (
          key &&
          (key.startsWith(`${APP_STORAGE_PREFIX}api-key`) ||
            key.startsWith(`${APP_STORAGE_PREFIX}remembered-key`))
        ) {
          keysToRemove.push(key)
        }
      }

      for (const key of keysToRemove) {
        store.removeItem(key)
      }
    } catch {
      /* Cleanup must never break the app. */
    }
  }
}
