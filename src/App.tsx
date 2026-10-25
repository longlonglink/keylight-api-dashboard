import { useCallback, useEffect, useRef, useState } from 'react'
import { DashboardSkeleton } from './components/DashboardSkeleton'
import { ProviderError, toProviderError } from './lib/errors'
import { normalizeApiKey, purgeLegacyCredentialStorage } from './lib/security'
import { useTheme } from './hooks/useTheme'
import { useI18n } from './i18n/I18nProvider'
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
  const { theme, cycleTheme } = useTheme()
  const { t } = useI18n()

  const [apiKey, setApiKey] = useState('')
  const [providerId, setProviderId] = useState(DEFAULT_PROVIDER_ID)
  const [phase, setPhase] = useState<ConnectionPhase>('idle')
  const [sessionKey, setSessionKey] = useState<string | null>(null)
  const [data, setData] = useState<DashboardData | null>(null)
  const [formError, setFormError] = useState<ProviderError | null>(null)
  const [refreshError, setRefreshError] = useState<ProviderError | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const abortRef = useRef<AbortController | null>(null)
  const operationRef = useRef(0)

  useEffect(() => {
    purgeLegacyCredentialStorage()
  }, [])

  useEffect(() => {
    document.title =
      phase === 'connected'
        ? t('meta.dashboardTitle')
        : phase === 'connecting'
          ? t('meta.connectingTitle')
          : t('meta.homeTitle')
  }, [phase, t])

  const handleApiKeyChange = useCallback((value: string) => {
    setFormError(null)
    setApiKey(value)
  }, [])

  const handleProviderChange = useCallback((nextProviderId: string) => {
    setProviderId(nextProviderId === 'deepseek' ? 'deepseek' : DEFAULT_PROVIDER_ID)
    setFormError(null)
  }, [])

  const handleConnect = useCallback(async () => {
    if (phase === 'connecting') return

    const normalizedKey = normalizeApiKey(apiKey)

    if (!normalizedKey) {
      setFormError(new ProviderError('key-required'))
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
    } catch (error) {
      if (controller.signal.aborted || attempt !== operationRef.current) return
      setFormError(toProviderError(error))
      setPhase('idle')
    } finally {
      if (attempt === operationRef.current) {
        abortRef.current = null
      }
    }
  }, [apiKey, phase, providerId])

  const handleCancelConnect = useCallback(() => {
    operationRef.current += 1
    abortRef.current?.abort()
    abortRef.current = null
    setPhase('idle')
    setFormError(null)
  }, [])

  const handleRefresh = useCallback(async () => {
    if (!sessionKey || isRefreshing) return

    const attempt = operationRef.current + 1
    operationRef.current = attempt
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
        setIsRefreshing(false)
        if (abortRef.current === controller) {
          abortRef.current = null
        }
      }
    }
  }, [isRefreshing, providerId, sessionKey])

  const handleClear = useCallback(() => {
    operationRef.current += 1
    abortRef.current?.abort()
    abortRef.current = null

    setPhase('idle')
    setSessionKey(null)
    setData(null)
    setApiKey('')
    setFormError(null)
    setRefreshError(null)
    setIsRefreshing(false)
    purgeLegacyCredentialStorage()
  }, [])

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
        isRefreshing={isRefreshing}
        refreshError={refreshError}
        onDismissRefreshError={() => setRefreshError(null)}
        onRefresh={() => void handleRefresh()}
        onClear={handleClear}
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
      onConnect={() => void handleConnect()}
      formError={formError}
    />
  )
}
