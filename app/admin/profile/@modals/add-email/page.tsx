'use client'
import { checkEmail, getOTP, verifyOTP } from '@api/auth'
import { addEmail, me } from '@api/profile'
import { InputDebounceBasic } from '@components/form'
import { configClass } from '@helpers'
import { setUser } from '@redux'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'
import * as Yup from 'yup'

const validationSchema: any = Yup.object().shape({
  user_eml: Yup.string()
    .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), '이메일 형식이 맞지 않습니다.')
    .required('추가할 이메일을 입력해 주세요.'),
  authentication_code: Yup.string().required('인증코드가 필요합니다'),
})

const Index: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const counter: number = 180
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)

  const [customError, setCustomError] = useState<any>({})
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoadingOtp, setLoadingOtp] = useState<boolean>(false)
  const [isLoadingVerifyCode, setLoadingVerifyCode] = useState<boolean>(false)
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

  const [countDownInSecond, setCountDownInSecond] = useState<number>(counter)

  useEffect(() => {
    let countDownInterval: any = undefined
    if (isVerified) {
      countDownInterval = setInterval(() => {
        setCountDownInSecond((prev: number) => (prev === 0 ? prev : prev - 1))
      }, 1000)
    }
    return () => {
      clearInterval(countDownInterval)
      setCountDownInSecond(counter)
    }
  }, [isVerified])

  useEffect(() => {
    return () => {
      setCustomError({})
      setIsVerified(false)
      setIsAuthenticated(false)
      setCountDownInSecond(counter)
    }
  }, [])
  const humanizeCountDown: any = moment.utc(countDownInSecond * 1000).format('mm:ss')

  const anyCustomError: any = Object.values(customError || {})?.find((f: any) => f)

  const sendVerification: any = async (values) => {
    try {
      setCustomError((prev: any) => ({ ...prev, email: undefined }))
      setLoadingOtp(true)
      const res = await getOTP({ eml_to: values.user_eml, eml_se: 'B' })
      const { message } = res?.data

      if (message?.reason === 'success') {
        setIsVerified(true)
        setLoadingOtp(false)
      }
    } catch (e: any) {
      const message: any =
        e?.response?.data?.message?.reason || e?.message || 'An unexpected error occurred.'
      setCustomError((prev: any) => ({
        ...prev,
        email: message,
      }))
      setLoadingOtp(false)
    }
  }

  const handleOnSubmit = async (values: any) => {
    setLoadingSubmit(true)
    addEmail({ user_id: user?.user_id, user_eml: values?.user_eml })
      .then(async ({ data }: any) => {
        if (data?.message?.reason === 'success') {
          const myProfile: any = (await me(user?.user_id))?.data?.message
          const user_info: any = myProfile?.user_info || {}
          const combinedUser: any = {
            ...(user_info?.user_info || {}),
            mails: user_info?.user_mail_infos || {},
          }
          setUser(combinedUser)
          setIsVerified(false)
          setIsAuthenticated(false)
        }
      })
      .catch(() => '')
      .finally(() => setLoadingSubmit(false))
  }

  const closeModal: any = () => router.replace('/profile', { scroll: false })

  return (
    <Modal
      centered
      dialogClassName='modal-md w-lg-400px'
      contentClassName='radius-15 shadow-lg'
      show={pathname?.endsWith('add-email')}
      onHide={closeModal}>
      <Formik
        initialValues={{ user_eml: '' }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleOnSubmit}>
        {(formik: any) => {
          const { errors, isValid, setFieldValue, values, setFieldError }: any = formik || {}
          return (
            <Form>
              <Modal.Body className='p-24px'>
                <div className='text-center fw-bolder fs-20px mb-24px'>이메일 추가하기</div>
                <div className='position-absolute top-0 end-0'>
                  <div
                    onClick={closeModal}
                    className='btn p-0 mt-24px me-24px'
                    style={{ width: '24px', height: '24px' }}>
                    <i className='las la-times p-0 text-gray-800 fs-18px' />
                  </div>
                </div>
                <div className='row'>
                  {/* Email Field */}
                  <div className='col-12 mb-24px'>
                    <div className={configClass?.label}>이메일</div>
                    <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 h-40px'>
                      <InputDebounceBasic
                        type='text'
                        className='col'
                        formClass='form-control text-dark fw-normal h-100 border-0 bg-white'
                        autoFocus
                        delay={250}
                        placeholder='이메일을 입력해 주세요.'
                        onChange={(e: any) => {
                          setFieldValue('user_eml', e)
                          setFieldError('user_eml', '')
                          setIsAuthenticated(false)
                          setIsVerified(false)
                          if (e) {
                            checkEmail(e)
                              .then(() =>
                                setCustomError((prev: any) => ({ ...prev, email: undefined }))
                              )
                              .catch(({ response: { data } }: any) => {
                                setCustomError((prev: any) => ({
                                  ...prev,
                                  email: data?.message?.reason,
                                }))
                              })
                          } else {
                            setCustomError((prev: any) => ({ ...prev, email: undefined }))
                          }
                        }}
                      />
                      {countDownInSecond > 0 && !isAuthenticated && (
                        <button
                          type='button'
                          disabled={
                            anyCustomError || errors?.user_eml || isLoadingOtp || isVerified
                          }
                          className={`btn ${isVerified && !errors?.user_eml ? 'bg-gray-400' : 'btn-white'} btn-flex fs-14px p-0 h-100 text-dark fw-bolder px-16px ${!isAuthenticated ? 'border-start' : ''} `}
                          onClick={() => {
                            setFieldValue('authentication_code', '')
                            sendVerification(values)
                          }}>
                          {isLoadingOtp ? (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                              Waiting...
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          ) : isVerified && !errors?.user_eml ? (
                            <div className=''>{humanizeCountDown}</div>
                          ) : (
                            <span className=''>인증코드 발송</span>
                          )}
                        </button>
                      )}
                      {isAuthenticated && (
                        <div className='h-100 d-flex flex-center w-50px'>
                          <i className='las la-check text-primary fs-20px' />
                        </div>
                      )}
                    </div>
                    {customError?.email ? (
                      <div className='form-error'>{customError?.email || ''}</div>
                    ) : (
                      errors?.user_eml && <div className='form-error'>{errors?.user_eml || ''}</div>
                    )}
                    {!isLoadingOtp && !customError?.email && !errors?.user_eml && (
                      <div className='d-flex align-items-center mt-6px gap-3px'>
                        <div className='fs-14px fw-bold'>이메일이 오지 않았나요?</div>
                        <div
                          className='cursor-pointer fw-bolder text-primary'
                          onClick={() => setLoadingOtp(true)}>
                          재전송
                        </div>
                      </div>
                    )}
                  </div>
                  {/* OTP Field */}
                  {isVerified && !errors?.user_eml && (
                    <div className='col-12 mb-24px'>
                      <div className={configClass?.label}>인증코드</div>
                      <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 h-40px overflow-hidden'>
                        <Field
                          type='text'
                          placeholder='인증코드를 입력해주세요.'
                          name='authentication_code'
                          className={`${configClass?.form} border-0 text-dark fw-normal h-100 border-0 bg-white`}
                        />
                        {isAuthenticated ? (
                          <div className='h-100 d-flex flex-center w-50px'>
                            <i className='las la-check text-primary fs-20px' />
                          </div>
                        ) : (
                          <button
                            type='button'
                            disabled={
                              errors?.authentication_code ||
                              values?.authentication_code?.length <= 4
                            }
                            className='btn btn-primary btn-flex fs-14px h-40px p-0 h-100 fw-bolder px-16px radius-0'
                            onClick={async () => {
                              try {
                                setCustomError((prev: any) => ({ ...prev, otp: undefined }))
                                setLoadingVerifyCode(true)
                                const res = await verifyOTP({
                                  eml_to: values?.user_eml,
                                  eml_cert_cd: values?.authentication_code,
                                  eml_se: 'B',
                                })
                                const { message } = res?.data
                                if (message?.reason === 'success') {
                                  setIsAuthenticated(true)
                                  setLoadingVerifyCode(false)
                                }
                              } catch (e: any) {
                                const message: any =
                                  e?.response?.data?.message?.reason ||
                                  e?.message ||
                                  'An unexpected error occurred.'
                                setCustomError((prev: any) => ({
                                  ...prev,
                                  otp: message,
                                }))
                                setLoadingVerifyCode(false)
                              }
                            }}>
                            {isLoadingVerifyCode ? (
                              <span className='indicator-progress' style={{ display: 'block' }}>
                                Waiting...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                              </span>
                            ) : (
                              <div className=''>인증</div>
                            )}
                          </button>
                        )}
                      </div>
                      {customError?.otp ? (
                        <div className='form-error'>{customError?.otp || ''}</div>
                      ) : (
                        errors?.authentication_code && (
                          <div className='form-error'>{errors?.authentication_code || ''}</div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <div className='d-flex gap-8px'>
                  <div className='col'>
                    <div
                      className='btn btn-flex w-100 btn-white border border-gray-300 text-dark fw-bolder flex-center px-12px'
                      onClick={closeModal}>
                      닫기
                    </div>
                  </div>
                  <div className='col'>
                    <button
                      type='submit'
                      disabled={!isValid || loadingSubmit || anyCustomError || !isAuthenticated}
                      className={`btn btn-flex flex-center w-100 ${isAuthenticated ? 'btn-primary' : 'btn-disabled'}  text-nowrap`}>
                      {loadingSubmit ? (
                        <span className='indicator-progress' style={{ display: 'block' }}>
                          Waiting...
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      ) : (
                        <span>등록하기</span>
                      )}
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default Index
