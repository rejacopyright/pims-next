/* eslint-disable no-unsafe-optional-chaining */
import { DataTypes } from '@components/layouts/LayoutConfig'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import { authReducer, persistedAuthReducer } from './reducers/auth'
import { tokenReducer } from './reducers/token'

// Reducers
const allReducers = combineReducers({
  user: persistedAuthReducer(),
})

// Store - Redux
export const store = configureStore({
  reducer: allReducers,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk],
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Store - Persist
export const persistor = persistStore(store)

// USER & AUTH DISPATCHER
export const {
  setErrors: dispatchErrors,
  setUser: updateUser,
  setTrainer: updateTrainer,
  setAdmin: updateAdmin,
  setRole: dispatchRole,
  logout: logoutApp,
} = authReducer?.actions
export const { setToken: updateToken } = tokenReducer?.actions
export const setErrors = (e: any) => store.dispatch(dispatchErrors(e))
export const setToken = (e: any) => store.dispatch(updateToken(e))
export const setUser = (e: any) => store.dispatch(updateUser(e))
export const setTrainer = (e: any) => store.dispatch(updateTrainer(e))
export const setAdmin = (e: any) => store.dispatch(updateAdmin(e))
export const setRole = (e: DataTypes['role']) => store.dispatch(dispatchRole(e))
export const logout = () => store.dispatch(logoutApp())
