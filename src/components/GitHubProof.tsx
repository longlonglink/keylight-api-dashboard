import { Github } from 'lucide-react'
import { GITHUB_REPO_NAME, GITHUB_REPO_URL } from '../config'
import { useI18n } from '../i18n/I18nProvider'

export function GitHubProof() {
  const { t } = useI18n()

  return (
    <section
      aria-labelledby="github-proof-heading"
      className="border-t border-line/80 bg-surface-muted/35"
    >
      <div className="page-wrap flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-ink">
            <Github className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
              GitHub · {GITHUB_REPO_NAME}
            </p>
            <h2
              id="github-proof-heading"
              className="mt-1 text-sm font-extrabold tracking-[-0.02em] text-ink"
            >
              {t('githubProof.heading')}
            </h2>
            <p className="mt-1 text-[10px] leading-4 text-muted">{t('githubProof.body1')}</p>
          </div>
        </div>

        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('githubProof.aria')}
          className="btn-secondary shrink-0 self-start text-[11px] sm:self-auto"
        >
          <Github className="size-3.5" aria-hidden="true" />
          {t('githubProof.cta')}
        </a>
      </div>
    </section>
  )
}
