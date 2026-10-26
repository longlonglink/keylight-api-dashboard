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
 * Active top-up offer: the buyer chooses any USD amount and receives API
 * credit at the 100/95 ratio. For example, USD 95.00 paid -> USD 100.00 credit.
 *
 * The PayPal hosted button inspected on 2026-10-26 is a VARIABLE_PRICE
 * checkout, so the buyer enters their chosen amount there. The frontend never
 * injects an amount or changes PayPal pricing. The seller sends the funded API
 * key through Telegram after payment; the site does not issue or receive keys.
 */
export const PROMO_DISCOUNT_ENABLED = true
export const PROMO_CURRENCY = 'USD'
export const PROMO_CREDIT_MULTIPLIER = 100 / 95
