import { useEffect, useRef } from 'react'
import {
  Clock3,
  HardDrive,
  KeyRound,
  Monitor,
  Moon,
  ShieldCheck,
  Sun,
  Trash2,
  X,
} from 'lucide-react'
import type { ProviderMeta } from '../providers/types'
import {
  AUTO_REFRESH_OPTIONS,
  type AutoRefreshMinutes,
  type ThemePreference,
} from '../lib/storage'
import { ProviderGlyph } from './ProviderGlyph'
import { cn } from '../lib/cn'

interface SettingsProps {
  open: boolean
  onClose: () => void
  theme: ThemePreference
  onThemeChange: (theme: ThemePreference) => void
  autoRefresh: AutoRefreshMinutes
  onAutoRefreshChange: (minutes: AutoRefreshMinutes) => void
  remember: boolean
  onRememberChange: (remember: boolean) => void
  onClearApiKey: () => void
  provider: ProviderMeta
}

const themeOptions: ReadonlyArray<{
  value: ThemePreference
  label: string
  icon: typeof Sun
}> = [
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
]

export function Settings({
  open,
  onClose,
  theme,
  onThemeChange,
  autoRefresh,
  onAutoRefreshChange,
  remember,
  onRememberChange,
  onClearApiKey,
  provider,
}: SettingsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const providerHost = new URL(provider.baseUrl).hostname

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const handleClear = () => {
    onClose()
    onClearApiKey()
  }

  return (
    <dialog
      ref={dialogRef}
      className="settings-dialog"
      aria-labelledby="settings-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[26px] border border-line bg-surface shadow-float">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line/80 bg-surface/95 px-5 py-5 backdrop-blur sm:px-6">
          <div>
            <p className="eyebrow">Local settings</p>
            <h2
              id="settings-title"
              className="mt-1.5 text-lg font-extrabold tracking-[-0.03em] text-ink"
            >
              Preferences
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="icon-btn size-9"
            aria-label="Close settings"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-6 px-5 py-5 sm:px-6">
          <section>
            <p className="field-label">Provider</p>
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface-muted/55 p-3.5">
              <ProviderGlyph className="size-9 rounded-lg" iconClassName="size-4" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-ink">{provider.name}</p>
                <p className="mt-0.5 truncate font-mono text-[9px] text-faint">{providerHost}</p>
              </div>
              <span className="chip shrink-0 py-1">Official API</span>
            </div>
          </section>

          <section>
            <p className="field-label">Appearance</p>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-line bg-surface-muted/55 p-1.5">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onThemeChange(value)}
                  aria-pressed={theme === value}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-lg px-2 py-2.5 text-[10px] font-semibold transition sm:flex-row sm:justify-center',
                    theme === value
                      ? 'bg-surface text-ink shadow-sm'
                      : 'text-muted hover:text-ink',
                  )}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="field-label mb-0">Auto refresh</p>
              <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.08em] text-faint">
                <Clock3 className="size-3" aria-hidden="true" />
                Default off
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {AUTO_REFRESH_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onAutoRefreshChange(option.value)}
                  aria-pressed={autoRefresh === option.value}
                  className={cn(
                    'rounded-lg border px-2 py-2.5 text-[10px] font-semibold transition',
                    autoRefresh === option.value
                      ? 'border-accent/30 bg-accent-soft text-accent'
                      : 'border-line bg-surface text-muted hover:bg-surface-muted hover:text-ink',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] leading-4 text-muted">
              Keep this off if you want to avoid consuming provider rate limits in the background.
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-surface-muted/40 p-4">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-muted">
                <KeyRound className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-ink">API credential</p>
                <p className="mt-1 text-[10px] leading-4 text-muted">
                  Currently held in this tab&apos;s JavaScript memory.
                </p>
              </div>
              <span className="status-dot mt-2 shrink-0" aria-hidden="true" />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-line/80 pt-4">
              <div className="flex items-start gap-2.5">
                <HardDrive className="mt-0.5 size-3.5 shrink-0 text-muted" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold text-ink">Remember on this device</p>
                  <p className="mt-0.5 text-[9px] leading-4 text-muted">
                    {remember
                      ? 'Saved in this browser’s localStorage.'
                      : 'Off — the key disappears when this tab closes.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={remember}
                aria-label="Remember API key on this device"
                onClick={() => onRememberChange(!remember)}
                className={cn(
                  'relative h-6 w-11 shrink-0 rounded-full border transition',
                  remember
                    ? 'border-accent bg-accent'
                    : 'border-line bg-canvas hover:border-faint/60',
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 size-[18px] rounded-full bg-white shadow-sm transition-transform',
                    remember ? 'translate-x-[22px]' : 'translate-x-0.5',
                  )}
                  aria-hidden="true"
                />
              </button>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-danger/20 bg-danger-soft px-3 py-2.5 text-[10px] font-bold text-danger transition hover:border-danger/35"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              Clear API key & local data
            </button>
            <p className="mt-2 text-center text-[8px] leading-3.5 text-faint">
              Also clears theme and auto-refresh preferences.
            </p>
          </section>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-[9px] leading-4 text-faint">
              These preferences are stored only in this browser. No key, account data, or usage is
              sent to this website.
            </p>
          </div>
        </div>
      </div>
    </dialog>
  )
}
