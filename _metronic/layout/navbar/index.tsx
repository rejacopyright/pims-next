import { KTSVG, translate } from '@helpers'
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
            <Link href='/gallery' className='col text-center'>
              <KTSVG
                path={`/media/icons/custom/icon_1${path?.startsWith('/gallery') ? '_active' : ''}.svg`}
                svgClassName='w-35px h-35px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith('/gallery') ? 'primary' : 'dark'} mt-2`}>
                {translate('MENU.MOBILE.GALLERY')}
              </div>
            </Link>
            <Link href='/submission' className='col text-center'>
              <KTSVG
                path={`/media/icons/custom/icon_2${path?.startsWith('/submission') ? '_active' : ''}.svg`}
                svgClassName='w-35px h-35px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith('/submission') ? 'primary' : 'dark'} mt-2`}>
                {translate('MENU.MOBILE.SUBMIT_OPEN_BADGE')}
              </div>
            </Link>
            <Link
              href='/wallet'
              className='col justify-content-center align-items-center d-flex'
              style={{ top: -15 }}>
              <div
                className={clsx(
                  'd-flex flex-wrap justify-content-center align-items-center text-center border w-60px h-60px rounded-circle',
                  {
                    'border-black bg-gray-300': !path?.startsWith('/wallet'),
                    'border-primary bg-primary': path?.startsWith('/wallet'),
                  }
                )}>
                <i
                  className={clsx(`fa-solid fa-wallet display-5`, {
                    'text-white opacity-100': path?.startsWith('/wallet'),
                    'text-dark opacity-50': !path?.startsWith('/wallet'),
                  })}
                />
                <span
                  className={`fs-9 lh-sm mt-n6 text-${path?.startsWith('/wallet') ? 'white' : 'dark'}`}>
                  My Wallet
                </span>
              </div>
            </Link>
            <Link href='/issue' className='col text-center'>
              <KTSVG
                path={`/media/icons/custom/icon_3${path?.startsWith('/issue') ? '_active' : ''}.svg`}
                svgClassName='w-35px h-35px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith('/issue') ? 'primary' : 'dark'}`}>
                {translate('MENU.MOBILE.BADGE_ISSUANCE')}
              </div>
            </Link>
            <Link href='/info' className='col text-center'>
              <KTSVG
                path={`/media/icons/custom/icon_4${path?.startsWith('/info') ? '_active' : ''}.svg`}
                svgClassName='w-35px h-35px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith('/info') ? 'primary' : 'dark'}`}>
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
