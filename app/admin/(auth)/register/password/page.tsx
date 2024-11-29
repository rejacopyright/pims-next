'use client'
import { register } from '@api/auth'
import { APP_EMAIL, configClass } from '@helpers'
import { useLocation } from '@hooks'
import { PageTitle } from '@metronic/layout/core'
import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'

const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
const lowerCaseRegex = /[a-z]/
const upperCaseRegex = /[A-Z]/
const numberRegex = /[0-9]/
const minCharRegex = /[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}/

const loginSchema: any = Yup.object().shape({
  password: Yup.string()
    .matches(specialCharRegex, '특수기호 1개 이상')
    .matches(lowerCaseRegex, '대소문자 포함')
    .matches(upperCaseRegex, '대소문자 포함')
    .matches(numberRegex, '숫자 1개 이상')
    .min(8, () => '8자 이상')
    .required('비밀번호가 필요합니다'),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null as any], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 반복이 필요합니다'),
})

const passMessage = [
  { id: 1, regex: minCharRegex, message: `8자 이상`, status: false },
  { id: 2, regex: /[0-9]/, message: '숫자 1개 이상', status: false },
  {
    id: 3,
    regex: /(?=.[a-z])(?=.*[A-Z])/,
    message: '대소문자 포함',
    status: false,
  },
  {
    id: 4,
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    message: '특수기호 1개 이상',
    status: false,
  },
]

const Index = () => {
  const router = useRouter()
  const { params } = useLocation()
  const { email } = params || {}

  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [passwordShown, setPasswordShown] = useState<boolean>(false)

  const handleOnSubmit = async (values) => {
    setLoading(true)
    try {
      const res = await register({
        user_pswd: values.password,
        user_eml: email,
        user_trms_agre_yn: 'Y',
      })
      const { message } = res?.data
      if (message?.reason === 'success') {
        setStatus(null)
        setLoading(false)
        router.push(`/register/complete?email=${email}`, { scroll: false })
      }
    } catch (e: any) {
      const message: any = e?.response?.data?.message?.reason || e?.message || ''
      setStatus(message)
      setLoading(false)
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const onPasswordChange = (e: any) => {
    passMessage?.map((message: any) => {
      const regex = message.regex
      if (regex.test(e)) {
        return (message.status = true)
      } else {
        return (message.status = false)
      }
    })
  }

  return (
    <>
      <PageTitle description=''>포텐톡 | 회원가입</PageTitle>
      <Formik
        initialValues={{ password: '', password_confirm: '' }}
        validationSchema={loginSchema}
        validateOnChange
        validateOnMount
        enableReinitialize
        onSubmit={handleOnSubmit}>
        {(formik: any) => {
          const { errors, isValid, touched }: any = formik || {}
          return (
            <div style={{ width: '85vw' }}>
              {/* <div className='fixed-top pt-15 '>
              <div className='d-flex flex-center mb-5'>
                <img alt='Logo' src={toAbsoluteUrl('/logo-circle.png')} className='h-25px mx-2' />
                <div className='text-primary fw-bolder fs-3 lh-1 text-nowrap'>{APP_NAME}</div>
              </div>
            </div> */}
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
                      로그인 시 사용할 비밀번호를 입력해 주세요.
                    </div>
                    <div className='d-inline-flex flex-center gap-16px bg-light-primary py-8px px-16px radius-5 mt-16px'>
                      <i className='las la-envelope text-primary fs-1 lh-20px' />
                      <span className='text-dark fw-bold fs-16px lh-20px'>
                        {email || APP_EMAIL}
                      </span>
                    </div>
                  </div>
                  <div
                    className='w-md-360px px-md-0 px-5 mx-auto position-relative overflow-hidden'
                    style={{ backgroundColor: 'rgba(255,255,255,.85)' }}>
                    <Form className='justify-content-center' noValidate id='form-auth'>
                      <div className='mb-24px'>
                        <div className={configClass?.label}>비밀번호</div>
                        <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden'>
                          <Field
                            type={passwordShown ? 'text' : 'password'}
                            placeholder='비밀번호를 입력해 주세요.'
                            autoComplete='off'
                            name='password'
                            className={`bg-white border-0 ${configClass?.form}`}
                            onChangeCapture={({ target }: any) => {
                              const { value } = target
                              const passwd = `${value}`
                              onPasswordChange(passwd)
                            }}
                          />
                          <div className='py-2 px-3' onClick={togglePassword}>
                            {passwordShown && <i className='las la-eye fs-1' />}
                            {!passwordShown && <i className='las la-eye-slash fs-1' />}
                          </div>
                        </div>
                        {touched?.password && errors?.password ? (
                          <div className='form-error'>{errors?.password || ''}</div>
                        ) : (
                          status !== null && <div className='form-error'>{status || '-'}</div>
                        )}
                      </div>
                      <div className='mb-24px'>
                        <div className={configClass?.label}>비밀번호 확인</div>
                        <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden'>
                          <Field
                            type={passwordShown ? 'text' : 'password'}
                            placeholder='비밀번호를 입력해 주세요.'
                            autoComplete='off'
                            name='password_confirm'
                            className={`bg-white border-0 ${configClass?.form}`}
                          />
                          <div className='py-2 px-3' onClick={togglePassword}>
                            {passwordShown && <i className='las la-eye fs-1' />}
                            {!passwordShown && <i className='las la-eye-slash fs-1' />}
                          </div>
                        </div>
                        {touched?.password_confirm && errors?.password_confirm && (
                          <div className='form-error'>{errors?.password_confirm || ''}</div>
                        )}
                      </div>
                      <div className='p-15px mb-24px'>
                        <div className='d-flex align-items-center gap-2 mb-16px'>
                          <i className='las la-info-circle fs-1 text-dark ms-n1' />
                          <div className='fw-bolder fs-16px'>안전한 비밀번호를 설정해 주세요!</div>
                        </div>
                        {passMessage?.map(({ message, status }: any, index: number) => (
                          <p
                            className={clsx('my-8px fw-bold', {
                              'text-success': status,
                              'text-gray-400': !status,
                            })}
                            key={index}>
                            <i
                              className={clsx('las la-check fs-16px', {
                                'text-success': status,
                                'text-gray-400': !status,
                              })}
                            />
                            <span className='ms-8px'>{message}</span>
                          </p>
                        ))}
                      </div>
                      <div className='text-center'>
                        <button
                          type={isValid ? 'submit' : 'button'}
                          className={clsx('btn w-100 fw-bolder fs-14px h-40px lh-1', {
                            'btn-primary': isValid,
                            'bg-disabled text-gray-600 cursor-na': !isValid,
                          })}
                          // disabled={!isValid}
                        >
                          {!loading && <span className='indicator-label'>회원가입 완료</span>}
                          {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                              Waiting...
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Formik>
    </>
  )
}

export default Index
