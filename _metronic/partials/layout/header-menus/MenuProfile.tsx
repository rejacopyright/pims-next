'use client'
import { logout } from '@redux'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

// import { Languages } from './Languages'

const MenuProfile: FC = () => {
  const userStore: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const [user, setUser] = useState<any>({})
  const email: any = user?.mails?.find(({ user_eml_rprs }: any) => user_eml_rprs === 'Y')?.user_eml

  useEffect(() => {
    setUser(userStore)
  }, [userStore])

  useEffect(() => {
    const elements = document.getElementsByClassName('menu-link')
    if (elements) {
      Array.from(elements).forEach((element) => {
        element.addEventListener('click', () => {
          const profileCard = document.getElementById('profile_card')
          profileCard?.classList?.remove('show')
        })
      })
    }
  }, [])

  return (
    <div
      id='profile_card'
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-dark menu-state-bg menu-state-primary fw-400 py-4 fs-6 w-275px'
      data-kt-menu='true'>
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src='/media/placeholder/avatar-orange.svg' />
          </div>

          <div className='d-flex flex-column'>
            <span className='fw-500 text-dark text-hover-primary fs-7'>{email}</span>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item-custom px-5'>
        <Link href='/profile' scroll={false} className='menu-link px-5'>
          Profil
        </Link>
        {/* <Link href={`/history/login`} className='menu-link px-5'>
          {translate('LOGIN_HISTORY')}
        </Link> */}
      </div>

      {/* <div
        className='menu-item px-5'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom'>
        <a href='#' className='menu-link px-5'>
          <span className='menu-title'>My Menu</span>
          <span className='menu-arrow'></span>
        </a>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              Billing
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link d-flex flex-stack px-5'>
              Payments
              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='View your statements'></i>
            </a>
          </div>

          <div className='separator my-2'></div>

          <div className='menu-item px-3'>
            <div className='menu-content px-3'>
              <label className='form-check form-switch form-check-custom form-check-solid'>
                <input
                  className='form-check-input w-30px h-20px'
                  type='checkbox'
                  value='1'
                  defaultChecked={true}
                  name='notifications'
                />
                <span className='form-check-label text-muted fs-7'>Notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div> */}

      <div className='separator my-2'></div>

      {/* <Languages /> */}

      <div
        className='menu-item-custom px-5'
        onClick={async (e: any) => {
          e.preventDefault()
          e.stopPropagation()
          await logout()
        }}>
        <span className='menu-link px-5'>Keluar</span>
      </div>
    </div>
  )
}

export { MenuProfile }
