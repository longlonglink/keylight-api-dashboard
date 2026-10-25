import { APP_STORAGE_PREFIX } from './security'
import type { Language } from '../i18n/translations'

export const STORAGE_KEYS = {
  theme: `${APP_STORAGE_PREFIX}theme.v1`,
  language: `${APP_STORAGE_PREFIX}language.v1`,
} as const

export type ThemePreference = 'system' | 'light' | 'dark'

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
    /* Preferences are optional; the app remains usable without storage. */
  }
}

export function readThemePreference(): ThemePreference {
  const value = readItem(STORAGE_KEYS.theme)
  return value === 'light' || value === 'dark' || value === 'system' ? value : 'system'
}

export function saveThemePreference(theme: ThemePreference): void {
  writeItem(STORAGE_KEYS.theme, theme)
}

export function readLanguagePreference(): Language | null {
  const value = readItem(STORAGE_KEYS.language)
  return value === 'zh' || value === 'en' ? value : null
}

export function saveLanguagePreference(language: Language): void {
  writeItem(STORAGE_KEYS.language, language)
}
