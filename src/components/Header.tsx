import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import { Brand } from './Brand'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import type { ThemePreference } from '../lib/storage'

interface HeaderProps {
  theme: ThemePreference
  onCycleTheme: () => void
  variant?: 'landing' | 'dashboard'
  docsUrl: string
  actions?: ReactNode
}

export function Header({
  theme,
  onCycleTheme,
  variant = 'landing',
  docsUrl,
  actions,
}: HeaderProps) {
  const { t } = useI18n()
  const isDashboard = variant === 'dashboard'

  return (
    <header
      className={
        isDashboard
          ? 'sticky top-0 z-30 border-b border-line/80 bg-canvas/85 backdrop-blur-xl'
          : 'relative z-20'
      }
    >
      <div className="page-wrap flex min-h-[76px] items-center justify-between gap-3 py-3">
        <Brand />

        <div className="flex items-center gap-1.5 sm:gap-2">
          {!isDashboard && (
            <nav
              className="mr-1 hidden items-center gap-0.5 md:flex"
              aria-label={t('header.pageLinks')}
            >
              <a href="#privacy" className="nav-link">
                {t('header.privacy')}
              </a>
              <a
                href={docsUrl}
                target="_blank"
                rel="noreferrer"
                className="nav-link inline-flex items-center gap-1"
              >
                {t('header.apiDocs')}
                <ArrowUpRight className="size-3.5 text-faint" aria-hidden="true" />
              </a>
            </nav>
          )}

          {isDashboard && (
            <span className="mr-1 hidden items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:inline-flex">
              <span className="status-dot" aria-hidden="true" />
              {t('header.privateSession')}
            </span>
          )}

          {actions}
          <LanguageToggle />
          <ThemeToggle theme={theme} onCycle={onCycleTheme} />
        </div>
      </div>
    </header>
  )
}
