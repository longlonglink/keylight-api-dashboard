import { cn } from '../lib/cn'
import { useI18n } from '../i18n/I18nProvider'

interface BrandProps {
  className?: string
  markOnly?: boolean
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn('size-10 shrink-0', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="brand-mark-gradient" x1="6" y1="3" x2="35" y2="38">
          <stop stopColor="#168363" />
          <stop offset="1" stopColor="#082E24" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#brand-mark-gradient)" />
      <circle cx="20" cy="17" r="6.5" fill="none" stroke="#EAFFF7" strokeWidth="2.2" />
      <path
        d="M20 23.5V30M16.8 30h6.4"
        fill="none"
        stroke="#EAFFF7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="29.5" cy="10.5" r="2" fill="#8DE8C5" />
    </svg>
  )
}

export function Brand({ className, markOnly = false }: BrandProps) {
  const { t } = useI18n()

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <BrandMark />
      {!markOnly && (
        <div className="leading-none">
          <span className="block text-[17px] font-extrabold tracking-[-0.035em] text-ink">
            Keylight
          </span>
          <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-faint sm:block">
            {t('brand.tagline')}
          </span>
        </div>
      )}
    </div>
  )
}
