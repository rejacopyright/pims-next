'use client'
import { loginUserInfo } from '@api/__MOCK/login'
import { login as loginUser } from '@api/auth'
import { APP_ADMIN_PATH, APP_MODE, APP_NAME, configClass, getJWTPayload } from '@helpers'
import { setAdmin, setRole } from '@redux'
import clsx from 'clsx'
import { Field, Form, Formik, FormikProps } from 'formik'
import Cookies from 'js-cookie'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import * as Yup from 'yup'

// import LoginError from './_modals/LoginError'

const loginSchema: any = Yup.object().shape({
  email: Yup.string()
    // .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), 'Format email salah')
    .required('Username / Email wajib diisi'),
  password: Yup.string()
    // .matches(/[a-z]/, 'Minimal 1 huruf kecil')
    // .matches(/[A-Z]/, 'Minimal 1 huruf besar')
    // .matches(/[0-9]/, 'Minimal 1 angka')
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Minimal 1 simbol')
    // .min(8, () => 'Minimal 8 karakter')
    .required('Kata sandi wajib diisi'),
})

const Login = ({ searchParams }) => {
  const prefix: any = location?.pathname?.slice(1)?.split('/')?.[0] || ''
  const router = useRouter()
  const params: any = use(searchParams)
  const { email = '', request } = params || {}
  const nextRequest: any = request

  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [passwordShown, setPasswordShown] = useState<boolean>(false)

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const handleOnSubmit = (values) => {
    localStorage.removeItem(`persist:${prefix}`)
    setLoading(true)
    loginUser({ username: values?.email, password: values?.password })
      .then(async ({ data }: any) => {
        const { user, token } = data || {}
        const payload: any = getJWTPayload(token)

        if (user?.id) {
          setStatus(null)
          Cookies.set(`token_${prefix}`, token, { expires: moment.unix(payload?.exp).toDate() })
          setRole('admin')
          setAdmin(user)
          router.push(nextRequest ? atob(nextRequest) : `/${prefix}`)
          // setTimeout(() => {
          //   window.location.href = nextRequest ? atob(nextRequest) : `/${prefix}`
          // }, 300)
        }
      })
      .catch((err: any) => {
        const message: any = err?.response?.data?.message || err?.message || ''
        const code = err?.response?.data?.code
        setStatus(message)
        router.push(
          `${APP_ADMIN_PATH}/login/error?email=${values?.email}&code=${code}&message=${message}`,
          {
            scroll: false,
          }
        )
      })
      .finally(() => {
        setLoading(false)
      })

    if (APP_MODE === 'test') {
      Cookies.set(`token`, 'token', { expires: moment().add(2, 'h').toDate() })
      setAdmin(loginUserInfo)
      setStatus(null)
      setTimeout(() => {
        window.location.href = nextRequest ? atob(nextRequest) : APP_ADMIN_PATH
      }, 300)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          email,
          password: '',
        }}
        validationSchema={loginSchema}
        enableReinitialize
        validateOnChange
        validateOnMount
        onSubmit={handleOnSubmit}>
        {(formik: FormikProps<{ email: string; password: string }>) => {
          const { touched, errors, isValid } = formik || {}
          return (
            <div className='row'>
              <div className='col-12'>
                <div className='text-center' style={{ marginBottom: '36px' }}>
                  <Image
                    alt='Logo'
                    src='/logo/logo-circle.png'
                    width={100}
                    height={100}
                    className='mb-8px'
                    priority
                  />
                  <div className='fw-600 fs-14px'>{APP_NAME} | Admin</div>
                </div>
                <div
                  className='w-md-360px px-md-0 px-5 mx-auto'
                  style={{ backgroundColor: 'rgba(255,255,255,.85)' }}>
                  <Form className='justify-content-center' noValidate id='form-auth'>
                    <div className='fv-row mb-24px'>
                      <div className={configClass?.label}>Username / Email</div>
                      <Field
                        className={clsx('bg-white', configClass?.form, {
                          'border-gray-300': !touched?.email,
                          'is-invalid-xxx': touched?.email && errors?.email,
                          'is-valid-xxx': touched?.email && !errors?.email,
                        })}
                        type='email'
                        name='email'
                        placeholder='Username / Email'
                        autoComplete='off'
                      />
                      {touched?.email && errors?.email ? (
                        <div className='form-error'>{errors?.email || ''}</div>
                      ) : (
                        status !== null && <div className='form-error'>{status || ''}</div>
                      )}
                    </div>

                    <div className='fv-row mb-24px'>
                      <div className={configClass?.label}>Kata Sandi</div>
                      <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden h-40px'>
                        <Field
                          type={passwordShown ? 'text' : 'password'}
                          // placeholder='Password'
                          autoComplete='off'
                          name='password'
                          placeholder='Kata Sandi'
                          className={`bg-white border-0 ${configClass?.form}`}
                        />
                        <div className='px-3 d-flex h-100 flex-center' onClick={togglePassword}>
                          {passwordShown && <i className='las la-eye fs-2 mt-1' />}
                          {!passwordShown && <i className='las la-eye-slash fs-2 mt-1' />}
                        </div>
                      </div>
                      {touched?.password && errors?.password && (
                        <div className='form-error'>{errors?.password || ''}</div>
                      )}
                    </div>

                    {/* <div className='fv-row mb-5 mt-n5'>
                      <label>
                        <div className='form-check'>
                          <Field
                            className='form-check-input'
                            name='remember'
                            type='checkbox'
                            // checked={false}
                            onClick={() => ''}
                          />
                          <div className='cursor-pointer fw-bold'>Remember Me</div>
                        </div>
                      </label>
                    </div> */}
                    <div className='text-center'>
                      <button
                        type={isValid ? 'submit' : 'button'}
                        className={clsx('btn w-100 fw-600 fs-6 h-40px mb-24px', {
                          'btn-primary': isValid,
                          'bg-secondary text-gray-600 cursor-na': !isValid,
                        })}
                        // disabled={!isValid}
                      >
                        {!loading && <span className='indicator-label'>Login</span>}
                        {loading && (
                          <span className='indicator-progress' style={{ display: 'block' }}>
                            Waiting...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                      {/* <div className='fw-bolder mb-5 fs-5'>OR</div>
                      <div className='d-flex flex-center'>
                        <GoogleLogin
                          onSuccess={(e: any) => {
                            const payload: any = getJWTPayload(e?.credential)
                            setFieldValue('email', payload?.email)
                          }}
                          onError={() => ''}
                          useOneTap
                        />
                      </div> */}
                      <div className='d-flex flex-center'>
                        {/* <div className='text-gray-700 me-2'>No Account ?</div> */}
                        <Link
                          href={`${APP_ADMIN_PATH}/register`}
                          className='text-primary fw-bolder'>
                          Daftar
                        </Link>
                      </div>
                    </div>
                  </Form>
                  <div
                    className='text-center mt-36px border-top d-flex align-items-end justify-content-center'
                    style={{ height: '36px' }}>
                    <Link
                      tabIndex={-1}
                      href='/password/forgot'
                      className='link-primary fw-bolder text-gray-500'
                      style={{ marginLeft: '5px' }}>
                      Lupa Kata Sandi?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Formik>
      {/* <LoginError
        show={showModalNoAccount}
        setShow={setShowModalNoAccount}
        message={status}
        code={statusCode}
      /> */}
    </>
  )
}

export default Login
