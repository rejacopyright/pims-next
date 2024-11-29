import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import storageLocal from '../utils/conditionalStorage'

// Original Reducer
export const profileReducer = createSlice({
  name: 'root',
  initialState: { tmpEmail: {} },
  reducers: {
    setTmpEmail: (state: any, action: any) => {
      state.tmpEmail = action?.payload
    },
  },
})

// Persist Reducer
export const persistedProfileReducer = () =>
  persistReducer(
    {
      key: 'profile',
      version: 1,
      storage: storageLocal,
    },
    profileReducer.reducer
  )
