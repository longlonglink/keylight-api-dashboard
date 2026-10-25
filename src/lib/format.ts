export function formatCurrency(value: string | number, currency: string): string {
  const amount = typeof value === 'number' ? value : Number.parseFloat(value)

  if (!Number.isFinite(amount)) {
    return `${value} ${currency}`
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}

export function formatTokenCount(tokens: number | null): string {
  if (tokens === null) return '—'

  if (tokens >= 1_000_000) {
    const millions = tokens / 1_000_000
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`
  }

  if (tokens >= 1_000) {
    const thousands = tokens / 1_000
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`
  }

  return new Intl.NumberFormat('en-US').format(tokens)
}

export function formatFullNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatRelativeTime(timestamp: string | number | Date, now: number): string {
  const then = new Date(timestamp).getTime()

  if (!Number.isFinite(then)) return 'Just now'

  const elapsedSeconds = Math.max(0, Math.floor((now - then) / 1000))

  if (elapsedSeconds < 45) return 'Just now'
  if (elapsedSeconds < 90) return '1 min ago'

  const minutes = Math.floor(elapsedSeconds / 60)
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(then))
}

export function formatLocalTime(timestamp: string | number | Date): string {
  const date = new Date(timestamp)

  if (!Number.isFinite(date.getTime())) return 'Unknown'

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

export function formatList(values: string[]): string {
  return values.length > 0 ? values.join(' · ') : '—'
}

export function initials(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
