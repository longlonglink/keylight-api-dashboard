import { LoaderCircle, X } from 'lucide-react'
import { Header } from './Header'
import type { ThemePreference } from '../lib/storage'

interface DashboardSkeletonProps {
  theme: ThemePreference
  onCycleTheme: () => void
  docsUrl: string
  onCancel: () => void
}

function StatSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className={dark ? 'balance-panel relative h-full min-h-[330px] rounded-3xl p-6 sm:p-7' : 'card h-full min-h-[330px] p-6 sm:p-7'}>
      <div className="flex items-center gap-3">
        <div className={dark ? 'size-10 rounded-xl bg-white/10' : 'skeleton size-10'} />
        <div className="space-y-2">
          <div className={dark ? 'h-2.5 w-24 rounded bg-white/10' : 'skeleton h-2.5 w-24 rounded'} />
          <div className={dark ? 'h-2 w-16 rounded bg-white/[0.07]' : 'skeleton h-2 w-16 rounded'} />
        </div>
      </div>
      <div className="mt-12 space-y-3">
        <div className={dark ? 'h-11 w-48 rounded-xl bg-white/10' : 'skeleton h-11 w-48 rounded-xl'} />
        <div className={dark ? 'h-2.5 w-64 rounded bg-white/[0.07]' : 'skeleton h-2.5 w-64 rounded'} />
      </div>
      <div className="mt-12 grid grid-cols-2 gap-2.5">
        <div className={dark ? 'h-[66px] rounded-xl bg-white/[0.06]' : 'skeleton h-[66px] rounded-xl'} />
        <div className={dark ? 'h-[66px] rounded-xl bg-white/[0.06]' : 'skeleton h-[66px] rounded-xl'} />
      </div>
    </div>
  )
}

export function DashboardSkeleton({
  theme,
  onCycleTheme,
  docsUrl,
  onCancel,
}: DashboardSkeletonProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <Header
        theme={theme}
        onCycleTheme={onCycleTheme}
        variant="dashboard"
        docsUrl={docsUrl}
        actions={
          <button
            type="button"
            onClick={onCancel}
            className="icon-btn"
            aria-label="Cancel connection"
            title="Cancel connection"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        }
      />

      <main className="page-wrap pb-20 pt-8 sm:pt-10" aria-busy="true">
        <div role="status" className="sr-only">
          Connecting to the official API. Requests are being sent directly from this browser.
        </div>

        <div className="flex flex-col gap-5 border-b border-line/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-flex size-3.5 items-center justify-center">
                <LoaderCircle className="size-3.5 animate-spin text-accent" aria-hidden="true" />
              </span>
              Direct connection in progress
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-ink sm:text-4xl">
              Reading your account<span className="text-accent">…</span>
            </h1>
            <p className="mt-3 max-w-lg text-xs leading-5 text-muted">
              Your browser is talking straight to the official API. No dashboard server is
              involved.
            </p>
          </div>
          <button type="button" onClick={onCancel} className="btn-secondary self-start text-xs">
            Cancel
          </button>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <StatSkeleton dark />
          </div>
          <div className="lg:col-span-5">
            <StatSkeleton />
          </div>
          <div className="card min-h-[420px] p-6 sm:p-7 lg:col-span-8">
            <div className="flex items-center gap-3">
              <div className="skeleton size-10" />
              <div className="space-y-2">
                <div className="skeleton h-2.5 w-24 rounded" />
                <div className="skeleton h-2 w-36 rounded" />
              </div>
            </div>
            <div className="skeleton mt-10 h-[280px] w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-4">
            <StatSkeleton />
          </div>
          <div className="card p-6 sm:p-7 lg:col-span-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="skeleton size-10" />
                <div className="skeleton h-4 w-32 rounded" />
              </div>
              <div className="skeleton h-8 w-20 rounded-full" />
            </div>
            <div className="mt-7 space-y-3">
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
