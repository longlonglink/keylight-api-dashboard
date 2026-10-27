import { ArrowUpRight, BadgePercent, Send } from 'lucide-react'
import { DISCORD_COMMUNITY_URL, TELEGRAM_COMMUNITY_URL } from '../config'
import { useI18n } from '../i18n/I18nProvider'
import { DiscordGlyph } from './DiscordGlyph'

export function CommunitySection() {
  const { t } = useI18n()

  return (
    <section id="api-access" aria-labelledby="api-access-heading" className="border-y border-line/80">
      <div className="page-wrap py-10 sm:py-12">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
          <div
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-[#8de8c5] to-[#FFD140]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-accent-soft/50 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-accent">
                <BadgePercent className="size-3.5" aria-hidden="true" />
                {t('promotion.badge')}
              </span>

              <h2
                id="api-access-heading"
                className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-ink sm:text-[1.75rem]"
              >
                {t('promotion.title')}
              </h2>
              <p className="mt-2 max-w-xl text-[13px] leading-6 text-muted">
                {t('promotion.description')}
              </p>
              <p className="mt-3 text-[10px] leading-4 text-faint">{t('promotion.note')}</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:w-[27rem]">
              <a
                href={TELEGRAM_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-4 py-2.5 text-center text-xs font-bold text-white transition hover:bg-[#1b8fc6] focus-visible:outline-accent"
              >
                <Send className="size-4 shrink-0" aria-hidden="true" />
                {t('promotion.telegram')}
                <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
              </a>

              <a
                href={DISCORD_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#5865F2] px-4 py-2.5 text-center text-xs font-bold text-white transition hover:bg-[#4752C4] focus-visible:outline-accent"
              >
                <DiscordGlyph className="size-4" />
                {t('promotion.discord')}
                <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
