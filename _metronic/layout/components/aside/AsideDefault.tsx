/* eslint-disable react/jsx-no-target-blank */
import { APP_NAME, KTSVG } from '@helpers'
import { useLayout } from '@metronic/layout/core'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { AsideMenu } from './AsideMenu'

const AsideDefault: FC<any> = ({ sidebar }) => {
  const { config, classes } = useLayout()
  const { aside } = config
  const pathname = usePathname()
  const prefix: any = pathname?.slice(1)?.split('/')?.[0] || ''

  if (!sidebar) {
    return null
  }

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'>
      <div className='aside-logo flex-column-auto' id='kt_aside_logo'>
        <Link href={`/${prefix}`}>
          <div className='row align-items-center logo flex-nowrap'>
            <div className='col-auto p-0'>
              <div className='d-flex flex-center gap-5px'>
                <Image
                  alt='Logo'
                  className='logo pb-4px'
                  width={25}
                  height={25}
                  src='/logo/logo-circle.png'
                  priority
                />
                <div className='fw-bolder fs-20px'>{APP_NAME}</div>
              </div>
            </div>
          </div>
        </Link>

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'>
            <KTSVG path={'/media/icons/arrows/arr080.svg'} className={'svg-icon-1 rotate-180'} />
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

      {/* begin::Footer */}
      <div className='aside-footer flex-column-auto pt-5 pb-7 px-5' id='kt_aside_footer'>
        <div className='btn btn-custom btn-primary w-100'>
          <span className='btn-label'>Docs & Components</span>
          <span className='svg-icon btn-icon svg-icon-2'>
            <KTSVG path='/media/icons/general/gen005.svg' />
          </span>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}

export { AsideDefault }
