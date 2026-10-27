export function formatDateTime(timestamp: string | number | Date, locale: string): string {
  const date = new Date(timestamp)

  if (!Number.isFinite(date.getTime())) return '—'

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

export function formatTime(timestamp: string | number | Date, locale: string): string {
  const date = new Date(timestamp)

  if (!Number.isFinite(date.getTime())) return '—'

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

export function formatTokenCount(tokens: number | null, locale: string): string {
  if (tokens === null) return '—'

  if (tokens >= 1_000_000) {
    const millions = tokens / 1_000_000
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`
  }

  if (tokens >= 1_000) {
    const thousands = tokens / 1_000
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`
  }

  return new Intl.NumberFormat(locale).format(tokens)
}

export function formatFullNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatList(values: string[], emptyValue = '—'): string {
  return values.length > 0 ? values.join(' · ') : emptyValue
}
