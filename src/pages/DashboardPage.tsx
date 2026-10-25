import { useState } from 'react'
import {
  ChevronDown,
  Clock3,
  Info,
  LockKeyhole,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import type { DashboardData } from '../providers/types'
import type { ProviderError } from '../lib/errors'
import type { ThemePreference } from '../lib/storage'
import {
  AUTO_REFRESH_OPTIONS,
  type AutoRefreshMinutes,
} from '../lib/storage'
import { formatLocalTime, formatRelativeTime } from '../lib/format'
import { useNow } from '../hooks/useNow'
import { AccountCard } from '../components/AccountCard'
import { BalanceCard } from '../components/BalanceCard'
import { ErrorAlert } from '../components/ErrorAlert'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ModelsTable } from '../components/ModelsTable'
import { Settings } from '../components/Settings'
import { UsageCard } from '../components/UsageCard'
import { UsageChart } from '../components/UsageChart'

interface DashboardPageProps {
  data: DashboardData
  theme: ThemePreference
  onCycleTheme: () => void
  onThemeChange: (theme: ThemePreference) => void
  isRefreshing: boolean
  refreshError: ProviderError | null
  onDismissRefreshError: () => void
  onRefresh: () => void
  onClear: () => void
  autoRefresh: AutoRefreshMinutes
  onAutoRefreshChange: (minutes: AutoRefreshMinutes) => void
  remember: boolean
  onRememberChange: (remember: boolean) => void
}

export function DashboardPage({
  data,
  theme,
  onCycleTheme,
  onThemeChange,
  isRefreshing,
  refreshError,
  onDismissRefreshError,
  onRefresh,
  onClear,
  autoRefresh,
  onAutoRefreshChange,
  remember,
  onRememberChange,
}: DashboardPageProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const now = useNow()
  const providerHost = new URL(data.provider.baseUrl).hostname

  const handleAutoRefresh = (value: string) => {
    const minutes = Number(value) as AutoRefreshMinutes
    if (minutes === 0 || minutes === 1 || minutes === 5 || minutes === 15) {
      onAutoRefreshChange(minutes)
    }
  }

  return (
    <div className="relative isolate min-h-screen bg-canvas">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-45" />
        <div className="absolute -right-32 top-0 size-[380px] rounded-full bg-accent/[0.07] blur-[100px]" />
      </div>

      <Header
        theme={theme}
        onCycleTheme={onCycleTheme}
        variant="dashboard"
        docsUrl={data.provider.docsUrl}
        actions={
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="icon-btn"
            aria-label="Open settings"
            title="Settings"
          >
            <Settings2 className="size-[17px]" strokeWidth={1.9} aria-hidden="true" />
          </button>
        }
      />

      <main className="page-wrap pb-16 pt-7 sm:pt-9">
        <div className="flex flex-col gap-6 border-b border-line/80 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                <span className="status-dot" aria-hidden="true" />
                Connected
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                {data.provider.name}
              </span>
            </div>

            <h1 className="mt-4 text-[2rem] font-extrabold tracking-[-0.05em] text-ink sm:text-[2.4rem]">
              Account overview
            </h1>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
              <Clock3 className="size-3.5 text-faint" aria-hidden="true" />
              <span>
                Last updated{' '}
                <span
                  className="font-semibold text-ink"
                  title={formatLocalTime(data.fetchedAt)}
                >
                  {formatRelativeTime(data.fetchedAt, now)}
                </span>
              </span>
              <span className="text-faint/60" aria-hidden="true">
                ·
              </span>
              <span className="inline-flex items-center gap-1">
                <LockKeyhole className="size-3 text-accent" aria-hidden="true" />
                Direct from this browser to{' '}
                <span className="font-mono text-[10px] text-ink">{providerHost}</span>
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="relative flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface pl-3 pr-8 text-muted transition hover:bg-surface-muted">
              <Clock3 className="size-3.5" aria-hidden="true" />
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.08em]">
                Auto
              </span>
              <select
                value={autoRefresh}
                onChange={(event) => handleAutoRefresh(event.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Auto-refresh interval"
              >
                {AUTO_REFRESH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2"
                aria-hidden="true"
              />
            </label>

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
              {isRefreshing ? 'Refreshing' : 'Refresh'}
            </button>

            <button
              type="button"
              onClick={onClear}
              className="btn-secondary h-10 px-4 text-xs text-muted hover:text-danger"
              title="Clear API key and local data"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              Clear key
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {refreshError && (
            <ErrorAlert error={refreshError} onDismiss={onDismissRefreshError} />
          )}

          {data.warnings.map((warning) => (
            <div
              key={warning.title}
              role="status"
              className="flex items-start gap-3 rounded-2xl border border-warning/20 bg-warning/[0.06] px-4 py-3.5"
            >
              <Info className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-ink">{warning.title}</p>
                <p className="mt-1 text-[10px] leading-4 text-muted">{warning.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="order-1 lg:order-none lg:col-span-7">
            <BalanceCard balance={data.balance} />
          </div>

          <div className="order-4 lg:order-none lg:col-span-5">
            <AccountCard data={data} />
          </div>

          <div className="order-3 lg:order-none lg:col-span-8">
            <UsageChart data={data} />
          </div>

          <div className="order-2 lg:order-none lg:col-span-4">
            <UsageCard data={data} />
          </div>

          <div className="order-5 lg:order-none lg:col-span-12">
            <ModelsTable models={data.models} />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-line bg-surface/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-accent">
              <ShieldCheck className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-bold text-ink">Browser-direct, by design.</p>
              <p className="mt-1 text-[10px] leading-4 text-muted">
                Every request to <span className="font-mono text-[9px] text-ink">{providerHost}</span>{' '}
                originated in this tab. This site&apos;s host only delivered the static files.
              </p>
            </div>
          </div>
          <span className="shrink-0 self-start rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-faint sm:self-auto">
            No server received the key
          </span>
        </div>
      </main>

      <Footer docsUrl={data.provider.docsUrl} apiKeysUrl={data.provider.apiKeysUrl} />

      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onThemeChange={onThemeChange}
        autoRefresh={autoRefresh}
        onAutoRefreshChange={onAutoRefreshChange}
        remember={remember}
        onRememberChange={onRememberChange}
        onClearApiKey={onClear}
        provider={data.provider}
      />
    </div>
  )
}
