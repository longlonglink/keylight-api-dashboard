import { APP_STORAGE_PREFIX, purgeAppBrowserStorage } from './security'

export const STORAGE_KEYS = {
  apiKey: `${APP_STORAGE_PREFIX}api-key.v1`,
  theme: `${APP_STORAGE_PREFIX}theme.v1`,
  autoRefresh: `${APP_STORAGE_PREFIX}auto-refresh.v1`,
} as const

export type ThemePreference = 'system' | 'light' | 'dark'
export type AutoRefreshMinutes = 0 | 1 | 5 | 15

export const AUTO_REFRESH_OPTIONS: ReadonlyArray<{
  value: AutoRefreshMinutes
  label: string
}> = [
  { value: 0, label: 'Off' },
  { value: 1, label: '1 min' },
  { value: 5, label: '5 min' },
  { value: 15, label: '15 min' },
]

function readItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* The app remains usable when storage is unavailable. */
  }
}

function removeItem(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* The app remains usable when storage is unavailable. */
  }
}

/** Only populated after the user explicitly enables "Remember on this device". */
export function readRememberedApiKey(): string | null {
  const stored = readItem(STORAGE_KEYS.apiKey)
  return stored && stored.trim().length > 0 ? stored : null
}

export function saveRememberedApiKey(apiKey: string): void {
  writeItem(STORAGE_KEYS.apiKey, apiKey)
}

export function removeRememberedApiKey(): void {
  removeItem(STORAGE_KEYS.apiKey)
}

export function readThemePreference(): ThemePreference {
  const value = readItem(STORAGE_KEYS.theme)
  return value === 'light' || value === 'dark' || value === 'system' ? value : 'system'
}

export function saveThemePreference(theme: ThemePreference): void {
  writeItem(STORAGE_KEYS.theme, theme)
}

export function readAutoRefreshMinutes(): AutoRefreshMinutes {
  const value = Number(readItem(STORAGE_KEYS.autoRefresh))
  return value === 1 || value === 5 || value === 15 ? value : 0
}

export function saveAutoRefreshMinutes(minutes: AutoRefreshMinutes): void {
  writeItem(STORAGE_KEYS.autoRefresh, String(minutes))
}

/**
 * "Clear API key" clears the credential and every other app-owned local
 * preference, in both localStorage and sessionStorage. Cookies are untouched.
 */
export function clearAppStorage(): void {
  purgeAppBrowserStorage()
}
