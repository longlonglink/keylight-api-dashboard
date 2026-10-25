import { useCallback, useEffect, useRef, useState } from 'react'
import { DashboardSkeleton } from './components/DashboardSkeleton'
import { ProviderError, toProviderError } from './lib/errors'
import {
  clearAppStorage,
  readAutoRefreshMinutes,
  readRememberedApiKey,
  removeRememberedApiKey,
  saveAutoRefreshMinutes,
  saveRememberedApiKey,
  type AutoRefreshMinutes,
  type ThemePreference,
} from './lib/storage'
import { normalizeApiKey } from './lib/security'
import { useTheme } from './hooks/useTheme'
import { Home } from './pages/Home'
import { DashboardPage } from './pages/DashboardPage'
import {
  DEFAULT_PROVIDER_ID,
  PROVIDER_LIST,
  getProviderById,
} from './providers'
import type { DashboardData } from './providers/types'

type ConnectionPhase = 'idle' | 'connecting' | 'connected'

export default function App() {
  const { theme, setTheme, cycleTheme } = useTheme()

  // These initial values are read once at mount. No throwaway state retains a
  // second copy of a remembered key after Clear API key.
  const [apiKey, setApiKey] = useState(() => readRememberedApiKey() ?? '')
  const [remember, setRemember] = useState(() => readRememberedApiKey() !== null)
  const [loadedFromStorage, setLoadedFromStorage] = useState(
    () => readRememberedApiKey() !== null,
  )
  const [providerId, setProviderId] = useState(DEFAULT_PROVIDER_ID)
  const [phase, setPhase] = useState<ConnectionPhase>('idle')
  const [sessionKey, setSessionKey] = useState<string | null>(null)
  const [data, setData] = useState<DashboardData | null>(null)
  const [formError, setFormError] = useState<ProviderError | null>(null)
  const [refreshError, setRefreshError] = useState<ProviderError | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState<AutoRefreshMinutes>(() =>
    readAutoRefreshMinutes(),
  )

  const abortRef = useRef<AbortController | null>(null)
  const operationRef = useRef(0)
  const refreshInFlightRef = useRef(false)

  useEffect(() => {
    document.title =
      phase === 'connected'
        ? 'Dashboard · Keylight'
        : phase === 'connecting'
          ? 'Connecting · Keylight'
          : 'Keylight — Privacy-first API Dashboard'
  }, [phase])

  const handleApiKeyChange = useCallback((value: string) => {
    setLoadedFromStorage(false)
    setFormError(null)
    setApiKey(value)
  }, [])

  const handleProviderChange = useCallback((nextProviderId: string) => {
    setProviderId(nextProviderId === 'deepseek' ? 'deepseek' : DEFAULT_PROVIDER_ID)
    setFormError(null)
  }, [])

  const handleRememberChange = useCallback(
    (nextRemember: boolean) => {
      setRemember(nextRemember)

      if (!nextRemember) {
        setLoadedFromStorage(false)
        removeRememberedApiKey()
        return
      }

      if (sessionKey) {
        saveRememberedApiKey(sessionKey)
      }
    },
    [sessionKey],
  )

  const handleConnect = useCallback(async () => {
    if (phase === 'connecting') return

    const normalizedKey = normalizeApiKey(apiKey)

    if (!normalizedKey) {
      setFormError(
        new ProviderError(
          'unknown',
          'API key required',
          'Enter your API key to connect. It is used only for direct requests from this tab.',
        ),
      )
      return
    }

    abortRef.current?.abort()
    const attempt = operationRef.current + 1
    operationRef.current = attempt
    const controller = new AbortController()
    abortRef.current = controller

    setFormError(null)
    setRefreshError(null)
    setPhase('connecting')

    try {
      const provider = getProviderById(providerId)
      const snapshot = await provider.getDashboard(normalizedKey, controller.signal)
      if (controller.signal.aborted || attempt !== operationRef.current) return

      setData(snapshot)
      setSessionKey(normalizedKey)
      setPhase('connected')
      setApiKey('')
      setLoadedFromStorage(false)

      if (remember) {
        saveRememberedApiKey(normalizedKey)
      } else {
        removeRememberedApiKey()
      }
    } catch (error) {
      if (controller.signal.aborted || attempt !== operationRef.current) return
      setFormError(toProviderError(error))
      setPhase('idle')
    } finally {
      if (attempt === operationRef.current) {
        abortRef.current = null
      }
    }
  }, [apiKey, phase, providerId, remember])

  const handleCancelConnect = useCallback(() => {
    operationRef.current += 1
    abortRef.current?.abort()
    abortRef.current = null
    setPhase('idle')
    setFormError(null)
  }, [])

  const handleRefresh = useCallback(async () => {
    if (!sessionKey || refreshInFlightRef.current) return

    const attempt = operationRef.current + 1
    operationRef.current = attempt
    refreshInFlightRef.current = true
    const controller = new AbortController()
    abortRef.current = controller

    setIsRefreshing(true)
    setRefreshError(null)

    try {
      const provider = getProviderById(providerId)
      const snapshot = await provider.getDashboard(sessionKey, controller.signal)
      if (controller.signal.aborted || attempt !== operationRef.current) return
      setData(snapshot)
    } catch (error) {
      if (controller.signal.aborted || attempt !== operationRef.current) return
      setRefreshError(toProviderError(error))
    } finally {
      if (attempt === operationRef.current) {
        refreshInFlightRef.current = false
        setIsRefreshing(false)
        if (abortRef.current === controller) {
          abortRef.current = null
        }
      }
    }
  }, [providerId, sessionKey])

  const handleClear = useCallback(() => {
    operationRef.current += 1
    abortRef.current?.abort()
    abortRef.current = null
    refreshInFlightRef.current = false

    setPhase('idle')
    setSessionKey(null)
    setData(null)
    setApiKey('')
    setRemember(false)
    setLoadedFromStorage(false)
    setFormError(null)
    setRefreshError(null)
    setIsRefreshing(false)
    setAutoRefresh(0)
    setTheme('system')
    clearAppStorage()
  }, [setTheme])

  const handleAutoRefreshChange = useCallback((minutes: AutoRefreshMinutes) => {
    setAutoRefresh(minutes)
    saveAutoRefreshMinutes(minutes)
  }, [])

  useEffect(() => {
    if (phase !== 'connected' || autoRefresh === 0) return

    const timer = window.setInterval(() => {
      void handleRefresh()
    }, autoRefresh * 60_000)

    return () => window.clearInterval(timer)
  }, [autoRefresh, handleRefresh, phase])

  const handleThemeChange = useCallback(
    (nextTheme: ThemePreference) => {
      setTheme(nextTheme)
    },
    [setTheme],
  )

  const selectedProvider = getProviderById(providerId)

  if (phase === 'connecting') {
    return (
      <DashboardSkeleton
        theme={theme}
        onCycleTheme={cycleTheme}
        docsUrl={selectedProvider.meta.docsUrl}
        onCancel={handleCancelConnect}
      />
    )
  }

  if (phase === 'connected' && data && sessionKey) {
    return (
      <DashboardPage
        data={data}
        theme={theme}
        onCycleTheme={cycleTheme}
        onThemeChange={handleThemeChange}
        isRefreshing={isRefreshing}
        refreshError={refreshError}
        onDismissRefreshError={() => setRefreshError(null)}
        onRefresh={() => void handleRefresh()}
        onClear={handleClear}
        autoRefresh={autoRefresh}
        onAutoRefreshChange={handleAutoRefreshChange}
        remember={remember}
        onRememberChange={handleRememberChange}
      />
    )
  }

  return (
    <Home
      theme={theme}
      onCycleTheme={cycleTheme}
      providers={PROVIDER_LIST}
      providerId={providerId}
      onProviderChange={handleProviderChange}
      apiKey={apiKey}
      onApiKeyChange={handleApiKeyChange}
      remember={remember}
      onRememberChange={handleRememberChange}
      onConnect={() => void handleConnect()}
      formError={formError}
      loadedFromStorage={loadedFromStorage}
    />
  )
}
