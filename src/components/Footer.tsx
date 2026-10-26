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
      <div className="page-wrap flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="size-8 rounded-[9px]" />
          <p className="text-[10px] leading-4 text-muted">
            <span className="font-semibold text-ink">Keylight</span> · {t('footer.tagline')}
            <span className="mt-0.5 block text-[9px] text-faint">{t('footer.notAffiliated')}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <LockKeyhole className="size-3 text-accent" aria-hidden="true" />
            {t('footer.noBackend')}
          </span>
          <a className="transition hover:text-ink" href={apiKeysUrl} target="_blank" rel="noreferrer">
            {t('footer.getKey')}
            <ArrowUpRight className="ml-0.5 inline size-2.5" aria-hidden="true" />
          </a>
          <a className="transition hover:text-ink" href={docsUrl} target="_blank" rel="noreferrer">
            {t('footer.apiDocs')}
            <ArrowUpRight className="ml-0.5 inline size-2.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {showSourceProof && <GitHubProof />}
    </footer>
  )
}
