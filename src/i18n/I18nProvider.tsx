import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { readLanguagePreference, saveLanguagePreference } from '../lib/storage'
import {
  translate,
  type Language,
  type TranslationKey,
} from './translations'

interface I18nContextValue {
  language: Language
  locale: string
  setLanguage: (language: Language) => void
  t: (key: TranslationKey, values?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function detectInitialLanguage(): Language {
  const saved = readLanguagePreference()
  if (saved) return saved

  const browserLanguage =
    typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en'
  return browserLanguage.startsWith('zh') ? 'zh' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    saveLanguagePreference(nextLanguage)
  }, [])

  const t = useCallback(
    (key: TranslationKey, values?: Record<string, string | number>) =>
      translate(language, key, values),
    [language],
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      locale: language === 'zh' ? 'zh-CN' : 'en-US',
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }

  return context
}
