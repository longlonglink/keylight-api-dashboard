import type { FormEvent } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
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
import { FaqSection } from '../components/FaqSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProviderGlyph } from '../components/ProviderGlyph'
import { ProviderSelector } from '../components/ProviderSelector'
import { CommunitySection } from '../components/CommunitySection'

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
    { icon: KeyRound, label: t('home.featureMemoryTitle') },
    { icon: Route, label: t('home.featureDirectTitle') },
    { icon: ServerOff, label: t('home.featureTelemetryTitle') },
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onConnect()
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip bg-canvas">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="bg-grid absolute inset-x-0 top-0 h-[700px] opacity-75" />
        <div className="absolute -right-44 -top-40 size-[560px] rounded-full bg-accent/[0.09] blur-[110px]" />
      </div>

      <Header theme={theme} onCycleTheme={onCycleTheme} docsUrl={docsUrl} variant="landing" />

      <main className="flex-1">
        <section className="page-wrap grid gap-12 pb-14 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:pb-20 lg:pt-14">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 backdrop-blur">
              <span className="status-dot" aria-hidden="true" />
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-muted">
                {t('home.badge')}
              </span>
            </span>

            <h1 className="display-title mt-6 text-[2.65rem] font-extrabold leading-[1.01] text-ink sm:text-6xl xl:text-[4.2rem]">
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

            <p className="mt-7 max-w-md text-pretty text-sm leading-7 text-muted sm:text-base">
              {t('home.intro')}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {safeguards.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/65 px-3 py-1.5 text-[10px] font-semibold text-muted"
                >
                  <Icon className="size-3.5 text-accent" strokeWidth={1.9} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-surface/55 px-3 py-2 text-[10px] text-muted">
              <Globe2 className="size-3.5 text-faint" aria-hidden="true" />
              <span>{t('home.routeThisBrowser')}</span>
              <span className="text-faint" aria-hidden="true">
                →
              </span>
              <LockKeyhole className="size-3 text-accent" aria-hidden="true" />
              <span>{t('home.routeHttps')}</span>
              <span className="text-faint" aria-hidden="true">
                →
              </span>
              <ProviderGlyph className="size-5 rounded-md" />
              <span className="font-mono text-[9px] text-ink">{providerHost}</span>
            </div>
          </div>

          <section
            aria-labelledby="connect-heading"
            className="relative animate-fade-up rounded-[1.9rem] border border-line bg-surface p-5 shadow-float sm:p-7"
            style={{ animationDelay: '100ms' }}
          >
            <div
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-4">
              <h2
                id="connect-heading"
                className="text-xl font-extrabold tracking-[-0.04em] text-ink"
              >
                {t('home.connectTitle')}
              </h2>
              <span className="chip shrink-0 py-1.5">
                <LockKeyhole className="size-3" aria-hidden="true" />
                {t('common.direct')}
              </span>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <ProviderSelector
                providers={providers}
                value={providerId}
                onChange={onProviderChange}
              />

              <ApiKeyInput
                value={apiKey}
                onChange={onApiKeyChange}
                hasError={Boolean(formError)}
              />

              {formError && <ErrorAlert error={formError} providerName={providerName} />}

              <button type="submit" className="btn-primary group w-full py-3.5">
                <span>{t('home.connectTo', { provider: providerName })}</span>
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </form>

            <p className="mt-4 flex items-start gap-2 text-[10px] leading-4 text-muted">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="font-bold text-ink">{t('home.privacyTitle')}</span>{' '}
                {t('home.privacyBody', { provider: providerName })}
              </span>
            </p>

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

        <CommunitySection />

        <section id="privacy" className="scroll-mt-20 border-t border-line/80">
          <div className="page-wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="eyebrow">{t('home.privacyEyebrow')}</p>
                <p className="mt-1 text-sm font-bold text-ink">{t('home.privacyHeading')}</p>
                <p className="mt-1 text-[11px] leading-5 text-muted">{t('home.privacyIntro')}</p>
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
        </section>

        <FaqSection />
      </main>

      <Footer showSourceProof />
    </div>
  )
}
