import { Clock3, LockKeyhole, RefreshCw, Trash2 } from 'lucide-react'
import type { DashboardData } from '../providers/types'
import type { ProviderError } from '../lib/errors'
import type { ThemePreference } from '../lib/storage'
import { formatDateTime } from '../lib/format'
import { useI18n } from '../i18n/I18nProvider'
import { BalanceCard } from '../components/BalanceCard'
import { ErrorAlert } from '../components/ErrorAlert'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ModelsTable } from '../components/ModelsTable'

interface DashboardPageProps {
  data: DashboardData
  theme: ThemePreference
  onCycleTheme: () => void
  isRefreshing: boolean
  refreshError: ProviderError | null
  onDismissRefreshError: () => void
  onRefresh: () => void
  onClear: () => void
}

export function DashboardPage({
  data,
  theme,
  onCycleTheme,
  isRefreshing,
  refreshError,
  onDismissRefreshError,
  onRefresh,
  onClear,
}: DashboardPageProps) {
  const { t, locale } = useI18n()
  const providerHost = new URL(data.provider.baseUrl).hostname

  return (
    <div className="relative isolate min-h-screen bg-canvas">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-grid absolute inset-0 opacity-45" />
        <div className="absolute -right-32 top-0 size-[380px] rounded-full bg-accent/[0.07] blur-[100px]" />
      </div>

      <Header
        theme={theme}
        onCycleTheme={onCycleTheme}
        variant="dashboard"
        docsUrl={data.provider.docsUrl}
      />

      <main className="page-wrap pb-16 pt-7 sm:pt-9">
        <div className="flex flex-col gap-6 border-b border-line/80 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                <span className="status-dot" aria-hidden="true" />
                {t('dashboard.connected')}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                {data.provider.name}
              </span>
            </div>

            <h1 className="mt-4 text-[2rem] font-extrabold tracking-[-0.05em] text-ink sm:text-[2.4rem]">
              {t('dashboard.title')}
            </h1>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
              <Clock3 className="size-3.5 text-faint" aria-hidden="true" />
              <span>
                {t('dashboard.lastSuccessful')}{' '}
                <span className="font-semibold text-ink">
                  {formatDateTime(data.fetchedAt, locale)}
                </span>
              </span>
              <span className="text-faint/60" aria-hidden="true">
                ·
              </span>
              <span className="inline-flex items-center gap-1">
                <LockKeyhole className="size-3 text-accent" aria-hidden="true" />
                {t('dashboard.directFrom', { host: providerHost })}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="btn-secondary h-10 px-4 text-xs"
            >
              <RefreshCw
                className={isRefreshing ? 'size-3.5 animate-spin' : 'size-3.5'}
                aria-hidden="true"
              />
              {isRefreshing ? t('common.refreshing') : t('common.refresh')}
            </button>

            <button
              type="button"
              onClick={onClear}
              className="btn-secondary h-10 px-4 text-xs text-muted hover:text-danger"
              title={t('dashboard.clearKey')}
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              {t('dashboard.clearKey')}
            </button>
          </div>
        </div>

        {refreshError && (
          <div className="mt-5">
            <ErrorAlert
              error={refreshError}
              providerName={data.provider.name}
              onDismiss={onDismissRefreshError}
            />
          </div>
        )}

        <div className="mt-6 space-y-4 lg:space-y-5">
          <BalanceCard balance={data.balance} />
          <ModelsTable models={data.models} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
