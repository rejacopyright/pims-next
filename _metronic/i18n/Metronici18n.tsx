'use client'
import { createContext, FC, useContext } from 'react'

const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || 'i18nConfig'

type Props = {
  selectedLang: 'de' | 'en' | 'es' | 'fr' | 'ja' | 'zh' | 'ko'
}
const initialState: Props = {
  selectedLang: 'en',
}

function getConfig(): Props {
  try {
    const ls = localStorage.getItem(I18N_CONFIG_KEY) || '{}'
    return JSON.parse(ls) as Props
  } catch {}
  return initialState
}

// Side effect
export function setLanguage(lang: string) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }))
  window.location.reload()
}

const I18nContext = createContext<Props>(initialState)

const useLang = () => {
  return useContext(I18nContext).selectedLang
}

const MetronicI18nProvider: FC<any> = ({ children }) => {
  const lang = getConfig()
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>
}

export { MetronicI18nProvider, useLang }
