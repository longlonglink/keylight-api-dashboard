import { Monitor, Moon, Sun } from 'lucide-react'
import type { ThemePreference } from '../lib/storage'

const labels: Record<ThemePreference, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
}

const nextLabels: Record<ThemePreference, string> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
}

export function ThemeToggle({
  theme,
  onCycle,
}: {
  theme: ThemePreference
  onCycle: () => void
}) {
  const Icon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon

  return (
    <button
      type="button"
      onClick={onCycle}
      className="icon-btn"
      title={`Theme: ${labels[theme]}. Switch to ${nextLabels[theme]}.`}
      aria-label={`Change theme. Current theme: ${labels[theme]}.`}
    >
      <Icon className="size-[17px]" strokeWidth={1.9} />
    </button>
  )
}
