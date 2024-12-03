import { APP_TRAINER_PATH, KTSVG } from '@helpers'
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
            <Link href={`${APP_TRAINER_PATH}/issuer`} className='col text-center'>
              <KTSVG
                path={
                  path?.startsWith(`${APP_TRAINER_PATH}/issuer`)
                    ? `/media/icons/custom/issuer-active.svg`
                    : `/media/icons/custom/issuer.svg`
                }
                svgClassName='w-30px h-30px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_TRAINER_PATH}/issuer`) ? 'primary' : 'dark'}`}>
                Issuer
              </div>
            </Link>
            <Link href={`${APP_TRAINER_PATH}/verifier`} className='col text-center'>
              <KTSVG
                path={
                  path?.startsWith(`${APP_TRAINER_PATH}/verifier`)
                    ? `/media/icons/custom/carbon-white-paper-active.svg`
                    : `/media/icons/custom/carbon-white-paper.svg`
                }
                svgClassName='w-35px h-35px'
                style={{ marginBottom: -2.5, marginTop: -2.5 }}
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`${APP_TRAINER_PATH}/verifier`) ? 'primary' : 'dark'}`}>
                Verifier
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
