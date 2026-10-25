import { ChevronDown } from 'lucide-react'
import type { ApiProvider } from '../providers'
import { useI18n } from '../i18n/I18nProvider'
import { ProviderGlyph } from './ProviderGlyph'

interface ProviderSelectorProps {
  providers: ReadonlyArray<ApiProvider>
  value: string
  onChange: (providerId: string) => void
  disabled?: boolean
}

export function ProviderSelector({
  providers,
  value,
  onChange,
  disabled = false,
}: ProviderSelectorProps) {
  const { t } = useI18n()
  const selectedProvider = providers.find((provider) => provider.meta.id === value) ?? providers[0]

  if (!selectedProvider) return null

  const hostname = new URL(selectedProvider.meta.baseUrl).hostname

  return (
    <div>
      <div className="field-label">
        <label htmlFor="provider-select">{t('provider.label')}</label>
        <span>{t('provider.integrationCount')}</span>
      </div>

      <div className="relative">
        <ProviderGlyph className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-9 -translate-y-1/2 sm:size-10" />
        <select
          id="provider-select"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className="h-[64px] w-full appearance-none rounded-2xl border border-line bg-surface-muted/70 pl-[3.65rem] pr-10 text-sm font-bold text-ink outline-none transition hover:border-faint/45 focus:border-accent/65 focus:bg-surface focus:ring-4 focus:ring-accent/10 disabled:opacity-60"
        >
          {providers.map((provider) => (
            <option key={provider.meta.id} value={provider.meta.id}>
              {provider.meta.name}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>

      <p className="mt-2.5 text-[11px] leading-4 text-muted">
        {t('provider.requestsTo', { host: hostname })}
      </p>
    </div>
  )
}
