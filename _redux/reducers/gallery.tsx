import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import storageLocal from '../utils/conditionalStorage'

// Original Reducer
export const galleryReducer = createSlice({
  name: 'root',
  initialState: {
    totalItems: 0,
  },
  reducers: {
    setTotalItems: (state: any, action: any) => {
      state.totalItems = action?.payload
    },
  },
})

// Persist Reducer
export const persistedGalleryReducer = () =>
  persistReducer(
    {
      key: 'gallery',
      version: 1,
      storage: storageLocal,
    },
    galleryReducer.reducer
  )
