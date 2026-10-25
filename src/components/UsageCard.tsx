import { Gauge, Timer, TriangleAlert } from 'lucide-react'
import type { DashboardData, UsageAmount } from '../providers/types'
import { formatCurrency } from '../lib/format'

const metricLabels = ['Today', '7 days', '30 days', 'All time'] as const

function usageValue(
  amount: UsageAmount | null | undefined,
  fallbackCurrency: string | null,
): string {
  if (!amount) return '—'
  return formatCurrency(amount.amount, amount.currency || fallbackCurrency || 'USD')
}

export function UsageCard({ data }: { data: DashboardData }) {
  const usage = data.usage
  const currency = usage?.currency ?? null

  const metrics = [
    usage?.today,
    usage?.last7Days,
    usage?.last30Days,
    usage?.allTime,
  ]

  return (
    <article className="card flex h-full min-h-[330px] flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface-muted text-accent">
            <Gauge className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Usage</p>
            <h2 className="mt-1.5 text-base font-extrabold tracking-[-0.025em] text-ink">
              Spend totals
            </h2>
          </div>
        </div>
        <span className="chip py-1.5">
          <span
            className="inline-block size-1.5 rounded-full bg-faint"
            aria-hidden="true"
          />
          {usage ? 'From API' : 'Not exposed'}
        </span>
      </div>

      {usage ? (
        <div className="mt-6 flex-1">
          <p className="numeric text-4xl font-extrabold tracking-[-0.055em] text-ink">
            {usage.today
              ? formatCurrency(usage.today.amount, usage.today.currency || currency || 'USD')
              : '—'}
          </p>
          <p className="mt-2 text-[11px] text-muted">Today&apos;s spend</p>

          <dl className="mt-5 grid grid-cols-2 gap-2.5">
            {metricLabels.slice(1).map((label, index) => (
              <div key={label} className="rounded-xl border border-line bg-surface-muted/55 px-3 py-2.5">
                <dt className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
                  {label}
                </dt>
                <dd className="numeric mt-1 text-[12px] font-bold text-ink">
                  {usageValue(metrics[index + 1], currency)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="mt-6 flex flex-1 flex-col">
          <div className="flex items-start gap-3 rounded-2xl bg-surface-muted/70 px-4 py-4">
            <Timer className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-ink">Usage unavailable</p>
              <p className="mt-1 text-[10px] leading-[1.65] text-muted">
                DeepSeek&apos;s documented API does not expose token spend, daily totals, or usage
                history. Nothing is estimated here.
              </p>
            </div>
          </div>

          <dl className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
            {metricLabels.map((label) => (
              <div
                key={label}
                className="rounded-xl border border-dashed border-line bg-surface-muted/35 px-3 py-2.5"
              >
                <dt className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
                  {label}
                </dt>
                <dd className="mt-1 text-[12px] font-bold text-faint">—</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="mt-4 flex items-center gap-1.5 border-t border-line/80 pt-3 text-[9px] text-faint">
        <TriangleAlert className="size-3 shrink-0" aria-hidden="true" />
        Only provider-reported values are displayed.
      </div>
    </article>
  )
}
