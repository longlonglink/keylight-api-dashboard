import { useCallback, useEffect, useState } from 'react'
import {
  readThemePreference,
  saveThemePreference,
  type ThemePreference,
} from '../lib/storage'

function applyThemeToDocument(preference: ThemePreference): void {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const useDark = preference === 'dark' || (preference === 'system' && systemPrefersDark)

  document.documentElement.classList.toggle('dark', useDark)
  document.documentElement.style.colorScheme = useDark ? 'dark' : 'light'
}

export function useTheme(): {
  theme: ThemePreference
  setTheme: (nextTheme: ThemePreference) => void
  cycleTheme: () => void
} {
  const [theme, setThemeState] = useState<ThemePreference>(() => readThemePreference())

  useEffect(() => {
    applyThemeToDocument(theme)

    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => applyThemeToDocument('system')

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    setThemeState(nextTheme)
    saveThemePreference(nextTheme)
  }, [])

  const cycleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const nextTheme: ThemePreference =
        currentTheme === 'system' ? 'light' : currentTheme === 'light' ? 'dark' : 'system'
      saveThemePreference(nextTheme)
      return nextTheme
    })
  }, [])

  return { theme, setTheme, cycleTheme }
}
