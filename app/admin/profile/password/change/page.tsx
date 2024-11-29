'use client'

import { changePassword } from '@api/profile'
import { Sticky } from '@components/cards/Sticky'
import { ToastWhite } from '@components/toast'
import { APP_HOME_PATH, configClass, KTSVG } from '@helpers'
import { CustomLogo, PageTitle } from '@metronic/layout/core'
import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import * as Yup from 'yup'

const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
const lowerCaseRegex = /[a-z]/
const upperCaseRegex = /[A-Z]/
const numberRegex = /[0-9]/
const minCharRegex = /[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}/

const passwordSchema: any = Yup.object().shape({
  // password_current: Yup.string()
  //   .matches(specialCharRegex, '특수기호 1개 이상')
  //   .matches(lowerCaseRegex, '대소문자 포함')
  //   .matches(upperCaseRegex, '대소문자 포함')
  //   .matches(numberRegex, '숫자 1개 이상')
  //   .min(8, () => '8자 이상')
  //   .required('비밀번호가 필요합니다'),
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

const Index: FC<any> = () => {
  const router = useRouter()
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)

  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [_showValidation, setShowValidation] = useState<boolean>(false)

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const onPasswordChange = (e: any) => {
    setShowValidation(Boolean(e))
    passMessage?.map((message: any) => {
      const regex = message.regex
      if (regex.test(e)) {
        return (message.status = true)
      } else {
        return (message.status = false)
      }
    })
  }

  const handleOnSubmit = (values: any) => {
    setLoading(true)
    const params: any = {
      user_id: user?.user_id,
      user_pswd: values?.password_current,
      user_new_pswd: values?.password_confirm,
    }
    changePassword(params)
      .then(({ data: _ }) => {
        setStatus(null)
        router.replace('/profile/password/change/success', { scroll: false })
      })
      .catch(({ response }: any) => {
        const message: any = response?.data?.message?.reason
        ToastWhite(
          <div className='d-flex p-24px gap-16px'>
            <KTSVG
              path='/media/icons/custom/check_circle.svg'
              width={26}
              height={26}
              className='mt-3px'
            />
            <div className='fw-bolder text-dark fs-22px'>{message}</div>
          </div>,
          { autoClose: 1000 }
        )
        setStatus(message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <PageTitle description=''>비밀번호 변경</PageTitle>
      <CustomLogo>
        <Link
          href='/profile'
          scroll={false}
          className='d-flex align-items-center gap-8px text-dark'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '30px', height: '30px', border: '1px solid #F7AE86' }}>
            <i className='fas fa-arrow-left text-orange' />
          </div>
          <div className='fs-18px fw-700 lh-1 ls-n1'>비밀번호 변경</div>
        </Link>
      </CustomLogo>
      <Sticky className='d-none d-lg-flex align-items-center justify-content-between sticky-top-style py-24px bg-body'>
        <Link href={APP_HOME_PATH} className='d-flex align-items-center gap-8px text-dark'>
          <i className='fas fa-arrow-left text-dark fs-22px mb-3px' />
          <div className='fs-22px fw-bolder ls-n1'>비밀번호 변경</div>
        </Link>
        <div className='d-flex align-items-center gap-8px text-dark'>
          <KTSVG path='/media/icons/custom/home.svg' width={16} height={16} />
          <i className='las la-angle-right text-dark fs-16px text-gray-400' />
          <Link href='/profile' scroll={false} className='fs-14px fw-bolder text-gray-800'>
            마이페이지
          </Link>
          <i className='las la-angle-right text-dark fs-16px text-gray-400' />
          <div className='fs-14px fw-bolder text-primary'>비밀번호 변경</div>
        </div>
      </Sticky>
      <Formik
        initialValues={{ password: '', password_confirm: '', password_current: '' }}
        validationSchema={passwordSchema}
        validateOnChange
        validateOnMount
        enableReinitialize
        onSubmit={handleOnSubmit}>
        {(formik: any) => {
          const { errors, isValid, touched }: any = formik || {}
          return (
            <Form>
              <div className='row cp-margin'>
                <div className='col-12 '>
                  <div className='text-center mb-36px'>
                    <div className='fs-20px fw-bolder text-nowrap ls-2px'>
                      변경할 비밀번호를 입력하세요.
                    </div>
                  </div>
                  <div className='w-md-360px px-0 mx-auto position-relative overflow-hidden'>
                    <div className='justify-content-center'>
                      <div className='mb-24px'>
                        <div className={configClass?.label}>기존 비밀번호</div>
                        <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden'>
                          <Field
                            type={passwordShown ? 'text' : 'password'}
                            placeholder='비밀번호를 입력해 주세요.'
                            autoComplete='off'
                            name='password_current'
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
                        {touched?.password_current && errors?.password_current ? (
                          <div className='form-error'>{errors?.password_current || ''}</div>
                        ) : (
                          status !== null && <div className='form-error'>{status || '-'}</div>
                        )}
                      </div>
                      <div className='mb-24px'>
                        <div className={configClass?.label}>새 비밀번호</div>
                        <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden'>
                          <Field
                            type={passwordShown ? 'text' : 'password'}
                            placeholder='새 비밀번호를 입력해 주세요.'
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
                      <div className='p-15px mb-24px radius-5' style={{ background: '#f3f5f9' }}>
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
                          {!loading ? (
                            <span className='indicator-label'>변경하기</span>
                          ) : (
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
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default Index
