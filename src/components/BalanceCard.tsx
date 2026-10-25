import { CircleDollarSign, Info, LockKeyhole, Wallet } from 'lucide-react'
import type { BalanceSnapshot } from '../providers/types'
import { formatCurrency } from '../lib/format'

interface BalanceCardProps {
  balance: BalanceSnapshot | null
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const primary = balance?.entries[0] ?? null
  const otherEntries = balance?.entries.slice(1) ?? []

  return (
    <article className="balance-panel relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-3xl p-6 text-white shadow-[0_24px_80px_-44px_rgb(6_42_30_/_0.7)] sm:p-7">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-[#a9f4d6]">
            <Wallet className="size-[18px]" strokeWidth={1.9} aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
              Available balance
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="status-dot bg-[#8ff0ca]" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">
                Live from API
              </span>
            </div>
          </div>
        </div>

        {balance && (
          <span
            className={
              balance.isAvailable
                ? 'rounded-full border border-[#a8f1d5]/25 bg-[#8ef0c8]/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#b8f7dd]'
                : 'rounded-full border border-[#ffd7a8]/25 bg-[#ffd7a8]/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#ffe0b9]'
            }
          >
            {balance.isAvailable ? 'Ready for calls' : 'Insufficient balance'}
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center py-7">
        {balance === null ? (
          <div>
            <div className="flex items-center gap-3">
              <p className="text-4xl font-extrabold tracking-[-0.05em] text-white/55 sm:text-5xl">
                Unavailable
              </p>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-5 text-white/60">
              The balance request did not complete. No estimate has been substituted.
            </p>
          </div>
        ) : primary ? (
          <div>
            <div className="flex flex-wrap items-end gap-3">
              <p className="numeric text-[2.7rem] font-extrabold leading-none tracking-[-0.06em] text-white sm:text-[3.35rem]">
                {formatCurrency(primary.totalBalance, primary.currency)}
              </p>
              <span className="mb-1 rounded-md border border-white/15 bg-white/[0.07] px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/65">
                {primary.currency}
              </span>
            </div>
            <p className="mt-3 text-[11px] text-white/50">
              Total available balance, including granted and topped-up credit.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-4xl font-extrabold tracking-[-0.05em] text-white/55">No entries</p>
            <p className="mt-3 max-w-sm text-xs leading-5 text-white/60">
              The provider returned a successful response without balance entries.
            </p>
          </div>
        )}
      </div>

      {balance && primary && (
        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">
                Granted
              </p>
              <p className="numeric mt-1.5 text-sm font-bold text-white/90">
                {formatCurrency(primary.grantedBalance, primary.currency)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">
                Topped up
              </p>
              <p className="numeric mt-1.5 text-sm font-bold text-white/90">
                {formatCurrency(primary.toppedUpBalance, primary.currency)}
              </p>
            </div>
          </div>

          {otherEntries.length > 0 && (
            <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
              {otherEntries.map((entry) => (
                <div
                  key={entry.currency}
                  className="flex items-center justify-between gap-3 text-[11px]"
                >
                  <span className="flex items-center gap-1.5 text-white/50">
                    <CircleDollarSign className="size-3" aria-hidden="true" />
                    {entry.currency} balance
                  </span>
                  <span className="numeric font-semibold text-white/85">
                    {formatCurrency(entry.totalBalance, entry.currency)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
            <span className="inline-flex items-center gap-1.5 text-[9px] text-white/40">
              <LockKeyhole className="size-3" aria-hidden="true" />
              Read directly from /user/balance
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] text-white/40">
              <Info className="size-3" aria-hidden="true" />
              No conversion
            </span>
          </div>
        </div>
      )}

      {balance === null && (
        <div className="relative z-10 border-t border-white/10 pt-3">
          <span className="inline-flex items-center gap-1.5 text-[9px] text-white/40">
            <LockKeyhole className="size-3" aria-hidden="true" />
            Balance data is not cached on a server
          </span>
        </div>
      )}
    </article>
  )
}
