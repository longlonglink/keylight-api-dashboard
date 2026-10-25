import { TriangleAlert, X } from 'lucide-react'
import type { ProviderError } from '../lib/errors'
import { ERROR_MESSAGE_KEYS, ERROR_TITLE_KEYS } from '../i18n/errors'
import { useI18n } from '../i18n/I18nProvider'
import { cn } from '../lib/cn'

interface ErrorAlertProps {
  error: ProviderError
  providerName: string
  onDismiss?: () => void
  className?: string
}

export function ErrorAlert({ error, providerName, onDismiss, className }: ErrorAlertProps) {
  const { t } = useI18n()
  const values = {
    provider: providerName,
    status: error.status ?? '—',
  }

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-danger/20 bg-danger-soft px-4 py-3.5 text-left',
        className,
      )}
    >
      <TriangleAlert className="mt-0.5 size-[18px] shrink-0 text-danger" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-ink">{t(ERROR_TITLE_KEYS[error.kind])}</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          {t(ERROR_MESSAGE_KEYS[error.kind], values)}
        </p>
        {error.kind === 'network' && (
          <p className="mt-2 border-t border-danger/15 pt-2 text-[11px] leading-4 text-muted">
            {t('errors.network.extra')}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="-mr-1 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-danger/10 hover:text-ink"
          aria-label={t('common.dismiss')}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
