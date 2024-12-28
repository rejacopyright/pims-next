/* eslint-disable react-hooks/exhaustive-deps */
import { APP_NAME, KTSVG } from '@helpers'
import { useLayout, usePageData } from '@metronic/layout/core'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { DefaultTitle } from './page-title/DefaultTitle'
import { Topbar } from './Topbar'

export const AdminHeader: FC<any> = ({ sidebar, canMobilePageGoBack }) => {
  const prefix: any = location?.pathname?.slice(1)?.split('/')?.[0] || ''
  const token: any = Cookies.get(`token_${prefix}`)
  const { logoReplacement } = usePageData()
  const { config, classes } = useLayout()
  const { header, aside } = config

  const [hasToken, setHasToken] = useState<boolean>(false)

  useEffect(() => {
    setHasToken(Boolean(token))
  }, [token])

  return (
    <div
      suppressHydrationWarning
      id='kt_header'
      className={clsx('header shadow-none align-items-stretch h-60px', classes?.header.join(' '), {
        'start-0': !sidebar,
        'd-flex d-lg-none': !hasToken,
      })}>
      <div
        className={clsx(
          classes?.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between-xxx'
        )}>
        {/* begin::Aside mobile toggle */}
        {aside?.display && (
          <div className='d-flex d-lg-none align-items-center ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'>
              <KTSVG path='/media/icons/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}

        {aside?.display && (
          <>
            {logoReplacement ? (
              <div className='d-flex d-lg-none align-items-center'>{logoReplacement}</div>
            ) : (
              <Link href='/' className='d-flex d-lg-none align-items-center flex-lg-grow-0'>
                {canMobilePageGoBack?.status ? (
                  <div className='d-flex gap-4'>
                    <i className='fa-solid fa-chevron-left display-6' />
                    <span className='display-6'>{canMobilePageGoBack?.title}</span>
                  </div>
                ) : (
                  <div className='d-flex align-items-end gap-5px'>
                    <img alt='Logo' src='/logo/logo-circle.png' className='w-20px h-20px mb-2px' />
                    <div className='fw-bolder'>{APP_NAME}</div>
                  </div>
                )}
              </Link>
            )}
          </>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-center flex-lg-grow-1 justify-content-between header-content'>
          <div className='d-flex flex-lg-grow-1 align-items-center'>
            {/* begin::Navbar */}
            {header.left === 'menu' && (
              <div className='d-flex align-items-stretch' id='kt_header_nav'>
                <div
                  className='header-menu align-items-stretch'
                  data-kt-drawer='true'
                  data-kt-drawer-name='header-menu'
                  data-kt-drawer-activate='{default: true, lg: false}'
                  data-kt-drawer-overlay='true'
                  data-kt-drawer-width="{default:'200px', '300px': '250px'}"
                  data-kt-drawer-direction='end'
                  data-kt-drawer-toggle='#kt_header_menu_mobile_toggle'
                  data-kt-swapper='true'
                  data-kt-swapper-mode='prepend'
                  data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}">
                  {/* <div
                    className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 gap-3 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
                    id='#kt_header_menu'
                    data-kt-menu='true'></div> */}
                </div>
              </div>
            )}

            {header?.left === 'page-title' && (
              <div className='d-flex align-items-center' id='kt_header_nav'>
                <DefaultTitle />
              </div>
            )}
          </div>

          <Topbar />
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
