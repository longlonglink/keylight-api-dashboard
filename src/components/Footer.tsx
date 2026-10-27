import { Github, LockKeyhole, Send } from 'lucide-react'
import {
  DISCORD_COMMUNITY_URL,
  GITHUB_REPO_URL,
  TELEGRAM_COMMUNITY_URL,
} from '../config'
import { useI18n } from '../i18n/I18nProvider'
import { BrandMark } from './Brand'
import { DiscordGlyph } from './DiscordGlyph'
import { GitHubProof } from './GitHubProof'

interface FooterProps {
  showSourceProof?: boolean
}

const termsUrl = `${GITHUB_REPO_URL}/blob/main/TERMS.md`

export function Footer({ showSourceProof = false }: FooterProps) {
  const { t } = useI18n()

  return (
    <footer className="border-t border-line/80">
      <div className="page-wrap flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="size-8 rounded-[9px]" />
          <p className="text-[10px] leading-4 text-muted">
            <span className="font-semibold text-ink">KeyLight</span> · {t('footer.tagline')}
            <span className="mt-0.5 block text-[9px] text-faint">{t('footer.notAffiliated')}</span>
          </p>
        </div>

        <nav
          aria-label={t('footer.links')}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold text-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <LockKeyhole className="size-3 text-accent" aria-hidden="true" />
            {t('footer.noBackend')}
          </span>
          <a
            className="inline-flex items-center gap-1 transition hover:text-ink"
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="size-3" aria-hidden="true" />
            {t('footer.github')}
          </a>
          <a
            className="inline-flex items-center gap-1 transition hover:text-ink"
            href={TELEGRAM_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send className="size-3" aria-hidden="true" />
            {t('footer.telegram')}
          </a>
          <a
            className="inline-flex items-center gap-1 transition hover:text-ink"
            href={DISCORD_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordGlyph className="size-3" />
            {t('footer.discord')}
          </a>
          <a className="transition hover:text-ink" href="/#privacy">
            {t('footer.privacy')}
          </a>
          <a
            className="transition hover:text-ink"
            href={termsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer.terms')}
          </a>
        </nav>
      </div>

      {showSourceProof && <GitHubProof />}
    </footer>
  )
}
