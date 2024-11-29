import { useLayout } from '@metronic/layout/core'
import { useEffect, useRef } from 'react'

const BG_COLORS = ['bg-white', 'bg-info']

export function Sidebar() {
  const { classes } = useLayout()
  const sidebarCSSClass = classes.sidebar
  const sideBarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sidebarCSSClass) {
      return
    }

    BG_COLORS.forEach((cssClass) => {
      sideBarRef.current?.classList.remove(cssClass)
    })

    sidebarCSSClass.forEach((cssClass) => {
      sideBarRef.current?.classList.add(cssClass)
    })
  }, [sidebarCSSClass])

  return <>Sidebar</>
}
