import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { UsagePoint } from '../providers/types'
import { formatCurrency } from '../lib/format'

type RangeDays = 7 | 30 | 90

const ranges: ReadonlyArray<{ value: RangeDays; label: string }> = [
  { value: 7, label: '7D' },
  { value: 30, label: '30D' },
  { value: 90, label: '90D' },
]

function chartDateLabel(value: string): string {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)
}

interface UsageHistoryChartProps {
  history: UsagePoint[]
  currency: string
}

export default function UsageHistoryChart({ history, currency }: UsageHistoryChartProps) {
  const [range, setRange] = useState<RangeDays>(30)

  const chartData = useMemo(() => {
    const sorted = [...history].sort(
      (first, second) => new Date(first.date).getTime() - new Date(second.date).getTime(),
    )
    const cutoff = Date.now() - range * 24 * 60 * 60 * 1000

    return sorted.filter((point) => {
      const timestamp = new Date(point.date).getTime()
      return Number.isFinite(timestamp) && timestamp >= cutoff
    })
  }, [history, range])

  const axisCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(value)
    } catch {
      return String(value)
    }
  }

  return (
    <div className="mt-5 min-h-[320px] flex-1">
      <div className="flex justify-end">
        <div
          className="flex items-center gap-1 rounded-full border border-line bg-surface-muted p-1"
          aria-label="Chart range"
        >
          {ranges.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRange(option.value)}
              aria-pressed={range === option.value}
              className={
                range === option.value
                  ? 'rounded-full bg-surface px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-ink shadow-sm'
                  : 'rounded-full px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-muted transition hover:text-ink'
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 8, right: 4, left: -6, bottom: 0 }}>
              <defs>
                <linearGradient id="usage-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b9b77" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="#1b9b77" stopOpacity={0.015} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 5"
                vertical={false}
                stroke="rgb(var(--color-line))"
              />
              <XAxis
                dataKey="date"
                tickFormatter={chartDateLabel}
                tick={{ fontSize: 10, fill: 'rgb(var(--color-muted))' }}
                axisLine={false}
                tickLine={false}
                minTickGap={24}
                dy={8}
              />
              <YAxis
                tickFormatter={axisCurrency}
                tick={{ fontSize: 10, fill: 'rgb(var(--color-muted))' }}
                axisLine={false}
                tickLine={false}
                width={58}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value), currency), 'Spend']}
                labelFormatter={(label) => chartDateLabel(String(label))}
                contentStyle={{
                  backgroundColor: 'rgb(var(--color-surface-raised))',
                  border: '1px solid rgb(var(--color-line))',
                  borderRadius: '12px',
                  color: 'rgb(var(--color-ink))',
                  fontSize: '12px',
                  boxShadow: '0 12px 30px -18px rgb(8 30 22 / 0.3)',
                }}
                labelStyle={{ color: 'rgb(var(--color-muted))', fontSize: '10px' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#1b9b77"
                strokeWidth={2.25}
                fill="url(#usage-area)"
                isAnimationActive={false}
                activeDot={{ r: 4, fill: '#1b9b77', strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface-muted/35 px-6 text-center">
            <p className="text-xs font-bold text-ink">No data in this range</p>
            <p className="mt-1 max-w-sm text-[10px] leading-5 text-muted">
              The provider returned history, but none of it falls inside this time range.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
