import { useState, useCallback } from "react"

export function useAppLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")

  const startLoading = useCallback((message?: string) => {
    setIsLoading(true)
    if (message) setLoadingMessage(message)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingMessage("")
  }, [])

  const setLoading = useCallback((loading: boolean, message?: string) => {
    setIsLoading(loading)
    if (message) setLoadingMessage(message)
  }, [])

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    setLoading,
  }
}
