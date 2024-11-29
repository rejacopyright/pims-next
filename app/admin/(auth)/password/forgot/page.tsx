'use client'
import { resetPassword } from '@api/auth'
import { configClass } from '@helpers'
import { useLocation } from '@hooks'
import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'

const loginSchema: any = Yup.object().shape({
  email: Yup.string()
    .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), '이메일 형식이 맞지 않습니다.')
    .required('사용 할 이메일을 입력해 주세요.'),
  // password: Yup.string().required('Password is required'),
})

const Index = () => {
  const router = useRouter()
  const { params } = useLocation()
  const { email = '' } = params || {}

  const [loading, setLoading] = useState<boolean>(false)

  const handleOnSubmit = (values) => {
    const { email: user_eml } = values || {}
    setLoading(true)
    resetPassword({ user_eml })
      .then(({ data }: any) => {
        const responseStatus: any = data?.message?.reason?.toLowerCase()
        const isSuccess: boolean = responseStatus === 'ok'
        if (isSuccess) {
          setTimeout(() => {
            router.push(`/password/confirm?email=${user_eml}`, { scroll: false })
          }, 100)
        } else {
          router.push(
            `/password/error?email=${user_eml}&statusCode=${data?.code}&message=${data?.message?.reason_msg}`,
            { scroll: false }
          )
        }
      })
      .catch(({ response: { data } }: any) => {
        const _message: any = data?.message?.reason || ''
      })
      .finally(() => setLoading(false))
  }

  return (
    <Formik
      initialValues={{ email }}
      validationSchema={loginSchema}
      enableReinitialize
      onSubmit={handleOnSubmit}>
      {(formik: any) => {
        const { errors, isValid, values }: any = formik || {}
        return (
          <div style={{ width: '85vw' }}>
            <div className='row'>
              <div className='col-12'>
                <div className='w-md-360px px-md-0 px-5 mx-auto position-relative'>
                  <img
                    alt='Logo'
                    src='/logo-circle.png'
                    className='mb-36px d-block d-lg-none mx-auto'
                    style={{ width: '168px', height: '34px' }}
                  />
                  <div className='fs-20px fw-700 mb-36px ls-n1'>
                    비밀번호를 찾으려는 이메일을 입력해 주세요.
                  </div>
                  <Form className='justify-content-center' noValidate id='form-auth'>
                    <div className='mb-24px'>
                      <div className={configClass?.label}>이메일</div>
                      <Field
                        className={`${configClass?.form} bg-white`}
                        type='email'
                        name='email'
                        placeholder='이메일을 입력해 주세요.'
                        autoComplete='off'
                      />
                      {errors?.email && <div className='form-error'>{errors?.email || ''}</div>}
                    </div>
                    <div className='text-center'>
                      <button
                        type={isValid ? 'submit' : 'button'}
                        className={clsx('btn w-100 fw-bolder fs-14px h-40px lh-1', {
                          'btn-primary': isValid && values?.email,
                          'bg-disabled text-gray-600 cursor-na': !isValid || !values?.email,
                        })}
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
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}

export default Index
