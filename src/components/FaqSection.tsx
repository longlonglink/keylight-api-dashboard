import { Plus } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

export function FaqSection() {
  const { t } = useI18n()
  const items = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
  ]

  return (
    <section aria-labelledby="faq-heading" className="border-t border-line/80">
      <div className="page-wrap py-9">
        <h2 id="faq-heading" className="text-sm font-extrabold tracking-[-0.02em] text-ink">
          {t('faq.title')}
        </h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-line bg-surface/60 px-4 py-3 open:bg-surface"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[11px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  className="size-3.5 shrink-0 text-faint transition group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2 text-[10px] leading-5 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
