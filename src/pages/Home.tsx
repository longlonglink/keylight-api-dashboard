import type { FormEvent } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Info,
  KeyRound,
  LockKeyhole,
  Route,
  ServerOff,
  ShieldCheck,
} from 'lucide-react'
import type { ApiProvider } from '../providers'
import type { ProviderError } from '../lib/errors'
import type { ThemePreference } from '../lib/storage'
import { useI18n } from '../i18n/I18nProvider'
import { ApiKeyInput } from '../components/ApiKeyInput'
import { ErrorAlert } from '../components/ErrorAlert'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProviderGlyph } from '../components/ProviderGlyph'
import { ProviderSelector } from '../components/ProviderSelector'
import { PurchaseSection } from '../components/PurchaseSection'

interface HomeProps {
  theme: ThemePreference
  onCycleTheme: () => void
  providers: ReadonlyArray<ApiProvider>
  providerId: string
  onProviderChange: (providerId: string) => void
  apiKey: string
  onApiKeyChange: (value: string) => void
  onConnect: () => void
  formError: ProviderError | null
}

export function Home({
  theme,
  onCycleTheme,
  providers,
  providerId,
  onProviderChange,
  apiKey,
  onApiKeyChange,
  onConnect,
  formError,
}: HomeProps) {
  const { t } = useI18n()
  const selectedProvider = providers.find((provider) => provider.meta.id === providerId) ?? providers[0]
  const providerName = selectedProvider?.meta.name ?? 'DeepSeek'
  const docsUrl = selectedProvider?.meta.docsUrl ?? 'https://api-docs.deepseek.com/'
  const apiKeysUrl = selectedProvider?.meta.apiKeysUrl ?? 'https://platform.deepseek.com/api_keys'
  const providerHost = selectedProvider
    ? new URL(selectedProvider.meta.baseUrl).hostname
    : 'api.deepseek.com'

  const safeguards = [
    {
      icon: KeyRound,
      title: t('home.featureMemoryTitle'),
      copy: t('home.featureMemoryCopy'),
    },
    {
      icon: Route,
      title: t('home.featureDirectTitle'),
      copy: t('home.featureDirectCopy'),
    },
    {
      icon: ServerOff,
      title: t('home.featureTelemetryTitle'),
      copy: t('home.featureTelemetryCopy'),
    },
  ]

  const privacyPillars = [
    {
      number: '01',
      icon: ServerOff,
      title: t('home.pillar1Title'),
      copy: t('home.pillar1Copy'),
    },
    {
      number: '02',
      icon: Route,
      title: t('home.pillar2Title'),
      copy: t('home.pillar2Copy'),
    },
    {
      number: '03',
      icon: KeyRound,
      title: t('home.pillar3Title'),
      copy: t('home.pillar3Copy'),
    },
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onConnect()
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip bg-canvas">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-x-0 top-0 h-[820px] opacity-80" />
        <div className="absolute -right-44 -top-40 size-[560px] rounded-full bg-accent/[0.10] blur-[110px]" />
        <div className="absolute -left-48 top-[480px] size-[440px] rounded-full bg-[#dcae65]/[0.07] blur-[100px]" />
      </div>

      <Header theme={theme} onCycleTheme={onCycleTheme} docsUrl={docsUrl} variant="landing" />

      <main className="flex-1">
        <section className="page-wrap grid gap-14 pb-20 pt-9 sm:pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:pb-28 lg:pt-16">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-2.5 pr-3.5 shadow-[0_1px_0_rgb(255_255_255_/_0.7)_inset] backdrop-blur">
              <span className="status-dot" aria-hidden="true" />
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-muted">
                {t('home.badge')}
              </span>
            </div>

            <h1 className="display-title mt-7 text-[2.65rem] font-extrabold leading-[1.01] text-ink sm:text-6xl xl:text-[4.5rem]">
              {t('home.title1')}
              <br />
              {t('home.title2')}
              <br />
              <span className="relative inline-block text-accent">
                {t('home.title3')}
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-accent/30"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9.5C58 3 170 2.4 298 7.6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-8 max-w-[33rem] text-pretty text-[15px] leading-7 text-muted sm:text-base sm:leading-8">
              {t('home.intro')}
            </p>

            <div className="mt-9 grid max-w-[36rem] gap-4 sm:grid-cols-3">
              {safeguards.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="border-t border-line pt-4">
                  <Icon className="size-[17px] text-accent" strokeWidth={1.9} aria-hidden="true" />
                  <p className="mt-2.5 text-[12px] font-bold text-ink">{title}</p>
                  <p className="mt-1 text-[11px] leading-[1.55] text-muted">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 max-w-[36rem] rounded-2xl border border-line bg-surface/60 p-4 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-surface text-muted">
                    <Globe2 className="size-3.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
                      {t('home.routeOrigin')}
                    </p>
                    <p className="mt-0.5 text-[11px] font-bold text-ink">
                      {t('home.routeThisBrowser')}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-14 flex-1 items-center gap-2 px-1 text-faint">
                  <span className="h-px flex-1 border-t border-dashed border-line" />
                  <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em]">
                    <LockKeyhole className="size-2.5" aria-hidden="true" />
                    {t('home.routeHttps')}
                  </span>
                  <span className="h-px flex-1 border-t border-dashed border-line" />
                </div>

                <div className="flex items-center gap-2">
                  <ProviderGlyph className="size-8 rounded-lg" iconClassName="size-4" />
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
                      {t('home.routeOfficialApi')}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] font-medium text-ink">
                      {providerHost}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 border-t border-line/80 pt-2.5 text-[10px] leading-4 text-faint">
                {t('home.routeNote')}
              </p>
            </div>
          </div>

          <section
            aria-labelledby="connect-heading"
            className="relative animate-fade-up rounded-[1.9rem] border border-line bg-surface p-5 shadow-float sm:p-7 lg:p-8"
            style={{ animationDelay: '100ms' }}
          >
            <div
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{t('home.connectEyebrow')}</p>
                <h2
                  id="connect-heading"
                  className="mt-2 text-[1.65rem] font-extrabold tracking-[-0.04em] text-ink"
                >
                  {t('home.connectTitle')}
                </h2>
              </div>
              <span className="chip mt-0.5 shrink-0 py-1.5">
                <LockKeyhole className="size-3" aria-hidden="true" />
                {t('common.direct')}
              </span>
            </div>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
              <ProviderSelector
                providers={providers}
                value={providerId}
                onChange={onProviderChange}
              />

              <p className="-mt-2.5 text-[10px] leading-4 text-faint">
                {t('provider.deepseekDescription')}
              </p>

              <ApiKeyInput
                value={apiKey}
                onChange={onApiKeyChange}
                hasError={Boolean(formError)}
              />

              <div className="flex items-start gap-2 rounded-xl bg-surface-muted/65 px-3 py-2.5">
                <ShieldCheck
                  className="mt-0.5 size-3.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <p className="text-[10px] leading-4 text-muted">{t('home.keyMemoryNotice')}</p>
              </div>

              {formError && (
                <ErrorAlert error={formError} providerName={providerName} />
              )}

              <button type="submit" className="btn-primary group w-full py-3.5">
                <span>{t('home.connectTo', { provider: providerName })}</span>
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </form>

            <div className="mt-5 rounded-2xl border border-line/80 bg-surface-muted/65 p-3.5">
              <div className="flex items-start gap-2.5">
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0 text-accent"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[11px] font-bold leading-4 text-ink">
                    {t('home.privacyTitle')}
                  </p>
                  <p className="mt-1 text-[10px] leading-[1.55] text-muted">
                    {t('home.privacyBody', { provider: providerName })}
                  </p>
                </div>
              </div>
            </div>

            <details className="group mt-4 rounded-xl px-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-[10px] font-semibold text-muted transition hover:text-ink [&::-webkit-details-marker]:hidden">
                {t('home.detailsSummary')}
                <span
                  className="font-mono text-xs text-faint transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-1 pt-2 text-[10px] leading-[1.65] text-muted">
                {t('home.detailsBody', { host: providerHost })}
              </p>
            </details>

            <p className="mt-5 border-t border-line/80 pt-4 text-center text-[10px] text-faint">
              {t('home.needKey')}{' '}
              <a
                href={apiKeysUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-ink underline decoration-line underline-offset-2 transition hover:decoration-accent"
              >
                {t('home.createKeyAt', { provider: providerName })}
                <ArrowUpRight className="ml-0.5 inline size-2.5" aria-hidden="true" />
              </a>
            </p>
          </section>
        </section>

        <PurchaseSection />

        <section id="privacy" className="scroll-mt-20 border-t border-line/80">
          <div className="page-wrap py-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <p className="eyebrow">{t('home.privacyEyebrow')}</p>
                <h2 className="display-title mt-4 max-w-md text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl">
                  {t('home.privacyHeading')}
                </h2>
                <p className="mt-5 max-w-md text-pretty text-sm leading-6 text-muted">
                  {t('home.privacyIntro')}
                </p>

                <div className="mt-7 inline-flex items-start gap-3 rounded-2xl border border-accent/15 bg-accent-soft/55 px-4 py-3.5">
                  <ShieldCheck
                    className="mt-0.5 size-[18px] shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <p className="text-[11px] leading-5 text-muted">
                    <span className="font-bold text-ink">{t('home.corsTitle')}</span>{' '}
                    {t('home.corsBody')}
                  </p>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-line bg-surface/60 px-4 py-3.5">
                  <Info className="mt-0.5 size-[18px] shrink-0 text-muted" aria-hidden="true" />
                  <p className="text-[11px] leading-5 text-muted">
                    <span className="font-bold text-ink">{t('home.noAccountUsageTitle')}</span>{' '}
                    {t('home.noAccountUsageBody')}
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {privacyPillars.map(({ number, icon: Icon, title, copy }) => (
                  <article
                    key={number}
                    className="group flex gap-4 rounded-2xl border border-line bg-surface/70 p-5 transition hover:border-faint/50 hover:bg-surface sm:gap-5 sm:p-6"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="font-mono text-[9px] text-faint">{number}</span>
                      <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface-muted text-accent transition group-hover:border-accent/25 group-hover:bg-accent-soft">
                        <Icon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink">{title}</h3>
                      <p className="mt-2 max-w-xl text-xs leading-5 text-muted">{copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-line bg-surface/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-muted">
                  <Globe2 className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">{t('home.deployTitle')}</p>
                  <p className="mt-1 text-[11px] leading-4 text-muted">{t('home.deployBody')}</p>
                </div>
              </div>
              <a
                href={docsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-bold text-ink transition hover:text-accent"
              >
                {t('home.readDocs')}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer docsUrl={docsUrl} apiKeysUrl={apiKeysUrl} showSourceProof />
    </div>
  )
}
