import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  SwapperComponent,
  ToggleComponent,
} from '@metronic/assets/ts/components'
import { FC, useEffect, useRef } from 'react'

import { useLayout } from './core'

export const MasterInit: FC<any> = () => {
  const { config } = useLayout()
  const isFirstRun = useRef(true)
  const pluginsInitialization = () => {
    isFirstRun.current = false
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
      SwapperComponent.bootstrap()
    }, 500)
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      pluginsInitialization()
    }
  }, [config])

  return null
}
