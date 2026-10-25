import { useMemo, useState } from 'react'
import { Boxes, CheckCircle2, Search } from 'lucide-react'
import type { ModelInfo } from '../providers/types'
import { formatFullNumber, formatTokenCount } from '../lib/format'
import { useI18n } from '../i18n/I18nProvider'

function modelMatches(model: ModelInfo, query: string): boolean {
  if (!query) return true
  const haystack = `${model.name} ${model.id} ${model.ownedBy ?? ''}`.toLowerCase()
  return haystack.includes(query)
}

function ModelMeta({ model }: { model: ModelInfo }) {
  const { t, locale } = useI18n()

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
          {t('models.contextWindow')}
        </p>
        <p
          className="mt-1 text-[11px] font-semibold text-ink"
          title={
            model.contextWindow === null
              ? undefined
              : formatFullNumber(model.contextWindow, locale)
          }
        >
          {model.contextWindow === null
            ? '—'
            : `${formatTokenCount(model.contextWindow, locale)} ${t('common.tokens')}`}
        </p>
      </div>
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
          {t('models.maxOutput')}
        </p>
        <p
          className="mt-1 text-[11px] font-semibold text-ink"
          title={
            model.maxOutputTokens === null
              ? undefined
              : formatFullNumber(model.maxOutputTokens, locale)
          }
        >
          {model.maxOutputTokens === null
            ? '—'
            : `${formatTokenCount(model.maxOutputTokens, locale)} ${t('common.tokens')}`}
        </p>
      </div>
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
          {t('models.inputModalities')}
        </p>
        <p className="mt-1 text-[10px] font-medium capitalize text-muted">
          {model.inputModalities.length > 0 ? model.inputModalities.join(' · ') : '—'}
        </p>
      </div>
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
          {t('models.outputModalities')}
        </p>
        <p className="mt-1 text-[10px] font-medium capitalize text-muted">
          {model.outputModalities.length > 0 ? model.outputModalities.join(' · ') : '—'}
        </p>
      </div>
    </div>
  )
}

export function ModelsTable({ models }: { models: ModelInfo[] }) {
  const { t, locale } = useI18n()
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredModels = useMemo(
    () => models.filter((model) => modelMatches(model, normalizedQuery)),
    [models, normalizedQuery],
  )

  return (
    <article className="card h-full overflow-hidden">
      <div className="flex flex-col gap-5 border-b border-line/80 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface-muted text-accent">
            <Boxes className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">{t('models.eyebrow')}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
              <h2 className="text-base font-extrabold tracking-[-0.025em] text-ink">
                {t('models.title')}
              </h2>
              <span className="rounded-full bg-surface-muted px-2 py-0.5 font-mono text-[9px] text-muted">
                {t('models.count', { count: models.length })}
              </span>
            </div>
          </div>
        </div>

        {models.length > 0 && (
          <div className="relative w-full sm:w-56">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('models.filterPlaceholder')}
              aria-label={t('models.filterAria')}
              className="h-10 w-full rounded-full border border-line bg-surface-muted/65 pl-9 pr-4 text-[11px] text-ink outline-none transition placeholder:text-faint focus:border-accent/50 focus:bg-surface focus:ring-4 focus:ring-accent/10"
            />
          </div>
        )}
      </div>

      {models.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Boxes className="size-7 text-faint" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-3 text-xs font-bold text-ink">{t('models.noModelsTitle')}</p>
          <p className="mt-1 max-w-sm text-[10px] leading-5 text-muted">
            {t('models.noModelsBody')}
          </p>
        </div>
      ) : filteredModels.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Search className="size-6 text-faint" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-3 text-xs font-bold text-ink">
            {t('models.noResultsTitle', { query: query.trim() })}
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-2 text-[10px] font-semibold text-accent transition hover:text-accent-strong"
          >
            {t('models.clearFilter')}
          </button>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line/80 bg-surface-muted/35">
                  <th className="px-6 py-3.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint sm:px-7">
                    {t('models.columnModel')}
                  </th>
                  <th className="px-4 py-3.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint">
                    {t('models.columnContext')}
                  </th>
                  <th className="px-4 py-3.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint">
                    {t('models.columnMaxOutput')}
                  </th>
                  <th className="px-4 py-3.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint">
                    {t('models.columnModalities')}
                  </th>
                  <th className="px-6 py-3.5 text-right font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint sm:px-7">
                    {t('models.columnStatus')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {filteredModels.map((model) => (
                  <tr key={model.id} className="transition hover:bg-surface-muted/35">
                    <td className="px-6 py-4 sm:px-7">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-muted text-[11px] font-extrabold text-accent">
                          {model.name.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-bold text-ink">{model.name}</p>
                          <p className="mt-0.5 truncate font-mono text-[9px] text-faint">
                            {model.id}
                            {model.ownedBy ? ` · ${model.ownedBy}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="whitespace-nowrap px-4 py-4 text-[11px] font-semibold text-ink"
                      title={
                        model.contextWindow === null
                          ? undefined
                          : formatFullNumber(model.contextWindow, locale)
                      }
                    >
                      {model.contextWindow === null
                        ? '—'
                        : formatTokenCount(model.contextWindow, locale)}
                    </td>
                    <td
                      className="whitespace-nowrap px-4 py-4 text-[11px] font-semibold text-ink"
                      title={
                        model.maxOutputTokens === null
                          ? undefined
                          : formatFullNumber(model.maxOutputTokens, locale)
                      }
                    >
                      {model.maxOutputTokens === null
                        ? '—'
                        : formatTokenCount(model.maxOutputTokens, locale)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {[...new Set([...model.inputModalities, ...model.outputModalities])]
                          .length > 0 ? (
                          [...new Set([...model.inputModalities, ...model.outputModalities])].map(
                            (modality) => (
                              <span
                                key={modality}
                                className="rounded-md border border-line bg-surface-muted px-1.5 py-0.5 font-mono text-[8px] capitalize text-muted"
                              >
                                {modality}
                              </span>
                            ),
                          )
                        ) : (
                          <span className="text-[10px] text-faint">—</span>
                        )}
                        {model.effortLevels.length > 0 && (
                          <span
                            className="rounded-md border border-line bg-surface-muted px-1.5 py-0.5 font-mono text-[8px] text-muted"
                            title={t('models.reasoningTitle', {
                              levels: model.effortLevels.join(', '),
                            })}
                          >
                            {t('models.reasoning')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right sm:px-7">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-accent-soft px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-accent">
                        <CheckCircle2 className="size-3" aria-hidden="true" />
                        {t('models.available')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-line/70 md:hidden">
            {filteredModels.map((model) => (
              <li key={model.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-muted text-[11px] font-extrabold text-accent">
                      {model.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-ink">{model.name}</p>
                      <p className="mt-0.5 truncate font-mono text-[9px] text-faint">{model.id}</p>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.06em] text-accent">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {t('models.available')}
                  </span>
                </div>
                <div className="mt-4">
                  <ModelMeta model={model} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="flex flex-col gap-2 border-t border-line/80 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-[9px] leading-4 text-faint">{t('models.footer')}</p>
        <p className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-faint">
          <span className="status-dot size-1.5" aria-hidden="true" />
          {t('models.providerResponse')}
        </p>
      </div>
    </article>
  )
}
