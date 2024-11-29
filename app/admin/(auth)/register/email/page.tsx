'use client'
import { checkEmail, getOTP } from '@api/auth'
import { InputDebounce } from '@components/form'
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
import { PageTitle } from '@metronic/layout/core'
import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import pick from 'lodash/pick'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), '이메일 형식이 맞지 않습니다.')
    .required('사용 할 이메일을 입력해 주세요.'),
  // tc: Yup.mixed().test('tc', 'TC is required', (e: boolean) => e),
  // terms: Yup.mixed().test('terms', 'Terms of service is required', (e: boolean) => e),
  // policy: Yup.mixed().test('policy', 'Policy is required', (e: boolean) => e),
  // ads: Yup.mixed().test('ads', 'Advertising is required', (e: boolean) => e),
})

const Index = ({ searchParams }) => {
  const router: any = useRouter()
  const { email = '' } = searchParams

  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [customError, setCustomError] = useState<any>({})

  const anyCustomError: any = Object.values(customError || {})?.find((f: any) => f)
  const agreeChildren: any = [
    { name: 'terms', required: true, label: '[필수] 서비스 이용 약관' },
    { name: 'policy', required: true, label: '[필수] 개인정보 처리 방침' },
    { name: 'ads', required: false, label: '[선택] 광고, 마케팅 동의' },
  ]

  const handleOnSubmit = async (values: any) => {
    setLoading(true)
    try {
      const res = await getOTP({ eml_to: values?.email, eml_se: 'B' })
      const { message } = res?.data
      if (message?.reason === 'success') {
        setStatus(null)
        setLoading(false)
        router.push(`/register/otp?email=${values?.email}`)
      }
    } catch (e: any) {
      const message: any = e?.response?.data?.message?.reason || e?.message || ''
      setStatus(message)
      ToastMessage({ type: 'error', message })
      setLoading(false)
    }
  }

  return (
    <>
      <PageTitle description=''>포텐톡 | 회원가입</PageTitle>
      <Formik
        initialValues={{
          email,
          tc: false,
          terms: false,
          policy: false,
          ads: false,
        }}
        validationSchema={registerSchema}
        validateOnChange
        validateOnBlur={false}
        // validateOnMount
        enableReinitialize
        onSubmit={handleOnSubmit}>
        {(formik) => {
          const { errors, isValid, setFieldValue, values, initialValues }: any = formik || {}
          const allRequiredTermsIsChecked: any =
            Object.values(
              pick(
                values,
                agreeChildren?.filter((f: any) => f?.required)?.map(({ name }: any) => name)
              )
            )?.filter((f: any) => f)?.length >=
            agreeChildren?.filter((f: any) => f?.required)?.length

          return (
            <>
              <div className='text-center mb-36px'>
                <img
                  alt='Logo'
                  src='/logo-circle.png'
                  className='mb-36px d-block d-lg-none mx-auto'
                  style={{ width: '168px', height: '34px' }}
                />
                <div className='fw-600 fs-20px'>포텐톡을 사용할 이메일 정보를 입력해 주세요.</div>
              </div>
              <div className='w-md-360px position-relative overflow-hidden mx-auto'>
                <Form className='justify-content-center' noValidate id='form-auth'>
                  <div className='mb-24px'>
                    <div className={`${configClass?.label} fw-bolder`}>이메일</div>
                    <InputDebounce
                      formClass='form-control h-40px bg-white'
                      type='email'
                      defaultValue={initialValues?.email}
                      delay={500}
                      placeholder='이메일을 입력해 주세요.'
                      onChange={async (e: any) => {
                        setFieldValue('email', e)
                        if (e) {
                          try {
                            const res = await checkEmail(e)
                            if (res.data)
                              setCustomError((prev: any) => ({ ...prev, email: undefined }))
                          } catch (e: any) {
                            if (e?.response) {
                              const { data } = e.response
                              setCustomError((prev: any) => ({
                                ...prev,
                                email: data?.message?.reason,
                              }))
                            } else if (e?.request) {
                              setStatus('No response received from server.')
                              ToastMessage({
                                type: 'error',
                                message: 'No response received from server.',
                              })
                            } else {
                              setStatus('An unexpected error occurred.')
                              ToastMessage({
                                type: 'error',
                                message: 'An unexpected error occurred.',
                              })
                            }
                          }
                        } else {
                          setCustomError((prev: any) => ({ ...prev, email: undefined }))
                        }
                      }}
                    />
                    {customError?.email ? (
                      <div className='form-error'>{customError?.email || ''}</div>
                    ) : errors?.email ? (
                      errors?.email && <div className='form-error'>{errors?.email || ''}</div>
                    ) : (
                      status !== null && <div className='form-error'>{status || ''}</div>
                    )}
                  </div>
                  {/* Email Field */}
                  <div className='mb-24px'>
                    <div
                      className='d-flex align-items-center border-bottom mb-8px'
                      style={{ height: '36px' }}>
                      <label>
                        <div className='form-check'>
                          <Field
                            className='form-check-input'
                            name='tc'
                            type='checkbox'
                            checked={values?.terms && values?.policy && values?.ads}
                            onClick={(e: any) => {
                              setFieldValue('terms', e?.target?.checked)
                              setFieldValue('policy', e?.target?.checked)
                              setFieldValue('ads', e?.target?.checked)
                            }}
                          />
                          <div className='fw-bolder fs-3 lh-22px'>전체 동의하기</div>
                        </div>
                      </label>
                    </div>
                    {agreeChildren?.map(({ name, label }: any) => (
                      <div
                        className='mb-8px d-flex align-items-center'
                        key={name}
                        style={{ height: '24px' }}>
                        <label>
                          <div className='form-check'>
                            <Field
                              className='form-check-input me-0'
                              name={name}
                              type='checkbox'
                              checked={values?.[name]}
                              onChange={(e: any) => {
                                if (!e?.target?.checked) {
                                  setFieldValue('tc', false)
                                }
                                setFieldValue(name, e?.target?.checked)
                              }}
                            />
                            <div className='fw-bold fs-4 lh-18px ms-8px'>{label}</div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className='text-center'>
                    <button
                      type='submit'
                      className={clsx('btn w-100 fw-bolder h-40px', {
                        'btn-primary': isValid && !anyCustomError && allRequiredTermsIsChecked,
                        'bg-disabled': !isValid || anyCustomError || !allRequiredTermsIsChecked,
                      })}
                      disabled={!isValid || anyCustomError || !allRequiredTermsIsChecked}>
                      {!loading && <span className='indicator-label'>계속</span>}
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
              {/* <div className='text-center mt-5'>
              <div className='fw-bolder mb-5 fs-5 text-white'>OR</div>
              <div className='d-flex flex-center'>
                <GoogleLogin
                  onSuccess={() => ''}
                  onError={() => ''}
                  useOneTap
                  text='signup_with'
                  context='signup'
                />
              </div>
              <div className='d-flex flex-center mt-5'>
                <div className='text-white me-2'>Have an Account ?</div>
                <Link href={`${APP_ADMIN_PATH}/login`} className='text-white fw-bolder'>
                  Sign in
                </Link>
              </div>
            </div> */}
            </>
          )
        }}
      </Formik>
    </>
  )
}

export default Index
