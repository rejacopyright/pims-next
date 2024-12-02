/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import '@metronic/assets/sass/style.scss'
import '@styles/custom.scss'
import '@styles/pims.scss'
import '@styles/splash-screen.css'
import 'suneditor/dist/css/suneditor.min.css'
import '@components/form/custom.scss'
import '@components/tooltip/style.scss'

import axios from '@api/axios'
import { DotFlash } from '@components/loader/dots'
import ToastProvider from '@components/toast/ToastProvider'
import { I18nProvider } from '@metronic/i18n/i18nProvider'
import { LayoutProvider } from '@metronic/layout/core'
import { ReduxProvider } from '@redux/utils/Provider'
import { ReactQueryProvider } from '@redux/utils/ReactQueryProvider'
import { cookies } from 'next/headers'

export default async function RootLayout({ children }) {
  const cookiesStore = await cookies()
  const token: any = cookiesStore.get('token')?.value
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return (
    <html lang='id'>
      <head>
        {/* <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap"
      rel="stylesheet" /> */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap'
        />
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/npm/typeface-poppins@1.1.13/index.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
          integrity='sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css'
          integrity='sha512-vebUliqxrVkBy3gucMhClmyQP9On/HAWQdKDXRaAlb/FKuTbxkjPKUyqVOxAcGwFDka79eTF+YXwfke1h3/wfg=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <link rel='shortcut icon' href='/favicon.ico' />
      </head>
      <body
        id='kt_body'
        className='header-fixed header-tablet-and-mobile-fixed'
        suppressHydrationWarning>
        <ReactQueryProvider>
          <ReduxProvider>
            <I18nProvider>
              <LayoutProvider>
                <ToastProvider>{children}</ToastProvider>
              </LayoutProvider>
            </I18nProvider>
          </ReduxProvider>
        </ReactQueryProvider>
        <div
          id='splash-screen'
          className='splash-screen'
          style={{
            flexDirection: 'initial',
            msFlexDirection: 'initial',
            WebkitFlexDirection: 'initial',
            gap: '10px',
          }}>
          {/* <Image
            src='/logo/logo-circle.png'
            alt='Open Badge'
            width={50}
            height={50}
            priority
            style={{ marginBottom: '10px' }}
          /> */}
          <div className=''>
            <DotFlash animation='flashing' style={{ transform: 'scale(0.65)' }} />
          </div>
        </div>
        <div id='root-modals'></div>
      </body>
    </html>
  )
}
