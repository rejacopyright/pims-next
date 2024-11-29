'use client'

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import Nav from './Nav'
export const Header4: FC<any> = ({ variant = '' }) => {
  const [mobileToggle, setMobileToggle] = useState(false)
  const [isSticky, setIsSticky] = useState<any>()
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      if (currentScrollPos > prevScrollPos) {
        setIsSticky('cs-gescout_sticky') // Scrolling down
      } else if (currentScrollPos !== 0) {
        setIsSticky('cs-gescout_show cs-gescout_sticky') // Scrolling up
      } else {
        setIsSticky('')
      }
      setPrevScrollPos(currentScrollPos) // Update previous scroll position
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll) // Cleanup the event listener
    }
  }, [prevScrollPos])

  return (
    <div className='header-area2'>
      <header
        className={`cs_site_header cs_style_1 ${
          variant
        } cs_sticky_header cs_site_header_full_width ${
          mobileToggle ? 'cs_mobile_toggle_active' : ''
        } ${isSticky ? isSticky : ''}`}>
        <div className='cs_main_header cs_accent_bg'>
          <div className='container'>
            <div className='cs_main_header_in'>
              <div className='cs_main_header_left'>
                <Link className='cs_site_brandings header-four' href='/'>
                  <img src='/logo/logo-circle.png' className='w-50px h-50px' alt='Logo' />
                </Link>
              </div>

              <div className='cs_main_header_center'>
                <div className='cs_nav cs_primary_font fw-medium'>
                  <span
                    className={mobileToggle ? 'cs-munu_toggle cs_teggle_active' : 'cs-munu_toggle'}
                    onClick={() => setMobileToggle(!mobileToggle)}>
                    <span></span>
                  </span>
                  <Nav setMobileToggle={setMobileToggle} />
                </div>
              </div>
              <div className='cs_main_header_right'>
                <div className='solutek-btn2'>
                  <Link className='theme-btn5' href='/contact'>
                    Get A Quote
                    <span>
                      <i className='bi bi-arrow-right'></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='cs_site_header_spacing_88'></div>
    </div>
  )
}
