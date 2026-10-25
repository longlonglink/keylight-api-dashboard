import { lazy, Suspense } from 'react'
import { ChartNoAxesColumnIncreasing, LineChart as LineChartIcon } from 'lucide-react'
import type { DashboardData } from '../providers/types'

const UsageHistoryChart = lazy(() => import('./UsageHistoryChart'))

export function UsageChart({ data }: { data: DashboardData }) {
  const history = data.usage?.history ?? []
  const currency =
    data.usage?.currency ?? history.find((point) => point.currency)?.currency ?? 'USD'

  return (
    <article className="card flex h-full min-h-[420px] flex-col overflow-hidden p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface-muted text-accent">
            <LineChartIcon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Usage overview</p>
            <h2 className="mt-1.5 text-base font-extrabold tracking-[-0.025em] text-ink">
              Spend over time
            </h2>
          </div>
        </div>

        {history.length === 0 && <span className="chip py-1.5">No history</span>}
      </div>

      {history.length > 0 ? (
        <Suspense
          fallback={
            <div className="mt-6 flex flex-1 items-center justify-center">
              <div className="h-[320px] w-full animate-pulse rounded-2xl bg-surface-muted" />
            </div>
          }
        >
          <UsageHistoryChart history={history} currency={currency} />
        </Suspense>
      ) : (
        <div className="mt-7 flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface-muted/35 px-6 py-12 text-center">
            <span className="relative flex size-14 items-center justify-center rounded-2xl border border-line bg-surface text-muted shadow-sm">
              <ChartNoAxesColumnIncreasing
                className="size-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-surface bg-faint" />
            </span>
            <p className="mt-5 max-w-xs text-balance text-sm font-bold text-ink">
              Historical usage is not available from the provider API.
            </p>
            <p className="mt-2 max-w-sm text-[11px] leading-5 text-muted">
              This chart only draws provider-reported data. DeepSeek does not expose spend history,
              so no synthetic line is shown.
            </p>
          </div>
          <p className="mt-3 text-[9px] leading-4 text-faint">
            Charting stays dormant until a provider returns real time-series usage.
          </p>
        </div>
      )}
    </article>
  )
}
