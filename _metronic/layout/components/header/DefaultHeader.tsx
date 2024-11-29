/* eslint-disable react-hooks/exhaustive-deps */
import { KTSVG } from '@helpers'
import { useLayout } from '@metronic/layout/core'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import { DefaultTitle } from './page-title/DefaultTitle'
import { Topbar } from './Topbar'

export const DefaultHeader: FC<any> = () => {
  const { config, classes, attributes } = useLayout()
  const { header, aside } = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}>
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}>
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-none align-items-center ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'>
              <KTSVG path='/media/icons/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link href='/wallet' className='d-lg-none'>
              <img alt='Logo' src='/logo/logo-circle.png' className='h-20px' />
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside.display && (
          <Link href='/' className='d-flex d-lg-none align-items-center flex-grow-1 flex-lg-grow-0'>
            <img alt='Logo' src='/logo/logo-circle.png' className='h-20px mx-2' />
          </Link>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
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
                <div
                  className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
                  id='#kt_header_menu'
                  data-kt-menu='true'>
                  {/* <MenuInner /> */}
                </div>
              </div>
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='kt_header_nav'>
              <DefaultTitle />
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
