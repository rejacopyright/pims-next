'use client'
// import { Footer4 } from '@client/Components/Footer/Footer4'
import 'slick-carousel/slick/slick.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@client/assets/main.scss'
import '@client/assets/custom.scss'

import { Footer5 } from '@client/Components/Footer/Footer5'
import { Header5 } from '@client/Components/Header/HeaderStyle5'
import { detectMobileScreen } from '@helpers'
import { useSize } from '@hooks'
import { useLang } from '@metronic/i18n/Metronici18n'
import { useCallback, useEffect, useState } from 'react'

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: '/media/flags/us.svg',
  },
  {
    lang: 'ko',
    name: 'Korea',
    flag: '/media/flags/kr.svg',
  },
  {
    lang: 'id',
    name: 'Indonesia',
    flag: '/media/flags/id.svg',
  },
]

const PublicLayout = ({ children }) => {
  const [_isMobile, setIsMobile] = useState<boolean>(false)
  const [_scrollY, setScrollY] = useState(0)
  const lang = useLang()
  const _currentLanguage = languages.find((x) => x.lang === lang)

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  const onScroll = useCallback(() => {
    setScrollY((window.scrollY / 200) * 100)
  }, [])

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener('scroll', onScroll, { passive: true })
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='main-page-area'>
      {/* <div className='fixed-top' style={{ backgroundColor: `rgba(255,255,255,${scrollY / 100})` }}>
        {!isMobile ? (
          <NavbarDesktop language={currentLanguage} scrollY={scrollY} />
        ) : (
          <NavbarMobile language={currentLanguage} />
        )}
      </div> */}
      <Header5 />
      {children}
      <Footer5 />
      {/* <Footer4 /> */}
    </div>
  )
}

export default PublicLayout
