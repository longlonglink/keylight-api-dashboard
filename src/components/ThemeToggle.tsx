import { Monitor, Moon, Sun } from 'lucide-react'
import type { ThemePreference } from '../lib/storage'
import { useI18n } from '../i18n/I18nProvider'

const icons: Record<ThemePreference, typeof Sun> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
}

export function ThemeToggle({
  theme,
  onCycle,
}: {
  theme: ThemePreference
  onCycle: () => void
}) {
  const { t } = useI18n()
  const Icon = icons[theme]
  const themeLabel = t(`theme.${theme}`)

  return (
    <button
      type="button"
      onClick={onCycle}
      className="icon-btn"
      title={t('theme.change', { theme: themeLabel })}
      aria-label={t('theme.change', { theme: themeLabel })}
    >
      <Icon className="size-[17px]" strokeWidth={1.9} />
    </button>
  )
}
