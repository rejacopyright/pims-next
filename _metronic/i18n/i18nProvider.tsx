'use client'

import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/ko'
import '@formatjs/intl-relativetimeformat/locale-data/id'

import { FC } from 'react'
import { IntlProvider } from 'react-intl'

import enMessages from './messages/en.json'
import idMessages from './messages/id.json'
import krMessages from './messages/kr.json'
import { useLang } from './Metronici18n'

const allMessages = {
  en: enMessages,
  ko: krMessages,
  id: idMessages,
}

const I18nProvider: FC<any> = ({ children }) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export { I18nProvider }
