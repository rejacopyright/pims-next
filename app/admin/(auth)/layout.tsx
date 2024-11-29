// import { GoogleOAuthProvider } from '@react-oauth/google'
import { Footer } from '@components/layouts/Footer'
import { APP_NAME } from '@helpers'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const AuthPage: FC<any> = ({ children }) => {
  return (
    // <GoogleOAuthProvider clientId='519918356732-v4frl4sd9qim1fv6f7mmk5an2l9258pu.apps.googleusercontent.com'>
    <div className='d-flex flex-column vh-100 justify-content-center bg-white'>
      <div className='row m-0 d-none d-lg-flex'>
        <div className='col-12 text-center text-lg-start p-0'>
          <div className='d-flex align-items-center justify-content-between auth-header'>
            <Link href='/' className='d-flex flex-center gap-5px'>
              <Image
                src='/logo/logo-circle.png'
                alt='pims-logo'
                width={30}
                height={30}
                priority
                className='mb-5px'
              />
              <div className='fw-bolder fs-20px'>{APP_NAME}</div>
            </Link>
            {/* <div className='d-flex gap-3'>
              <Link
                href={`${APP_ADMIN_PATH}/register`}
                className='btn btn-36 btn-outline btn-outline-secondary text-dark'>
                Registrasi
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      <div className='d-flex flex-column flex-column-fluid flex-center bg-white'>
        <div className='d-flex flex-column m-auto'>{children}</div>
      </div>

      <Footer />
    </div>
    // </GoogleOAuthProvider>
  )
}

export default AuthPage
