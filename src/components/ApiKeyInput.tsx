import { useId, useState } from 'react'
import { ClipboardPaste, Eye, EyeOff, KeyRound, X } from 'lucide-react'
import { normalizeApiKey } from '../lib/security'
import { cn } from '../lib/cn'
import { useI18n } from '../i18n/I18nProvider'

interface ApiKeyInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  hasError?: boolean
}

type PasteNotice = { kind: 'error' | 'success'; message: string } | null

export function ApiKeyInput({
  value,
  onChange,
  disabled = false,
  hasError = false,
}: ApiKeyInputProps) {
  const { t } = useI18n()
  const inputId = useId()
  const hintId = useId()
  const [isVisible, setIsVisible] = useState(false)
  const [pasteNotice, setPasteNotice] = useState<PasteNotice>(null)

  const handleManualChange = (nextValue: string) => {
    setPasteNotice(null)
    onChange(nextValue)
  }

  const handleClear = () => {
    setPasteNotice(null)
    setIsVisible(false)
    onChange('')
  }

  const handlePaste = async () => {
    setPasteNotice(null)

    try {
      if (!navigator.clipboard?.readText) {
        throw new Error('Clipboard API unavailable')
      }

      const clipboardValue = normalizeApiKey(await navigator.clipboard.readText())

      if (!clipboardValue) {
        setPasteNotice({ kind: 'error', message: t('home.pasteEmpty') })
        return
      }

      onChange(clipboardValue)
      setPasteNotice({ kind: 'success', message: t('home.pasteSuccess') })
    } catch {
      setPasteNotice({ kind: 'error', message: t('home.pasteBlocked') })
    }
  }

  return (
    <div>
      <div className="field-label">
        <label htmlFor={inputId}>{t('home.keyLabel')}</label>
        <span>{t('home.bearerOnly')}</span>
      </div>

      <div
        className={cn(
          'input-shell',
          hasError && 'border-danger/45 focus-within:border-danger/60 focus-within:ring-danger/10',
        )}
      >
        <KeyRound className="size-4 shrink-0 text-faint" aria-hidden="true" />
        <input
          id={inputId}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(event) => handleManualChange(event.target.value)}
          placeholder="sk-••••••••••••••••••••"
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={`${hintId} ${inputId}-paste-status`}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          data-1p-ignore="true"
        />

        {value.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-line/50 hover:text-ink"
            aria-label={t('home.clearKeyAria')}
            title={t('home.clearKeyAria')}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          disabled={disabled}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-line/50 hover:text-ink"
          aria-label={isVisible ? t('home.hideKeyAria') : t('home.showKeyAria')}
          title={isVisible ? t('home.hideKeyAria') : t('home.showKeyAria')}
        >
          {isVisible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={handlePaste}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 rounded-full px-1.5 py-1 text-[11px] font-semibold text-muted transition hover:bg-surface-muted hover:text-ink"
        >
          <ClipboardPaste className="size-3.5" aria-hidden="true" />
          {t('home.paste')}
        </button>
        <span id={hintId} className="px-1.5 text-[10px] leading-4 text-faint">
          {t('home.neverInUrl')}
        </span>
      </div>

      <p
        id={`${inputId}-paste-status`}
        className={cn(
          'min-h-4 px-1.5 text-[10px] leading-4',
          pasteNotice?.kind === 'error' ? 'text-danger' : 'text-accent',
        )}
        aria-live="polite"
      >
        {pasteNotice?.message ?? ''}
      </p>
    </div>
  )
}
