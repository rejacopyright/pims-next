import { APP_USER_PATH, KTSVG, translate } from '@helpers'
import clsx from 'clsx'
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
            <Link href={`${APP_USER_PATH}/gallery`} className='col text-center'>
              <KTSVG
                path={`/media/icons/custom/icon_1${path?.startsWith(`${APP_USER_PATH}/gallery`) ? '_active' : ''}.svg`}
                svgClassName='w-35px h-35px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_USER_PATH}/gallery`) ? 'primary' : 'dark'} mt-2`}>
                {translate('MENU.MOBILE.GALLERY')}
              </div>
            </Link>
            <Link href={`${APP_USER_PATH}/submission`} className='col text-center'>
              <KTSVG
                path={`/media/icons/custom/icon_2${path?.startsWith(`${APP_USER_PATH}/submission`) ? '_active' : ''}.svg`}
                svgClassName='w-35px h-35px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_USER_PATH}/submission`) ? 'primary' : 'dark'} mt-2`}>
                {translate('MENU.MOBILE.SUBMIT_OPEN_BADGE')}
              </div>
            </Link>
            <Link
              href={`${APP_USER_PATH}/wallet`}
              className='col justify-content-center align-items-center d-flex'
              style={{ top: -15 }}>
              <div
                className={clsx(
                  'd-flex flex-wrap justify-content-center align-items-center text-center border w-60px h-60px rounded-circle',
                  {
                    'border-black bg-gray-300': !path?.startsWith(`${APP_USER_PATH}/wallet`),
                    'border-primary bg-primary': path?.startsWith(`${APP_USER_PATH}/wallet`),
                  }
                )}>
                <i
                  className={clsx(`fa-solid fa-wallet display-5`, {
                    'text-white opacity-100': path?.startsWith(`${APP_USER_PATH}/wallet`),
                    'text-dark opacity-50': !path?.startsWith(`${APP_USER_PATH}/wallet`),
                  })}
                />
                <span
                  className={`fs-9 lh-sm mt-n6 text-${path?.startsWith(`${APP_USER_PATH}/wallet`) ? 'white' : 'dark'}`}>
                  My Wallet
                </span>
              </div>
            </Link>
            <Link href={`${APP_USER_PATH}/issue`} className='col text-center'>
              <KTSVG
                path={`/media/icons/custom/icon_3${path?.startsWith(`${APP_USER_PATH}/issue`) ? '_active' : ''}.svg`}
                svgClassName='w-35px h-35px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_USER_PATH}/issue`) ? 'primary' : 'dark'}`}>
                {translate('MENU.MOBILE.BADGE_ISSUANCE')}
              </div>
            </Link>
            <Link href={`${APP_USER_PATH}/info`} className='col text-center'>
              <KTSVG
                path={`/media/icons/custom/icon_4${path?.startsWith(`${APP_USER_PATH}/info`) ? '_active' : ''}.svg`}
                svgClassName='w-35px h-35px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_USER_PATH}/info`) ? 'primary' : 'dark'}`}>
                {translate('MENU.MOBILE.INFORMATION_USE')}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
