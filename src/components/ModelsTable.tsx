import { useMemo, useState } from 'react'
import { Boxes, CheckCircle2, Search } from 'lucide-react'
import type { ModelInfo } from '../providers/types'
import { formatFullNumber, formatList, formatTokenCount } from '../lib/format'

function modelMatches(model: ModelInfo, query: string): boolean {
  if (!query) return true
  const haystack = `${model.name} ${model.id} ${model.ownedBy ?? ''}`.toLowerCase()
  return haystack.includes(query)
}

function ModelMeta({ model }: { model: ModelInfo }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Context</p>
        <p
          className="mt-1 text-[11px] font-semibold text-ink"
          title={model.contextWindow === null ? undefined : formatFullNumber(model.contextWindow)}
        >
          {model.contextWindow === null ? 'N/A' : `${formatTokenCount(model.contextWindow)} tokens`}
        </p>
      </div>
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Max output</p>
        <p
          className="mt-1 text-[11px] font-semibold text-ink"
          title={model.maxOutputTokens === null ? undefined : formatFullNumber(model.maxOutputTokens)}
        >
          {model.maxOutputTokens === null
            ? 'N/A'
            : `${formatTokenCount(model.maxOutputTokens)} tokens`}
        </p>
      </div>
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Input</p>
        <p className="mt-1 text-[10px] font-medium capitalize text-muted">
          {formatList(model.inputModalities)}
        </p>
      </div>
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Output</p>
        <p className="mt-1 text-[10px] font-medium capitalize text-muted">
          {formatList(model.outputModalities)}
        </p>
      </div>
    </div>
  )
}

export function ModelsTable({ models }: { models: ModelInfo[] }) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredModels = useMemo(
    () => models.filter((model) => modelMatches(model, normalizedQuery)),
    [models, normalizedQuery],
  )

  return (
    <article className="card overflow-hidden">
      <div className="flex flex-col gap-5 border-b border-line/80 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface-muted text-accent">
            <Boxes className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Model catalogue</p>
            <div className="mt-1.5 flex items-center gap-2.5">
              <h2 className="text-base font-extrabold tracking-[-0.025em] text-ink">
                Available models
              </h2>
              <span className="rounded-full bg-surface-muted px-2 py-0.5 font-mono text-[9px] text-muted">
                {models.length}
              </span>
            </div>
          </div>
        </div>

        {models.length > 0 && (
          <div className="relative w-full sm:w-60">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter models…"
              aria-label="Filter models"
              className="h-10 w-full rounded-full border border-line bg-surface-muted/65 pl-9 pr-4 text-[11px] text-ink outline-none transition placeholder:text-faint focus:border-accent/50 focus:bg-surface focus:ring-4 focus:ring-accent/10"
            />
          </div>
        )}
      </div>

      {models.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Boxes className="size-7 text-faint" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-3 text-xs font-bold text-ink">No model data available</p>
          <p className="mt-1 max-w-sm text-[10px] leading-5 text-muted">
            The provider returned no models. This dashboard does not fall back to a hardcoded list.
          </p>
        </div>
      ) : filteredModels.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Search className="size-6 text-faint" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-3 text-xs font-bold text-ink">No models match “{query.trim()}”</p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-2 text-[10px] font-semibold text-accent transition hover:text-accent-strong"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line/80 bg-surface-muted/35">
                  <th className="px-6 py-3.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint sm:px-7">
                    Model
                  </th>
                  <th className="px-4 py-3.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint">
                    Context
                  </th>
                  <th className="px-4 py-3.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint">
                    Max output
                  </th>
                  <th className="px-4 py-3.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint">
                    Modalities
                  </th>
                  <th className="px-6 py-3.5 text-right font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-faint sm:px-7">
                    Status
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
                      title={model.contextWindow === null ? undefined : formatFullNumber(model.contextWindow)}
                    >
                      {model.contextWindow === null
                        ? 'N/A'
                        : formatTokenCount(model.contextWindow)}
                    </td>
                    <td
                      className="whitespace-nowrap px-4 py-4 text-[11px] font-semibold text-ink"
                      title={model.maxOutputTokens === null ? undefined : formatFullNumber(model.maxOutputTokens)}
                    >
                      {model.maxOutputTokens === null
                        ? 'N/A'
                        : formatTokenCount(model.maxOutputTokens)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {[...model.inputModalities, ...model.outputModalities].length > 0 ? (
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
                          <span className="text-[10px] text-faint">N/A</span>
                        )}
                        {model.effortLevels.length > 0 && (
                          <span
                            className="rounded-md border border-line bg-surface-muted px-1.5 py-0.5 font-mono text-[8px] text-muted"
                            title={`Reasoning effort: ${model.effortLevels.join(', ')}`}
                          >
                            reasoning
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right sm:px-7">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-accent-soft px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-accent">
                        <CheckCircle2 className="size-3" aria-hidden="true" />
                        Available
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
                    Available
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
        <p className="text-[9px] leading-4 text-faint">
          Fetched live from <span className="font-mono">/models</span>. No model list is hardcoded.
        </p>
        <p className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-faint">
          <span className="status-dot size-1.5" aria-hidden="true" />
          Provider response
        </p>
      </div>
    </article>
  )
}
