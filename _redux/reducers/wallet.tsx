import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import storageLocal from '../utils/conditionalStorage'

// Original Reducer
export const walletReducer = createSlice({
  name: 'root',
  initialState: { detail: {} },
  reducers: {
    setWalletDetail: (state: any, action: any) => {
      state.detail = action?.payload
    },
  },
})

// Persist Reducer
export const persistedWalletReducer = () =>
  persistReducer(
    {
      key: 'wallet',
      version: 1,
      whitelist: ['detail'],
      storage: storageLocal,
    },
    walletReducer.reducer
  )
