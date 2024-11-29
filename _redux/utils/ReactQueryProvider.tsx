'use client'
import { store } from '@redux'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { keepPreviousData, QueryCache, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { useRef } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      placeholderData: keepPreviousData,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      gcTime: 1000 * 60 * 60 * 12, // 12 hours
      // staleTime: Infinity,
      throwOnError: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err: any) => {
      const errMessage: any = err?.response?.data?.message?.reason || err?.message
      return errMessage
    },
  }),
})

const persister: any = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : null,
})

export function ReactQueryProvider({ children }) {
  const storeRef: any = useRef()
  if (!storeRef.current) {
    storeRef.current = store
  }
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  )
}
