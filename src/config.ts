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
 * Do not enable until the PayPal product is configured with a fixed price that
 * is exactly 95% of the seller's stated standard price and that price has been
 * verified on the public checkout page.
 *
 * The hosted button inspected on 2026-10-26 was a VARIABLE_PRICE top-up:
 * the buyer enters an amount. No 5% discount could be verified. The frontend
 * must never change or bypass PayPal pricing.
 */
export const PROMO_DISCOUNT_ENABLED = false
