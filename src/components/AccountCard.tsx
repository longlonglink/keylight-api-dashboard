import { CircleUserRound, Info, LockKeyhole } from 'lucide-react'
import type { DashboardData } from '../providers/types'

export function AccountCard({ data }: { data: DashboardData }) {
  const currency =
    data.account?.currency ??
    data.balance?.entries[0]?.currency ??
    null

  const rows = [
    { label: 'Connection', value: data.account?.status ?? 'Connected', accent: true },
    { label: 'Plan', value: data.account?.plan ?? 'N/A' },
    { label: 'Account ID', value: data.account?.accountId ?? 'N/A', mono: true },
    { label: 'Currency', value: currency ?? 'N/A', mono: Boolean(currency) },
    { label: 'Created at', value: data.account?.createdAt ?? 'N/A' },
  ]

  return (
    <article className="card flex h-full min-h-[330px] flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface-muted text-accent">
            <CircleUserRound className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Account</p>
            <h2 className="mt-1.5 text-base font-extrabold tracking-[-0.025em] text-ink">
              Session details
            </h2>
          </div>
        </div>
        <span className="chip py-1.5">
          <span className="status-dot" aria-hidden="true" />
          Connected
        </span>
      </div>

      <dl className="mt-6 flex-1 divide-y divide-line/80 border-y border-line/80">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-[11px] text-muted">{row.label}</dt>
            <dd
              className={
                row.accent
                  ? 'inline-flex items-center gap-1.5 text-[11px] font-bold text-accent'
                  : row.mono
                    ? 'max-w-[56%] truncate font-mono text-[10px] font-medium text-ink'
                    : 'text-[11px] font-semibold text-ink'
              }
              title={row.value}
            >
              {row.accent && <span className="status-dot size-1.5" aria-hidden="true" />}
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {!data.capabilities.account && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-surface-muted/75 px-3.5 py-3">
          <Info className="mt-0.5 size-3.5 shrink-0 text-muted" aria-hidden="true" />
          <p className="text-[10px] leading-[1.6] text-muted">
            DeepSeek&apos;s official API does not expose plan, account ID, or creation date. Those
            fields stay N/A rather than being invented.
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-1.5 text-[9px] text-faint">
        <LockKeyhole className="size-3" aria-hidden="true" />
        Status reflects a successful authenticated request.
      </div>
    </article>
  )
}
