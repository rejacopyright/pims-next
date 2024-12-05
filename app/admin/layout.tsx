'use client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'moment/locale/id'

import { ErrorBoundaryPage } from '@components/layouts/ErrorBoundary'
import { defineRole } from '@components/layouts/LayoutConfig'
import ModalUpdateProfile from '@components/modal/ModalUpdateProfile'
import ModalUpTimeLogin from '@components/modal/ModalUpTimeLogin'
import { APP_ADMIN_PATH, detectMobileScreen, getJWTPayload } from '@helpers'
import { useLocation, useSize } from '@hooks'
import { MenuComponent } from '@metronic/assets/ts/components'
import { AsideDefault } from '@metronic/layout/components/aside/AsideDefault'
import { Content } from '@metronic/layout/components/Content'
import { ScrollTop } from '@metronic/layout/components/ScrollTop'
import { PageDataProvider } from '@metronic/layout/core'
import { MasterInit } from '@metronic/layout/MasterInit'
import { MobileMenuDrawer } from '@metronic/partials'
import { logout } from '@redux'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import moment from 'moment'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { shallowEqual, useSelector } from 'react-redux'

const AdminLayout = ({ children }) => {
  const role = 'admin'
  const router = useRouter()
  const pathname = usePathname()
  const location = useLocation()
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const thisLayout = defineRole?.find((item: any) => item?.role === role)
  const Navbar: any = thisLayout?.navbar
  const Header: any = thisLayout?.header
  const sidebar: any = thisLayout?.sidebar
  const prefix: any = pathname?.slice(1)?.split('/')?.[0] || ''
  const token: any = Cookies.get(`token_${prefix}`)
  const counterInSecond: number = 60

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [upTime, setUpTime] = useState<number>(0)
  const [isUpdateProfile, setUpdateProfile] = useState<boolean>(false)

  const [hasToken, setHasToken] = useState<boolean>(false)

  if (typeof window !== 'undefined') {
    window.onfocus = () => !token && logout()
  }

  useEffect(() => {
    const isAuthRoutes: boolean = /^(\/(admin)\/(login|register|password)\/?\w*)/g.test(
      pathname || ''
    )
    if (!token && !isAuthRoutes) {
      router.push(`${APP_ADMIN_PATH}/login?request=${location?.urlBtoa}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.urlBtoa, pathname, token])

  useEffect(() => {
    setHasToken(Boolean(token))

    const { exp }: any = getJWTPayload(token) || {}
    const countDown = setInterval(() => {
      // moment.utc(moment.unix(exp).diff(moment())).format('HH:mm:ss')
      const remainingSeconds = moment.unix(exp).diff(moment(), 's')

      // Just for testing purposes
      // const remainingSeconds = moment.unix(exp).subtract(3520, 's').diff(moment(), 's')

      if (!token || remainingSeconds <= 0) {
        logout()
        clearInterval(countDown)
        setUpTime(0)
      } else {
        setUpTime(remainingSeconds)
      }
    }, 1000)
    return () => {
      clearInterval(countDown)
    }
  }, [location?.pathname, token])

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [pathname])

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }: any) => (
        <ErrorBoundaryPage error={error} reset={resetErrorBoundary} />
      )}
      onError={(err: any) => err}>
      <PageDataProvider>
        <div className='page d-flex flex-row flex-column-fluid bg-body'>
          {hasToken && <AsideDefault sidebar={sidebar} />}
          <div
            suppressHydrationWarning
            className={clsx('wrapper d-flex flex-column flex-row-fluid', {
              'ps-0': !sidebar || !hasToken,
              'pt-0': !hasToken,
            })}
            id='kt_wrapper'>
            {thisLayout?.header && <Header sidebar={sidebar} />}
            <div id='kt_content' className='content d-flex flex-column flex-column-fluid p-0'>
              <div className='post d-flex w-100' id='kt_post'>
                <Content>{children}</Content>
              </div>
            </div>
          </div>
        </div>
        <MobileMenuDrawer />
        {isMobile && false && <Navbar />}
        <MasterInit />
        <ScrollTop isMobile={isMobile} />
        <ModalUpTimeLogin
          show={upTime && upTime < counterInSecond}
          setShow={setUpTime}
          countDown={upTime}
        />
        {/* <ModalCompleteProfileMessage
          isShow={!user?.user_frst_nm && !user?.user_last_nm && userID}
          setModalUpdateProfile={setUpdateProfile}
        /> */}
        <ModalUpdateProfile
          user={user}
          isModalShow={isUpdateProfile}
          setModalProfile={setUpdateProfile}
        />
      </PageDataProvider>
    </ErrorBoundary>
  )
}

export default AdminLayout
