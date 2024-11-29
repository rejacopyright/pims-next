import { KTSVG } from '@helpers'
import {
  DrawerComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '@metronic/assets/ts/components'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useRef } from 'react'

interface Props {
  isMobile?: boolean
}

export const ScrollTop: FC<Props> = ({ isMobile }) => {
  const pathname = usePathname()
  const isFirstRun = useRef(true)

  const pluginsReinitialization = () => {
    setTimeout(() => {
      StickyComponent.reInitialization()
      setTimeout(() => {
        ToggleComponent.reinitialization()
        DrawerComponent.reinitialization()
      }, 70)
    }, 140)
  }

  const scrollTop = () => {
    ScrollTopComponent.goTop()
  }

  const updateHeaderSticky = () => {
    const stickyHeader = document.body.querySelectorAll(`[data-kt-sticky-name="header"]`)
    if (stickyHeader && stickyHeader.length > 0) {
      const sticky = StickyComponent.getInstance(stickyHeader[0] as HTMLElement)
      if (sticky) {
        sticky.update()
      }
    }
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      pluginsReinitialization()
    }

    updateHeaderSticky()
    setTimeout(() => {
      // scrollTop()
    }, 0)
  }, [pathname])

  return (
    <div
      id='kt_scrolltop'
      onClick={scrollTop}
      className='scrolltop'
      data-kt-scrolltop='true'
      style={{ bottom: isMobile ? 75 : '' }}>
      <KTSVG path='/media/icons/arrows/arr066.svg' />
    </div>
  )
}
