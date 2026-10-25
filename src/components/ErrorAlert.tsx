import { TriangleAlert, X } from 'lucide-react'
import type { ProviderError } from '../lib/errors'
import { cn } from '../lib/cn'

interface ErrorAlertProps {
  error: ProviderError
  onDismiss?: () => void
  className?: string
}

export function ErrorAlert({ error, onDismiss, className }: ErrorAlertProps) {
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
        <p className="text-sm font-bold text-ink">{error.title}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{error.message}</p>
        {error.kind === 'network' && (
          <p className="mt-2 border-t border-danger/15 pt-2 text-[11px] leading-4 text-muted">
            A pure static frontend cannot bypass CORS. This project will never add a proxy to hide
            that browser restriction.
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="-mr-1 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-danger/10 hover:text-ink"
          aria-label="Dismiss error"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
