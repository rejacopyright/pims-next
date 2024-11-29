'use client'
import { APP_ADMIN_PATH, APP_EMAIL } from '@helpers'
import { useLocation } from '@hooks'
import { PageTitle } from '@metronic/layout/core'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Index = () => {
  const router = useRouter()
  const { params } = useLocation()
  const { email } = params || { email: APP_EMAIL }

  const [loading, setLoading] = useState<boolean>(false)

  const handleOnSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.replace(`${APP_ADMIN_PATH}/login?email=${email}`, { scroll: false })
    }, 500)
  }
  return (
    <>
      <PageTitle description=''>포텐톡 | 회원가입</PageTitle>
      <div style={{ width: '85vw' }}>
        <div className='row'>
          <div className='col-12'>
            <div className='text-center mb-36px'>
              <img
                alt='Logo'
                src='/logo-circle.png'
                className='mb-36px d-block d-lg-none mx-auto'
                style={{ width: '168px', height: '34px' }}
              />
              <div className='text-dark fw-bolder fs-20px'>회원가입을 완료했습니다.</div>
              <div className='text-dark fw-bolder fs-20px'>
                아래 이메일로 로그인 후 포텐톡을 이용하세요.
              </div>
              {email && (
                <div className='d-inline-flex flex-center gap-16px bg-light-primary py-8px px-16px radius-5 mt-16px'>
                  <i className='las la-envelope text-primary fs-1 lh-20px' />
                  <span className='text-dark fw-bold fs-16px lh-20px'>{email || APP_EMAIL}</span>
                </div>
              )}
            </div>
            <div
              className='w-md-360px px-md-0 px-5 mx-auto overflow-hidden'
              style={{ backgroundColor: 'rgba(255,255,255,.85)' }}>
              <div className='text-center pb-10'>
                <div className='d-flex gap-3'>
                  <button
                    type='submit'
                    className='btn btn-lg btn-primary w-100'
                    onClick={handleOnSubmit}
                    disabled={loading}>
                    {!loading && <span className='indicator-label'>로그인</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Waiting...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
