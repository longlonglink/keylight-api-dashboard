import { LoaderCircle, X } from 'lucide-react'
import type { ThemePreference } from '../lib/storage'
import { useI18n } from '../i18n/I18nProvider'
import { Header } from './Header'

interface DashboardSkeletonProps {
  theme: ThemePreference
  onCycleTheme: () => void
  docsUrl: string
  onCancel: () => void
}

export function DashboardSkeleton({
  theme,
  onCycleTheme,
  docsUrl,
  onCancel,
}: DashboardSkeletonProps) {
  const { t } = useI18n()

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
            aria-label={t('loading.cancel')}
            title={t('loading.cancel')}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        }
      />

      <main className="page-wrap pb-20 pt-8 sm:pt-10" aria-busy="true">
        <div role="status" className="sr-only">
          {t('loading.status')}
        </div>

        <div className="flex flex-col gap-5 border-b border-line/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-flex size-3.5 items-center justify-center">
                <LoaderCircle className="size-3.5 animate-spin text-accent" aria-hidden="true" />
              </span>
              {t('loading.eyebrow')}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-ink sm:text-4xl">
              {t('loading.title')}
            </h1>
            <p className="mt-3 max-w-lg text-xs leading-5 text-muted">{t('loading.body')}</p>
          </div>
          <button type="button" onClick={onCancel} className="btn-secondary self-start text-xs">
            {t('loading.cancel')}
          </button>
        </div>

        <div className="mt-7 space-y-4 lg:space-y-5">
          <div className="card p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="skeleton size-10 rounded-xl" />
                <div className="space-y-2">
                  <div className="skeleton h-2.5 w-24 rounded" />
                  <div className="skeleton h-2 w-16 rounded" />
                </div>
              </div>
              <div className="skeleton h-7 w-32 rounded-full" />
            </div>
            <div className="mt-6">
              <div className="skeleton h-2.5 w-24 rounded" />
              <div className="skeleton mt-3 h-12 w-44 rounded-xl" />
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                <div className="skeleton h-[82px] rounded-2xl" />
                <div className="skeleton h-[82px] rounded-2xl" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line/80 pt-4">
                <div className="skeleton h-10 w-28 rounded-xl" />
                <div className="skeleton h-10 w-44 rounded-xl" />
                <div className="skeleton h-10 w-36 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="card p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="skeleton size-10" />
                <div className="space-y-2">
                  <div className="skeleton h-2.5 w-24 rounded" />
                  <div className="skeleton h-4 w-32 rounded" />
                </div>
              </div>
              <div className="skeleton h-10 w-40 rounded-full" />
            </div>
            <div className="mt-8 space-y-3">
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
