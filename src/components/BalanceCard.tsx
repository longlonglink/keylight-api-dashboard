import { CircleDollarSign, Info, LockKeyhole, Wallet } from 'lucide-react'
import type { BalanceSnapshot } from '../providers/types'
import { useI18n } from '../i18n/I18nProvider'
import { cn } from '../lib/cn'

export function BalanceCard({ balance }: { balance: BalanceSnapshot }) {
  const { t } = useI18n()
  const entries = balance.entries

  return (
    <article className="balance-panel relative overflow-hidden rounded-3xl p-6 text-white shadow-[0_24px_80px_-44px_rgb(6_42_30_/_0.7)] sm:p-7">
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-[#a9f4d6]">
            <Wallet className="size-[18px]" strokeWidth={1.9} aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
              {t('balance.title')}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="status-dot bg-[#8ff0ca]" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">
                {t('balance.live')}
              </span>
            </div>
          </div>
        </div>

        <span
          className={
            balance.isAvailable
              ? 'rounded-full border border-[#a8f1d5]/25 bg-[#8ef0c8]/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#b8f7dd]'
              : 'rounded-full border border-[#ffd7a8]/25 bg-[#ffd7a8]/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#ffe0b9]'
          }
        >
          {balance.isAvailable ? t('balance.ready') : t('balance.insufficient')}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="relative z-10 py-8">
          <p className="text-2xl font-extrabold tracking-[-0.04em] text-white/75">
            {t('balance.emptyTitle')}
          </p>
          <p className="mt-3 max-w-lg text-xs leading-5 text-white/60">{t('balance.emptyBody')}</p>
        </div>
      ) : (
        <div
          className={cn(
            'relative z-10 mt-6 grid gap-3',
            entries.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1',
          )}
        >
          {entries.map((entry) => (
            <section
              key={entry.currency}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">
                    {t('balance.total')}
                  </p>
                  <p className="numeric mt-1.5 text-[2.5rem] font-extrabold leading-none tracking-[-0.06em] text-white sm:text-[2.8rem]">
                    {entry.totalBalance}
                  </p>
                </div>
                <span className="mb-1 rounded-md border border-white/15 bg-white/[0.07] px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/75">
                  {entry.currency}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3">
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/45">
                    {t('balance.granted')}
                  </p>
                  <p className="numeric mt-1.5 text-sm font-bold text-white/90">
                    {entry.grantedBalance}{' '}
                    <span className="font-mono text-[9px] font-medium text-white/45">
                      {entry.currency}
                    </span>
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3">
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/45">
                    {t('balance.toppedUp')}
                  </p>
                  <p className="numeric mt-1.5 text-sm font-bold text-white/90">
                    {entry.toppedUpBalance}{' '}
                    <span className="font-mono text-[9px] font-medium text-white/45">
                      {entry.currency}
                    </span>
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[9px] text-white/40">
          <LockKeyhole className="size-3" aria-hidden="true" />
          {t('balance.source')}
        </span>
        <div className="flex items-center gap-3">
          {entries.length > 1 && (
            <span className="inline-flex items-center gap-1.5 text-[9px] text-white/40">
              <CircleDollarSign className="size-3" aria-hidden="true" />
              {t('balance.entriesNote')}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[9px] text-white/40">
            <Info className="size-3" aria-hidden="true" />
            {t('balance.noConversion')}
          </span>
        </div>
      </div>
    </article>
  )
}
