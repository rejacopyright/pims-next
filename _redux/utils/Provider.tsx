'use client'
import { persistor, store } from '@redux'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export function ReduxProvider({ children }) {
  const storeRef: any = useRef()
  if (!storeRef.current) {
    storeRef.current = store
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
