'use client'
import { verifyOTP } from '@api/auth'
import InputNumber from '@components/form/InputNumber'
import { APP_EMAIL, configClass } from '@helpers'
import { useLocation } from '@hooks'
import { PageTitle } from '@metronic/layout/core'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

const Index: FC<any> = () => {
  const router = useRouter()
  const { params } = useLocation()
  const { email } = params || {}

  const [otp, setOtp] = useState('')
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleOnSubmit = async () => {
    setLoading(true)
    try {
      const res = await verifyOTP({ eml_to: email, eml_se: 'B', eml_cert_cd: otp })
      const { message } = res?.data
      if (message?.reason === 'success') {
        setStatus('')
        setError(false)
        setLoading(false)
        router.push(`/register/password?email=${email}`, { scroll: false })
      }
    } catch (e: any) {
      const message: any = e?.response?.data?.message?.reason || e?.message || ''
      setError(true)
      setStatus(message)
      setLoading(false)
    }
  }
  return (
    <>
      <PageTitle description=''>포텐톡 | 회원가입</PageTitle>
      <div className='' style={{ width: '85vw' }}>
        <div className='row'>
          <div className='col-12'>
            <div className='text-center mb-36px'>
              <img
                alt='Logo'
                src='/logo-circle.png'
                className='mb-36px d-block d-lg-none mx-auto'
                style={{ width: '168px', height: '34px' }}
              />
              <div className='fs-20px fw-bolder text-nowrap'>
                입력하신 이메일 주소로 인증코드를 보냈습니다.
              </div>
              <div className='fs-20px fw-bolder text-nowrap'>
                24시간 이내 인증코드를 입력해 주세요.
              </div>
              <div className='d-inline-flex flex-center gap-16px bg-light-primary py-8px px-16px radius-5 mt-16px'>
                <i className='las la-envelope text-primary fs-1 lh-20px' />
                <span className='text-dark fw-bold fs-16px lh-20px'>{email || APP_EMAIL}</span>
              </div>
            </div>
            <div className='w-md-360px px-md-0 px-5 mx-auto position-relative'>
              <div className={configClass?.label}>인증코드</div>
              <div
                className='input-group input-group-no-focuss input-group-solid d-flex align-items-center border border-gray-300 h-40px overflow-hidden'
                style={{ boxSizing: 'border-box' }}>
                <div className='col'>
                  <InputNumber
                    placeholder='6자리'
                    formClass={`${configClass?.form} border-0 bg-white`}
                    // onFocus={(e: any) => e?.target?.classList?.add('border-primary')}
                    // onBlur={(e: any) => e?.target?.classList?.remove('border-primary')}
                    nullable
                    allowZeroFirst
                    onChange={(e: any) => {
                      setIsValid(e !== '')
                      setOtp(e)
                    }}
                  />
                </div>
                <div className='border border-secondary h-30px' />
                <button
                  type='button'
                  className='btn btn-sm py-2 px-5 fw-bolder'
                  onClick={() =>
                    router.replace(`/register/otp/resend?email=${email}`, { scroll: false })
                  }>
                  재전송
                </button>
              </div>
              {isError && status && <div className='form-error'>{status}</div>}
              <div className='d-flex bg-light-primary py-16px px-24px radius-5 gap-16px my-24px'>
                <i className='las la-info-circle text-primary fs-2x' />
                <div className='text-start'>
                  <div className='text-dark fw-bolder fs-16px mb-2'>이메일이 오지 않았나요?</div>
                  <div className='text-dark fs-14px'>
                    이메일이 오지 않았다면 스팸 혹은 프로모션 메일함을 확인해 보세요.
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className={clsx('btn w-100 fw-bolder fs-6 mb-16px h-40px', {
                  'btn-primary': isValid,
                  'bg-disabled text-white cursor-na': !isValid,
                })}
                onClick={() => (isValid ? handleOnSubmit() : '')}
                // disabled={!isValid}
              >
                {!loading && <span className='indicator-label'>계속</span>}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Waiting...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
              <button
                type='button'
                className='btn btn-outline btn-outline-light border border-secondary text-dark fw-bolder fs-6 w-100 h-40px'
                onClick={() => router.push(`/register?email=${email}`)}>
                이전
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
