import { checkIsActive, KTSVG } from '@helpers'
import { useLocation } from '@hooks'
import { useLayout } from '@metronic/layout/core'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  children?: any
}

const AsideMenuItem: FC<Props> = ({ children, to, title, icon, fontIcon, hasBullet = false }) => {
  const { pathname }: any = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config

  return (
    <div className='menu-item menu-item-customs'>
      <Link className={clsx('menu-link without-sub', { active: isActive })} href={to || '/'}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot' />
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export { AsideMenuItem }
