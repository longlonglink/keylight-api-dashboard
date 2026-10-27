import { useEffect, useRef } from 'react'

interface UseAutoRefreshOptions {
  enabled: boolean
  intervalMs: number
  isBusy: boolean
  onTick: () => void
}

/**
 * One interval at a time. Disabling or changing the interval clears the old
 * timer; unmounting also clears it. Busy ticks are skipped so manual and
 * automatic refreshes cannot overlap.
 */
export function useAutoRefresh({
  enabled,
  intervalMs,
  isBusy,
  onTick,
}: UseAutoRefreshOptions): void {
  const enabledRef = useRef(enabled)
  const busyRef = useRef(isBusy)
  const onTickRef = useRef(onTick)

  enabledRef.current = enabled
  busyRef.current = isBusy
  onTickRef.current = onTick

  useEffect(() => {
    if (!enabled) return

    const timer = window.setInterval(() => {
      if (!enabledRef.current || busyRef.current) return
      onTickRef.current()
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [enabled, intervalMs])
}
