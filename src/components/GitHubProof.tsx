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
      <div className="page-wrap flex flex-col gap-6 py-9 sm:py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface text-ink">
            <Github className="size-5" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">GitHub · {GITHUB_REPO_NAME}</p>
            <h2
              id="github-proof-heading"
              className="mt-2 text-lg font-extrabold tracking-[-0.035em] text-ink"
            >
              {t('githubProof.heading')}
            </h2>
            <div className="mt-2 space-y-1 text-[11px] leading-5 text-muted">
              <p>{t('githubProof.body1')}</p>
              <p>{t('githubProof.body2')}</p>
            </div>
          </div>
        </div>

        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('githubProof.aria')}
          className="btn-secondary shrink-0 self-start text-xs md:self-auto"
        >
          <Github className="size-4" aria-hidden="true" />
          {t('githubProof.cta')}
        </a>
      </div>
    </section>
  )
}
