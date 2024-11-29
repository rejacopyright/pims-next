// import { googleLogout } from '@react-oauth/google'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { persistReducer } from 'redux-persist'

import storageLocal from '../utils/conditionalStorage'

export const persistKey = 'global'
// Original Reducer
export const authReducer = createSlice({
  name: 'root',
  initialState: {
    errors: undefined,
    role: undefined,
    user: {},
    trainer: {},
    admin: {},
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action?.payload
    },
    setErrors: (state: any, action: any) => {
      state.errors = action?.payload
    },
    setUser: (state: any, action: any) => {
      state.user = { ...state.user, ...action?.payload }
    },
    setTrainer: (state: any, action: any) => {
      state.trainer = { ...state.trainer, ...action?.payload }
    },
    setAdmin: (state: any, action: any) => {
      state.admin = { ...state.admin, ...action?.payload }
    },
    logout: (_state: any) => {
      // googleLogout()
      // localStorage.removeItem(/(persist):([a-zA-Z0-9])\w*/g)
      const prefix: any = location?.pathname?.slice(1)?.split('/')?.[0] || ''
      const guardedItems: string[] = ['ally-supports-cache']
      if (localStorage) {
        Object.keys(localStorage)
          ?.filter((x: any) => !guardedItems?.includes(x))
          ?.forEach((item: any) => {
            localStorage.removeItem(item)
          })
      }
      const token = Cookies.get(`token_${prefix}`)
      if (token) {
        Cookies.remove(`token_${prefix}`)
        window.location.reload()
      }
    },
  },
})

// Persist Reducer
export const persistedAuthReducer = () =>
  persistReducer(
    {
      key: persistKey,
      version: 1,
      // whitelist: ['errors', 'data'],
      storage: storageLocal,
    },
    authReducer.reducer
  )
