import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import { BrandMark } from './Brand'
import { GitHubProof } from './GitHubProof'

interface FooterProps {
  docsUrl: string
  apiKeysUrl: string
  showSourceProof?: boolean
}

export function Footer({ docsUrl, apiKeysUrl, showSourceProof = false }: FooterProps) {
  const { t } = useI18n()

  return (
    <footer className="border-t border-line/80">
      <div className="page-wrap flex flex-col gap-7 py-9 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <BrandMark className="size-8 rounded-[9px]" />
          <div>
            <p className="max-w-md text-xs leading-5 text-muted">
              <span className="font-semibold text-ink">Keylight</span> · {t('footer.tagline')}
            </p>
            <p className="mt-1.5 text-[10px] text-faint">{t('footer.notAffiliated')}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <LockKeyhole className="size-3.5 text-accent" aria-hidden="true" />
            {t('footer.noBackend')}
          </span>
          <span className="text-faint/60" aria-hidden="true">
            /
          </span>
          <a className="transition hover:text-ink" href={apiKeysUrl} target="_blank" rel="noreferrer">
            {t('footer.getKey')}
            <ArrowUpRight className="ml-1 inline size-3" aria-hidden="true" />
          </a>
          <a className="transition hover:text-ink" href={docsUrl} target="_blank" rel="noreferrer">
            {t('footer.apiDocs')}
            <ArrowUpRight className="ml-1 inline size-3" aria-hidden="true" />
          </a>
        </div>
      </div>

      {showSourceProof && <GitHubProof />}
    </footer>
  )
}
