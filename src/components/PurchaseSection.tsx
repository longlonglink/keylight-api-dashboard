import { useId, useState } from 'react'
import {
  ArrowUpRight,
  BadgePercent,
  KeyRound,
  Send,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react'
import {
  PAYPAL_PAYMENT_URL,
  PROMO_CREDIT_MULTIPLIER,
  PROMO_CURRENCY,
  PROMO_DISCOUNT_ENABLED,
  TELEGRAM_PURCHASE_URL,
} from '../config'
import { useI18n } from '../i18n/I18nProvider'

const paypalButtonCss = `
.pp-CMTG9BPF9Z2KG {
  text-align: center;
  border: none;
  border-radius: 0.25rem;
  min-width: 11.625rem;
  padding: 0 2rem;
  height: 2.625rem;
  font-weight: bold;
  background-color: #FFD140;
  color: #000000;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  cursor: pointer;
}
`

export function PurchaseSection() {
  const { t } = useI18n()
  const amountId = useId()
  const creditNoteId = useId()
  const showDiscount = PROMO_DISCOUNT_ENABLED
  const [topUpAmount, setTopUpAmount] = useState('95')
  const parsedAmount = Number.parseFloat(topUpAmount)
  const hasValidAmount = Number.isFinite(parsedAmount) && parsedAmount > 0
  const estimatedCredit = hasValidAmount
    ? (parsedAmount * PROMO_CREDIT_MULTIPLIER).toFixed(2)
    : '—'

  return (
    <section
      id="api-keys"
      aria-labelledby="api-keys-heading"
      className="border-y border-line/80"
    >
      <div className="page-wrap py-14 sm:py-16 lg:py-20">
        <div className="balance-panel relative overflow-hidden rounded-[2rem] p-6 text-white shadow-[0_30px_90px_-52px_rgb(6_42_30_/_0.75)] sm:p-8 lg:p-10">
          <div className="relative z-10 grid gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-center lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                  <ShoppingBag className="size-3" aria-hidden="true" />
                  {showDiscount ? t('promo.eyebrowOffer') : t('promo.eyebrowPurchase')}
                </span>
                {showDiscount && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD140] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#271d00]">
                    <BadgePercent className="size-3.5" aria-hidden="true" />
                    {t('promo.discountBadge')}
                  </span>
                )}
              </div>

              <h2
                id="api-keys-heading"
                className="mt-5 max-w-2xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl"
              >
                {showDiscount ? t('promo.titleOffer') : t('promo.titleNeutral')}
              </h2>

              <p className="mt-4 max-w-2xl text-pretty text-[13px] leading-6 text-white/70 sm:text-sm sm:leading-7">
                {t('promo.subtitle')}
              </p>

              <p className="mt-3 max-w-2xl text-[10px] leading-4 text-white/40">
                {t('promo.accountNote')}
              </p>

              {showDiscount && (
                <p className="mt-4 inline-flex rounded-xl border border-[#FFD140]/20 bg-[#FFD140]/10 px-3.5 py-2.5 text-[10px] leading-4 text-[#FFE8A3]">
                  {t('promo.discountDefinition')}
                </p>
              )}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <ShieldCheck className="size-4 text-[#a9f4d6]" aria-hidden="true" />
                  <p className="mt-2.5 text-[11px] font-bold text-white">
                    {t('promo.featureOfficialTitle')}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-white/50">
                    {t('promo.featureOfficialCopy')}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <KeyRound className="size-4 text-[#a9f4d6]" aria-hidden="true" />
                  <p className="mt-2.5 text-[11px] font-bold text-white">
                    {t('promo.featureNoLoginTitle')}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-white/50">
                    {t('promo.featureNoLoginCopy')}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[9px] leading-4 text-white/35">{t('promo.affiliation')}</p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-surface p-5 text-ink shadow-float sm:p-6">
              <p className="eyebrow">{t('promo.checkoutEyebrow')}</p>
              <h3 className="mt-2 text-xl font-extrabold tracking-[-0.035em] text-ink">
                {t('promo.checkoutTitle')}
              </h3>

              {showDiscount && (
                <div className="mt-4 rounded-2xl border border-line bg-surface-muted/60 p-4">
                  <label
                    htmlFor={amountId}
                    className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint"
                  >
                    {t('promo.calculatorPayLabel')}
                  </label>
                  <div className="mt-2 flex items-center rounded-xl border border-line bg-surface px-3 transition focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/10">
                    <span className="font-mono text-[10px] font-semibold text-faint">
                      {PROMO_CURRENCY}
                    </span>
                    <input
                      id={amountId}
                      type="number"
                      min="0.01"
                      step="0.01"
                      inputMode="decimal"
                      value={topUpAmount}
                      onChange={(event) => setTopUpAmount(event.target.value)}
                      placeholder={t('promo.calculatorPlaceholder')}
                      aria-describedby={creditNoteId}
                      className="numeric min-h-10 w-full border-0 bg-transparent px-2 text-right text-sm font-bold text-ink outline-none"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-accent/15 bg-accent-soft/60 px-3 py-2.5">
                    <span className="text-[10px] font-semibold text-muted">
                      {t('promo.calculatorCreditLabel')}
                    </span>
                    <span className="numeric font-mono text-[13px] font-bold text-accent">
                      {estimatedCredit === '—'
                        ? '—'
                        : `${PROMO_CURRENCY} ${estimatedCredit}`}
                    </span>
                  </div>

                  <p id={creditNoteId} className="mt-2.5 text-[9px] leading-4 text-muted">
                    {t('promo.calculatorNote')}
                  </p>
                  <p className="mt-1.5 text-[9px] leading-4 text-faint">
                    {t('promo.checkoutNote')}
                  </p>
                </div>
              )}

              <a
                href={TELEGRAM_PURCHASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-[#1b8fc6] focus-visible:outline-white"
              >
                <Send className="size-4 shrink-0" aria-hidden="true" />
                {t('promo.telegram')}
                <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
              <p className="mt-2 text-center text-[9px] leading-4 text-faint">
                {t('promo.telegramHint')}
              </p>

              <div className="my-5 flex items-center gap-3 text-[8px] font-medium uppercase tracking-[0.14em] text-faint">
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                {t('promo.checkoutDivider')}
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>

              <div className="flex justify-center">
                <style>{paypalButtonCss}</style>
                <form
                  aria-label="PayPal"
                  action={PAYPAL_PAYMENT_URL}
                  method="post"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-grid',
                    justifyItems: 'center',
                    alignContent: 'start',
                    gap: '0.5rem',
                  }}
                >
                  <input
                    className="pp-CMTG9BPF9Z2KG"
                    type="submit"
                    value={t('promo.paypalButton')}
                  />

                  <img
                    src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg"
                    alt={t('promo.paypalCardsAlt')}
                  />

                  <section style={{ fontSize: '0.75rem' }}>
                    {t('promo.paypalSupport')}{' '}
                    <img
                      src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
                      alt="PayPal"
                      style={{ height: '0.875rem', verticalAlign: 'middle' }}
                    />
                  </section>
                </form>
              </div>

              <div className="mt-4 rounded-xl border border-accent/15 bg-accent-soft/55 px-3 py-2.5">
                <p className="text-center text-[9px] leading-4 text-muted">
                  {t('promo.keyDelivery')}
                </p>
              </div>

              <p className="mt-3 border-t border-line/80 pt-3 text-center text-[9px] leading-4 text-faint">
                {t('promo.priceNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
