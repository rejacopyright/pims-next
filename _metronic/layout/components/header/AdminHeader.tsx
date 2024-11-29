/* eslint-disable react-hooks/exhaustive-deps */
import { KTSVG } from '@helpers'
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
          'd-flex align-items-stretch justify-content-between'
        )}>
        {/* begin::Aside mobile toggle */}
        {aside?.display && (
          <div className='d-none align-items-center ms-n3 me-1' title='Show aside menu'>
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
                  <img alt='Logo' src='/logo/logo-circle.png' className='w-15px h-15px' />
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
                  <div
                    className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 gap-3 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
                    id='#kt_header_menu'
                    data-kt-menu='true'>
                    {/* <Link
                      style={menuStyle}
                      className={clsx(menuClass, {
                        [activeClass]:
                          ['submission'].includes(currentPath) ||
                          pathname?.match(/(submission)\/[a-zA-Z0-9]/gi),
                      })}
                      href='/submission'>
                      {translate('MENU.SUBMIT_OPEN_BADGE')}
                    </Link>
                    <Link
                      style={menuStyle}
                      className={clsx(menuClass, {
                        [activeClass]:
                          ['issue'].includes(currentPath) ||
                          pathname?.match(/(issue)\/[a-zA-Z0-9]/gi),
                      })}
                      href='/issue'>
                      {translate('MENU.ISSUE.BADGES')}
                    </Link> */}
                    {/* <Link
                  style={menuStyle}
                    className={clsx(menuClass, {
                      [activeClass]: ['verification'].includes(currentPath),
                    })}
                    href='/verification'>
                    {translate('MENU.VERIFICATION')}
                  </Link> */}
                    {/* <Dropdown>
                    <Dropdown.Toggle
                      variant='light'
                      size='sm'
                      className='text-dark d-flex align-items-center justify-content-between gap-5'>
                      Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => ''}>Sub Menu 1</Dropdown.Item>
                      <Dropdown.Item onClick={() => ''}>Sub Menu 2</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  </div>
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
