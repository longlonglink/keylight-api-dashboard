import {
  AlertCircle,
  Clock3,
  Info,
  LockKeyhole,
  RefreshCw,
  Wallet,
} from 'lucide-react'
import type { BalanceSnapshot } from '../providers/types'
import type { TranslationKey } from '../i18n/translations'
import {
  REFRESH_INTERVALS,
  isRefreshInterval,
  type RefreshIntervalMs,
} from '../lib/refresh'
import { formatTime } from '../lib/format'
import { cn } from '../lib/cn'
import { useI18n } from '../i18n/I18nProvider'

const INTERVAL_LABELS: Record<RefreshIntervalMs, TranslationKey> = {
  10_000: 'balance.interval10s',
  30_000: 'balance.interval30s',
  60_000: 'balance.interval1m',
  300_000: 'balance.interval5m',
  600_000: 'balance.interval10m',
}

interface BalanceCardProps {
  balance: BalanceSnapshot
  lastUpdated: string
  isRefreshing: boolean
  refreshError: boolean
  autoRefresh: boolean
  intervalMs: RefreshIntervalMs
  onRefresh: () => void
  onToggleAutoRefresh: () => void
  onIntervalChange: (intervalMs: RefreshIntervalMs) => void
}

export function BalanceCard({
  balance,
  lastUpdated,
  isRefreshing,
  refreshError,
  autoRefresh,
  intervalMs,
  onRefresh,
  onToggleAutoRefresh,
  onIntervalChange,
}: BalanceCardProps) {
  const { t, locale } = useI18n()
  const entries = balance.entries
  const intervalLabel = t(INTERVAL_LABELS[intervalMs])
  const autoState = autoRefresh ? t('common.on') : t('common.off')

  return (
    <article className="card p-5 sm:p-7" aria-busy={isRefreshing}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-muted text-muted">
            <Wallet className="size-[18px]" strokeWidth={1.9} aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              {t('balance.title')}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                {t('balance.live')}
              </span>
            </div>
          </div>
        </div>

        <span
          className={cn(
            'rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em]',
            balance.isAvailable
              ? 'border-accent/20 bg-accent-soft text-accent'
              : 'border-danger/20 bg-danger-soft text-danger',
          )}
        >
          {balance.isAvailable ? t('balance.ready') : t('balance.insufficient')}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="py-8">
          <p className="text-2xl font-extrabold tracking-[-0.04em] text-ink">
            {t('balance.emptyTitle')}
          </p>
          <p className="mt-2 max-w-lg text-xs leading-5 text-muted">{t('balance.emptyBody')}</p>
        </div>
      ) : (
        <div className={cn('mt-6', entries.length > 1 && 'grid gap-3 md:grid-cols-2')}>
          {entries.map((entry) => (
            <section
              key={entry.currency}
              className={cn(entries.length > 1 && 'rounded-2xl border border-line p-4')}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {t('balance.total')}
                  </p>
                  <p
                    className={cn(
                      'numeric mt-2 font-extrabold leading-none tracking-[-0.06em]',
                      entry.totalBalance
                        ? 'text-[2.7rem] text-ink sm:text-[3.25rem]'
                        : 'text-2xl text-muted',
                    )}
                  >
                    {entry.totalBalance ?? t('balance.unavailable')}
                  </p>
                </div>
                <span className="shrink-0 rounded-lg border border-line bg-surface-muted px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
                  {entry.currency}
                </span>
              </div>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface-muted/60 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                    {t('balance.granted')}
                  </p>
                  <p
                    className={cn(
                      'numeric mt-1.5 font-bold',
                      entry.grantedBalance
                        ? 'text-lg text-ink sm:text-xl'
                        : 'text-sm text-muted',
                    )}
                  >
                    {entry.grantedBalance ?? t('balance.unavailable')}{' '}
                    <span className="font-mono text-[9px] font-medium text-faint">
                      {entry.currency}
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-surface-muted/60 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                    {t('balance.toppedUp')}
                  </p>
                  <p
                    className={cn(
                      'numeric mt-1.5 font-bold',
                      entry.toppedUpBalance
                        ? 'text-lg text-ink sm:text-xl'
                        : 'text-sm text-muted',
                    )}
                  >
                    {entry.toppedUpBalance ?? t('balance.unavailable')}{' '}
                    <span className="font-mono text-[9px] font-medium text-faint">
                      {entry.currency}
                    </span>
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-line/80 pt-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] text-muted">
              <Clock3 className="size-3.5 text-faint" aria-hidden="true" />
              <span>
                {t('balance.lastUpdated')}{' '}
                <time className="font-semibold text-ink" dateTime={lastUpdated}>
                  {formatTime(lastUpdated, locale)}
                </time>
              </span>
            </p>
            {autoRefresh && (
              <p className="mt-1.5 pl-5 text-[10px] text-muted">
                {t('balance.autoEvery', { interval: intervalLabel })}
              </p>
            )}
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="btn-secondary min-h-10 w-full px-4 text-xs sm:w-auto"
            >
              <RefreshCw
                className={isRefreshing ? 'size-3.5 animate-spin' : 'size-3.5'}
                aria-hidden="true"
              />
              {isRefreshing ? t('common.refreshing') : t('common.refresh')}
            </button>

            <button
              type="button"
              role="switch"
              aria-checked={autoRefresh}
              aria-label={t('balance.autoRefreshAria', { state: autoState })}
              onClick={onToggleAutoRefresh}
              className={cn(
                'inline-flex min-h-10 w-full items-center justify-between gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 sm:w-auto',
                autoRefresh
                  ? 'border-accent/25 bg-accent-soft/55 text-ink'
                  : 'border-line bg-surface text-ink hover:bg-surface-muted',
              )}
            >
              <span>{t('balance.autoRefresh')}</span>
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    'font-mono text-[9px] font-bold tracking-[0.08em]',
                    autoRefresh ? 'text-accent' : 'text-faint',
                  )}
                >
                  {autoState}
                </span>
                <span
                  className={cn(
                    'relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors',
                    autoRefresh ? 'bg-accent' : 'bg-line',
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={cn(
                      'absolute size-3 rounded-full bg-white shadow-sm transition-transform',
                      autoRefresh ? 'translate-x-3.5' : 'translate-x-0.5',
                    )}
                  />
                </span>
              </span>
            </button>

            <label className="inline-flex min-h-10 w-full items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[11px] font-semibold text-muted sm:w-auto">
              <span>{t('balance.interval')}</span>
              <select
                aria-label={t('balance.intervalAria')}
                value={intervalMs}
                onChange={(event) => {
                  const value = Number(event.target.value)
                  if (isRefreshInterval(value)) onIntervalChange(value)
                }}
                className="min-h-7 cursor-pointer rounded-md bg-transparent text-right text-[11px] font-bold text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
              >
                {REFRESH_INTERVALS.map((value) => (
                  <option key={value} value={value}>
                    {t(INTERVAL_LABELS[value])}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {refreshError && (
          <p role="alert" className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-danger">
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            {t('balance.refreshFailed')}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] text-faint">
        <span className="inline-flex items-center gap-1.5">
          <LockKeyhole className="size-3" aria-hidden="true" />
          {t('balance.source')}
        </span>
        {entries.length > 1 && (
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="size-3" aria-hidden="true" />
            {t('balance.entriesNote')}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <Info className="size-3" aria-hidden="true" />
          {t('balance.noConversion')}
        </span>
      </div>
    </article>
  )
}
