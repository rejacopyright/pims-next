import { KTSVG } from '@helpers'
import Link from 'next/link'
import { FC } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const MobileMenuDrawer: FC<any> = () => {
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const email: any = user?.mails?.find(({ user_eml_rprs }: any) => user_eml_rprs === 'Y')?.user_eml
  return (
    <div
      id='kt_menu'
      className='bg-white'
      data-kt-drawer='true'
      data-kt-drawer-name='menu'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'100%', 'lg': '300px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_menu_toggle'
      data-kt-drawer-close='#kt_menu_close'>
      <div className='card w-100 shadow-none rounded-0'>
        <div className='card-header d-flex align-items-center' id='kt_menu_header'>
          {/* <h3 className='card-title fw-bolder text-dark'>Test Menu</h3> */}
          <img alt='Logo' src='/logo/logo-circle.png' className='h-28px' />

          <div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-active-light-primary'
              id='kt_menu_close'>
              <i className='las la-times text-gray-900 fs-30px' />
              {/* <KTSVG path='/media/icons/arrows/arr061.svg' className='svg-icon-2x text-dark' /> */}
            </button>
          </div>
        </div>
        <div className='card-body position-relative p-0' id='kt_menu_body'>
          <div
            id='kt_menu_scroll'
            className='position-relative scroll-y'
            data-kt-scroll='true'
            data-kt-scroll-height='auto'
            data-kt-scroll-wrappers='#kt_menu_body'
            data-kt-scroll-dependencies='#kt_menu_header, #kt_menu_footer'
            data-kt-scroll-offset='0px'>
            <div className='w-100 p-40px'>
              <div className='d-flex gap-8px mb-40px'>
                <img
                  alt='Logo'
                  src='/media/placeholder/avatar-orange.svg'
                  style={{ width: '32px', height: '32px' }}
                />
                <div className='d-flex justify-content-center align-items-center user-select-none fs-14px lh-1'>
                  <span suppressHydrationWarning className='fw-bold' style={{ color: '#272D37' }}>
                    {email}
                  </span>
                </div>
              </div>
              {/* CARD MENU */}
              <div className='row mb-40px'>
                <div className='col-6 px-10px my-10px'>
                  <Link
                    href='/wallet'
                    className='d-flex flex-center border border-gray-300 radius-15 bg-white'
                    style={{ height: '150px' }}>
                    <div className=''>
                      <div
                        className='d-flex flex-center bg-light-orange radius-5 mx-auto'
                        style={{ width: '36px', height: '36px', border: '1px solid #f7ae86' }}>
                        <KTSVG path='/media/icons/custom/wallet.svg' svgClassName='w-18px h-18px' />
                      </div>
                      <div className='fw-600 fs-22px mt-20px text-gray-800'>나의 지갑</div>
                    </div>
                  </Link>
                </div>
              </div>
              <Link
                href='/policy'
                scroll={false}
                className='d-flex h-60px align-items-center gap-14px mb-40px border-bottom border-gray-300'>
                <div className='d-flex flex-center radius-100 border border-2 border-gray-300 w-30px h-30px'>
                  <i className='fas fa-arrow-right text-gray-400 fs-14px' />
                </div>
                <div className='fs-20px text-gray-800 fw-600'>개인정보 처리 방침</div>
              </Link>
              <Link
                href='/terms'
                scroll={false}
                className='d-flex h-60px align-items-center gap-14px mb-40px border-bottom border-gray-300'>
                <div className='d-flex flex-center radius-100 border border-2 border-gray-300 w-30px h-30px'>
                  <i className='fas fa-arrow-right text-gray-400 fs-14px' />
                </div>
                <div className='fs-20px text-gray-800 fw-600'>서비스 이용 약관</div>
              </Link>
              <div className='d-flex h-200px align-items-center'>
                <div className=''>
                  <div className='fs-22px text-gray-800 fw-700'>고객센터</div>
                  <div className='fs-15px text-gray-600 fw-400 my-13px'>
                    고객센터 이메일로 문의하시면 빠른 시간 내에 이메일로 답변드리도록 하겠습니다.
                  </div>
                  <div className='fs-16px text-gray-600 fw-700'>example@email.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='card-footer py-5 text-center' id='kt_menu_footer'>
        <Link href='/crafted/pages/profile' className='btn btn-bg-white text-primary'>
          View All Menu
          <KTSVG path='/media/icons/arrows/arr064.svg' className='svg-icon-3 svg-icon-primary' />
        </Link>
      </div> */}
      </div>
    </div>
  )
}

export { MobileMenuDrawer }
