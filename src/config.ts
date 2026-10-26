/**
 * Public source repository used by the GitHub transparency link.
 *
 * Maintainers: before deploying a fork, replace this value with the public
 * repository that contains the exact source being deployed, then verify the
 * URL in a browser. Do not use a placeholder in production.
 */
export const GITHUB_REPO_URL = 'https://github.com/longlonglink/keylight-api-dashboard'

export const GITHUB_REPO_NAME = 'longlonglink/keylight-api-dashboard'

export const TELEGRAM_PURCHASE_URL = 'https://t.me/+mErIcVI3_R4zMDE1'

export const PAYPAL_PAYMENT_URL = 'https://www.paypal.com/ncp/payment/CMTG9BPF9Z2KG'

/**
 * Active top-up offer:
 *   payment: USD amount chosen by the buyer
 *   estimated API credit: payment × USD/CNY reference rate × 100/95, in CNY
 *
 * The reference rate is displayed as an estimate only; the final CNY credit is
 * confirmed in Telegram. Update PROMO_USD_CNY_RATE when the reference changes.
 *
 * The PayPal hosted button is a VARIABLE_PRICE checkout, so the buyer enters
 * their chosen USD amount there. The frontend never injects an amount or
 * changes PayPal pricing. After payment the seller verifies it in the Telegram
 * group and sends the funded API key by private message.
 */
export const PROMO_DISCOUNT_ENABLED = true
export const PROMO_PAY_CURRENCY = 'USD'
export const PROMO_CREDIT_CURRENCY = 'CNY'
export const PROMO_USD_CNY_RATE = 6.68
export const PROMO_CREDIT_MULTIPLIER = 100 / 95
