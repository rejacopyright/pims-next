import { APP_ADMIN_PATH, KTSVG } from '@helpers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const Index: FC<any> = () => {
  const path = usePathname()
  return (
    <>
      <div className='h-75px' />
      <div className='position-fixed bottom-0 w-100'>
        <div className='shadow-sm border-top border-gray-200 bg-white p-2'>
          <div className='row'>
            <Link href={`${APP_ADMIN_PATH}/dashboard`} className='col text-center'>
              <KTSVG
                path={`/media/icons/general/gen001.svg`}
                className={`svg-icon-${path?.startsWith(`${APP_ADMIN_PATH}/dashboard`) ? 'primary' : 'gray-300'}`}
                svgClassName='w-30px h-30px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_ADMIN_PATH}/dashboard`) ? 'primary' : 'dark'}`}>
                Home
              </div>
            </Link>
            <Link href={`${APP_ADMIN_PATH}/wallet`} className='col text-center'>
              <KTSVG
                path={`/media/icons/general/gen026.svg`}
                className={`svg-icon-${path?.startsWith(`${APP_ADMIN_PATH}/wallet`) ? 'primary' : 'gray-400'}`}
                svgClassName='w-35px h-35px'
                style={{ marginBottom: -2.5, marginTop: -2.5 }}
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_ADMIN_PATH}/wallet`) ? 'primary' : 'dark'}`}>
                Wallet
              </div>
            </Link>
            <Link href={`${APP_ADMIN_PATH}/submission`} className='col text-center'>
              <KTSVG
                path={`/media/icons/general/gen043.svg`}
                className={`svg-icon-${path?.startsWith(`${APP_ADMIN_PATH}/submission`) ? 'primary' : 'gray-400'}`}
                svgClassName='w-30px h-30px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_ADMIN_PATH}/submission`) ? 'primary' : 'dark'}`}>
                Submission
              </div>
            </Link>
            <Link href={`${APP_ADMIN_PATH}/notification`} className='col text-center'>
              <KTSVG
                path={`/media/icons/general/gen007.svg`}
                className={`svg-icon-${path?.startsWith(`${APP_ADMIN_PATH}/notification`) ? 'primary' : 'gray-400'}`}
                svgClassName='w-30px h-30px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_ADMIN_PATH}/notification`) ? 'primary' : 'dark'}`}>
                Notification
              </div>
            </Link>
            <Link href={`${APP_ADMIN_PATH}/profile`} className='col text-center'>
              <KTSVG
                path={`/media/icons/communication/com006.svg`}
                className={`svg-icon-${path?.startsWith(`${APP_ADMIN_PATH}/profile`) ? 'primary' : 'gray-400'}`}
                svgClassName='w-30px h-30px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_ADMIN_PATH}/profile`) ? 'primary' : 'dark'}`}>
                Profile
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
