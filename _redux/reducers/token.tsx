import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import moment from 'moment'
import { persistReducer } from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'

export const tokenReducer = createSlice({
  name: 'cookies',
  initialState: { token: undefined },
  reducers: {
    setToken: (state: any, action: any) => {
      state.token = action?.payload
    },
  },
})

const expiration = moment().add(1, 'm').toDate()

export const persistedTokenReducer = persistReducer(
  {
    key: 'token',
    version: 1,
    whitelist: ['token'],
    storage: new CookieStorage(Cookies, {
      expiration: { default: expiration },
    }),
  },
  tokenReducer.reducer
)
