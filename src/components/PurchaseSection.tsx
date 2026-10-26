import { useId, useState } from 'react'
import { ArrowUpRight, BadgePercent, Send, ShoppingBag } from 'lucide-react'
import {
  PAYPAL_PAYMENT_URL,
  PROMO_CREDIT_CURRENCY,
  PROMO_CREDIT_MULTIPLIER,
  PROMO_DISCOUNT_ENABLED,
  PROMO_PAY_CURRENCY,
  PROMO_USD_CNY_RATE,
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
  const estimateId = useId()
  const showDiscount = PROMO_DISCOUNT_ENABLED
  const [topUpAmount, setTopUpAmount] = useState('95')
  const parsedAmount = Number.parseFloat(topUpAmount)
  const hasValidAmount = Number.isFinite(parsedAmount) && parsedAmount > 0
  const credit = hasValidAmount
    ? (parsedAmount * PROMO_USD_CNY_RATE * PROMO_CREDIT_MULTIPLIER).toFixed(2)
    : '—'

  return (
    <section id="api-keys" aria-labelledby="api-keys-heading" className="border-y border-line/80">
      <div className="page-wrap py-10 sm:py-14">
        <div className="balance-panel relative overflow-hidden rounded-[2rem] p-6 text-white shadow-[0_30px_90px_-52px_rgb(6_42_30_/_0.75)] sm:p-8 lg:p-10">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
            <div>
              <div className="flex flex-wrap items-center gap-2">
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
              <p className="mt-3 max-w-lg text-[13px] leading-6 text-white/70">
                {t('promo.subtitle')}
              </p>

              {showDiscount && (
                <div className="mt-5 space-y-1.5 text-[10px] leading-4">
                  <p className="font-mono text-[#FFE8A3]">
                    {t('promo.formula', { rate: PROMO_USD_CNY_RATE })}
                  </p>
                  <p className="text-white/45">
                    {t('promo.rateNote', { rate: PROMO_USD_CNY_RATE })}
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/15 bg-surface p-5 text-ink shadow-float sm:p-6">
              <h3 className="text-lg font-extrabold tracking-[-0.035em] text-ink">
                {t('promo.checkoutTitle')}
              </h3>

              <div className="mt-4 rounded-2xl border border-line bg-surface-muted/60 p-4">
                <label
                  htmlFor={amountId}
                  className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint"
                >
                  {t('promo.calculatorPayLabel')}
                </label>
                <div className="mt-2 flex items-center rounded-xl border border-line bg-surface px-3 transition focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/10">
                  <span className="font-mono text-[10px] font-semibold text-faint">
                    {PROMO_PAY_CURRENCY}
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
                    aria-describedby={estimateId}
                    className="numeric min-h-10 w-full border-0 bg-transparent px-2 text-right text-sm font-bold text-ink outline-none"
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-accent/15 bg-accent-soft/60 px-3 py-2">
                  <span className="text-[10px] font-semibold text-muted">
                    {t('promo.calculatorCreditLabel')}
                  </span>
                  <span className="numeric font-mono text-[13px] font-bold text-accent">
                    {credit === '—' ? '—' : `${PROMO_CREDIT_CURRENCY} ${credit}`}
                  </span>
                </div>

                <p id={estimateId} className="mt-2 text-[9px] leading-4 text-muted">
                  {t('promo.calculatorNote')}
                </p>
              </div>

              <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
                {t('promo.stepPay')}
              </p>

              <div className="mt-2 flex justify-center">
                <style>{paypalButtonCss}</style>
                <form
                  action={PAYPAL_PAYMENT_URL}
                  method="post"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PayPal"
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

              <p className="mt-2 text-center text-[9px] leading-4 text-faint">
                {t('promo.priceNote')}
              </p>

              <p className="mt-5 border-t border-line/80 pt-4 font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
                {t('promo.stepVerify')}
              </p>

              <a
                href={TELEGRAM_PURCHASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-[#1b8fc6] focus-visible:outline-white"
              >
                <Send className="size-4 shrink-0" aria-hidden="true" />
                {t('promo.telegram')}
                <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
              <p className="mt-2 text-center text-[9px] leading-4 text-muted">
                {t('promo.telegramFlow')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
