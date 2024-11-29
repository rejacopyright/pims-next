import { DrawerComponent } from '@metronic/assets/ts/components'
import { useLayout } from '@metronic/layout/core'
import clsx from 'clsx'
import uniq from 'lodash/uniq'
import { usePathname } from 'next/navigation'
import { FC, useEffect } from 'react'

const Content: FC<any> = ({ children }) => {
  const { classes } = useLayout()
  const pathname = usePathname()
  useEffect(() => {
    DrawerComponent.hideAll()
    classes.contentContainer = uniq([...(classes?.contentContainer || ''), 'p-0 m-0'])
  }, [classes, pathname])

  return (
    <div
      id='kt_content_container'
      className={clsx(classes.contentContainer.join(' '))}
      style={{ maxWidth: 'unset' }}>
      {children}
    </div>
  )
}

export { Content }
