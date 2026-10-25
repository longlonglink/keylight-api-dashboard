import { useI18n } from '../i18n/I18nProvider'
import { cn } from '../lib/cn'

export function LanguageToggle() {
  const { language, setLanguage, t } = useI18n()

  return (
    <div
      className="flex items-center rounded-full border border-line bg-surface/70 p-0.5"
      role="group"
      aria-label={t('common.language')}
    >
      <button
        type="button"
        onClick={() => setLanguage('zh')}
        aria-pressed={language === 'zh'}
        className={cn(
          'rounded-full px-2.5 py-1.5 text-[10px] font-bold transition',
          language === 'zh'
            ? 'bg-ink text-canvas shadow-sm'
            : 'text-muted hover:text-ink',
        )}
      >
        {t('common.chineseName')}
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={cn(
          'rounded-full px-2.5 py-1.5 text-[10px] font-bold transition',
          language === 'en'
            ? 'bg-ink text-canvas shadow-sm'
            : 'text-muted hover:text-ink',
        )}
      >
        {t('common.englishName')}
      </button>
    </div>
  )
}
