import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import Nav from './Nav'
export const HeaderStyle2: FC<any> = ({ variant }) => {
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
    <header
      className={`cs_site_header header_style_2 cs_style_1 ${
        variant ? variant : ''
      } cs_sticky_header cs_site_header_full_width ${
        mobileToggle ? 'cs_mobile_toggle_active' : ''
      } ${isSticky ? isSticky : ''}`}>
      <div className='cs_main_header'>
        <div className='container'>
          <div className='cs_main_header_in'>
            <div className='cs_main_header_left'>
              <Link href='/' className='cs_site_branding site_logo_2'>
                <img src='/assets/img/logo/header-logo2.png' alt='Logo' />
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
            <div className='cs_main_header_right header-right2'>
              <div className='header2-buttons'>
                <div className='button'>
                  <Link className='theme-btn2' href='/contact'>
                    Get A Quote{' '}
                    <span className='arrow1'>
                      <i className='bi bi-arrow-right'></i>
                    </span>
                    <span className='arrow2'>
                      <i className='bi bi-arrow-right'></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
