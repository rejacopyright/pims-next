'use client'
import { APP_ADMIN_PATH, APP_EMAIL } from '@helpers'
import { useLocation } from '@hooks'
import { PageTitle } from '@metronic/layout/core'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Index = () => {
  const router = useRouter()
  const { params } = useLocation()
  const { email } = params || {}

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
              <div className='text-dark fw-700 fs-20px mb-16px'>
                이메일로 임시 비밀번호를 발송했습니다.
              </div>
              <div className='fw-400 fs-15px'>
                <div className='text-dark lh-28px'>임시 비밀번호로 로그인 하신 후</div>
                <div className='d-flex flex-center gap-5px text-center'>
                  <div className='' style={{ color: '#41AE49' }}>
                    마이페이지 {'>'} 회원정보수정
                  </div>
                  <div className=''>에서 비밀번호를 변경해 주세요.</div>
                </div>
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
