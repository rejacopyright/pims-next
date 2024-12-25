import { addUser, changeUserToTrainer, updateUser } from '@api/users'
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'

interface FormValues {
  role_id: number
  ref: number
  email: string
  username: string
  first_name: string
  last_name: string
  phone: string
  password: string
  password_confirm: string
}

const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
const lowerCaseRegex = /[a-z]/
const upperCaseRegex = /[A-Z]/
const numberRegex = /[0-9]/
const minCharRegex = /[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}/

const addSchema: any = Yup.object().shape({
  email: Yup.string()
    .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), 'Wrong email format')
    .required('Email is required'),
  username: Yup.string().required('Username is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  phone: Yup.string()
    .matches(/[0-9]/, 'Wrong format')
    .matches(minCharRegex, 'Minimal 8 angka')
    .required('Nomor Handphone wajib di isi'),
  password: Yup.string()
    .matches(lowerCaseRegex, 'Minimal 1 huruf kecil')
    .matches(upperCaseRegex, 'Minimal 1 huruf besar')
    .matches(numberRegex, 'Minimal 1 angka')
    .matches(specialCharRegex, 'Minimal 1 simbol')
    .matches(minCharRegex, 'Minimal 8 karakter')
    .required('Password is required'),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null as any], "Confirmation password doesn't match")
    .required('Confirmation password is required'),
})

const editSchema: any = Yup.object().shape({
  email: Yup.string()
    .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), 'Wrong email format')
    .required('Email is required'),
  username: Yup.string().required('Username is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  phone: Yup.string()
    .matches(/[0-9]/, 'Wrong format')
    .matches(minCharRegex, 'Minimal 8 angka')
    .required('Nomor Handphone wajib di isi'),
  password: Yup.string()
    .matches(lowerCaseRegex, 'Minimal 1 huruf kecil')
    .matches(upperCaseRegex, 'Minimal 1 huruf besar')
    .matches(numberRegex, 'Minimal 1 angka')
    .matches(specialCharRegex, 'Minimal 1 simbol')
    .matches(minCharRegex, 'Minimal 8 karakter')
    .nullable(),
  password_confirm: Yup.string()
    .when('password', {
      is: (val) => val,
      then: () => Yup.string().required('Confirmation password is required'),
    })
    .oneOf([Yup.ref('password'), null as any], "Confirmation password doesn't match"),
})

const passMessage = [
  { id: 1, regex: lowerCaseRegex, message: `Minimal 1 huruf kecil`, status: false },
  { id: 2, regex: upperCaseRegex, message: `Minimal 1 huruf besar`, status: false },
  { id: 3, regex: numberRegex, message: `Minimal 1 angka`, status: false },
  { id: 4, regex: specialCharRegex, message: `Minimal 1 simbol`, status: false },
  { id: 5, regex: minCharRegex, message: `Minimal 8 karakter`, status: false },
]

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
  queryKey: any[]
}> = ({ show, setShow, detail: data, queryKey }) => {
  const queryClient = useQueryClient()
  // const [status, setStatus] = useState<any>(null)
  const [detail, setDetail] = useState<any>()
  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)
  const [switchBtnIsLoading, setSwitchBtnIsLoading] = useState<boolean>(false)
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [showValidation, setShowValidation] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState<any[]>([])

  useEffect(() => {
    setDetail(show ? data : undefined)
  }, [show, data])

  const initialValues: any = {
    email: detail?.email || '',
    username: detail?.username || '',
    first_name: detail?.first_name || '',
    last_name: detail?.last_name || '',
    phone: detail?.phone || '',
    password: '',
    password_confirm: '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: data?.id ? editSchema : addSchema,
    onSubmit: async (val: any) => {
      setSubmitBtnIsLoading(true)
      const params: FormValues = {
        role_id: 1,
        ref: 2,
        email: val?.email || '',
        username: val?.username || '',
        first_name: val?.first_name || '',
        last_name: val?.last_name || '',
        phone: val?.phone || '',
        password: val?.password || '',
        password_confirm: val?.password_confirm || '',
      }

      const apiInstance = detail?.id ? updateUser(detail?.id, params) : addUser(params)
      apiInstance
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            setShow(false)
            queryClient.resetQueries({ queryKey })
            ToastMessage({ type: 'success', message: data?.message })
          }
        })
        .catch((err: any) => {
          let message = err?.response?.data?.message || err?.message
          if (typeof message === 'object') {
            message = Object.values(message)?.[0]
          }
          ToastMessage({ type: 'error', message })
        })
        .finally(() => setSubmitBtnIsLoading(false))
    },
  })

  const onPasswordChange = (e: any) => {
    setShowValidation(Boolean(e))
    const pass = passMessage?.map((item: any) => {
      const regex = item.regex
      if (regex.test(e)) {
        item.status = true
      } else {
        item.status = false
      }
      return item
    })
    setPasswordValidation(pass)
  }

  const handleSwitch = () => {
    setSwitchBtnIsLoading(true)
    changeUserToTrainer(detail?.id)
      .then(({ data }: any) => {
        if (data?.status === 'success') {
          setShow(false)
          queryClient.resetQueries({ queryKey })
          ToastMessage({ type: 'success', message: data?.message })
        }
      })
      .catch((err: any) => {
        let message = err?.response?.data?.message || err?.message
        if (typeof message === 'object') {
          message = Object.values(message)?.[0]
        }
        ToastMessage({ type: 'error', message })
      })
      .finally(() => setSwitchBtnIsLoading(false))
  }

  return (
    <Modal
      centered
      dialogClassName='modal-md'
      contentClassName='radius-15'
      show={show}
      onHide={() => {
        setShow(false)
        formik.resetForm()
        setDetail(undefined)
      }}>
      <Modal.Body className='p-0'>
        <form action='' onSubmit={formik.handleSubmit}>
          <div
            className='p-15px bg-gray-200 fw-bold fs-14px d-flex gap-10px'
            style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
            <div className='fas fa-info-circle fs-16px mt-2px' />
            <div className=''>{detail?.id ? 'Ubah' : 'Tambah'} Data User</div>
          </div>
          <div className='p-15px'>
            <div className='row'>
              <div className='col-lg-6 my-10px'>
                <div className={configClass?.label}>Nama Depan</div>
                <input
                  defaultValue={formik?.values?.first_name}
                  className={configClass?.form}
                  placeholder='Masukan Nama Depan'
                  onInput={(e: any) => formik.setFieldValue('first_name', e?.target?.value || '')}
                />
                {formik?.touched?.first_name && formik?.errors?.first_name && (
                  <div className={configClass.formError}>
                    {formik?.errors?.first_name?.toString()}
                  </div>
                )}
              </div>
              <div className='col-lg-6 my-10px'>
                <div className={configClass?.label}>Nama Belakang</div>
                <input
                  defaultValue={formik?.values?.last_name}
                  className={configClass?.form}
                  placeholder='Masukan Nama Belakang'
                  onInput={(e: any) => formik.setFieldValue('last_name', e?.target?.value || '')}
                />
                {formik?.touched?.last_name && formik?.errors?.last_name && (
                  <div className={configClass.formError}>
                    {formik?.errors?.last_name?.toString()}
                  </div>
                )}
              </div>
              <div className='col-lg-6 my-10px'>
                <div className={configClass?.label}>Username</div>
                <input
                  defaultValue={formik?.values?.username}
                  className={configClass?.form}
                  placeholder='Masukan Username'
                  onInput={(e: any) => formik.setFieldValue('username', e?.target?.value || '')}
                />
                {formik?.touched?.username && formik?.errors?.username && (
                  <div className={configClass.formError}>
                    {formik?.errors?.username?.toString()}
                  </div>
                )}
              </div>
              <div className='col-lg-6 my-10px'>
                <div className={configClass?.label}>Email</div>
                <input
                  defaultValue={formik?.values?.email}
                  className={configClass?.form}
                  placeholder='Masukan Email'
                  onInput={(e: any) => formik.setFieldValue('email', e?.target?.value || '')}
                />
                {formik?.touched?.email && formik?.errors?.email && (
                  <div className={configClass.formError}>{formik?.errors?.email?.toString()}</div>
                )}
              </div>
              <div className='col-lg-12 my-10px'>
                <div className={configClass?.label}>Nomor Handphone</div>
                <input
                  defaultValue={formik?.values?.phone}
                  className={configClass?.form}
                  placeholder='Masukan Nomor Handphone'
                  onInput={(e: any) => formik.setFieldValue('phone', e?.target?.value || '')}
                />
                {formik?.touched?.phone && formik?.errors?.phone && (
                  <div className={configClass.formError}>{formik?.errors?.phone?.toString()}</div>
                )}
              </div>
              <div className='col-lg-6 my-10px'>
                <div className={configClass?.label}>Kata Sandi</div>
                <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden h-40px'>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    defaultValue={formik?.values?.password}
                    className={`${configClass?.form} border-0`}
                    placeholder='Masukan Kata Sandi'
                    onInput={(e: any) => {
                      onPasswordChange(e?.target?.value)
                      formik.setFieldValue('password', e?.target?.value || '')
                    }}
                  />
                  <div
                    className='px-3 d-flex h-100 flex-center'
                    onClick={() => setPasswordShown(!passwordShown)}>
                    {passwordShown && <i className='las la-eye fs-2' />}
                    {!passwordShown && <i className='las la-eye-slash fs-2' />}
                  </div>
                </div>
                {formik?.touched?.password && showValidation ? (
                  <div className='mt-5px'>
                    {passwordValidation?.map((item, key: number) => (
                      <div key={key} className='d-flex align-items-center gap-5px'>
                        {item?.status ? (
                          <>
                            <div className='fas fa-check-circle text-success' />
                            <div className='fw-bold text-success'>{item?.message}</div>
                          </>
                        ) : (
                          <>
                            <div className='fas fa-check-circle text-gray-300' />
                            <div className='fw-bold text-gray-400'>{item?.message}</div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  formik?.touched?.password &&
                  formik?.errors?.password && (
                    <div className='form-error'>{formik?.errors?.password?.toString() || ''}</div>
                  )
                )}
              </div>
              <div className='col-lg-6 my-10px'>
                <div className={configClass?.label}>Ulangi Kata Sandi</div>
                <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden h-40px'>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    defaultValue={formik?.values?.password_confirm}
                    className={`${configClass?.form} border-0`}
                    placeholder='Masukan Kata Sandi'
                    onInput={(e: any) =>
                      formik.setFieldValue('password_confirm', e?.target?.value || '')
                    }
                  />
                  <div
                    className='px-3 d-flex h-100 flex-center'
                    onClick={() => setPasswordShown(!passwordShown)}>
                    {passwordShown && <i className='las la-eye fs-2' />}
                    {!passwordShown && <i className='las la-eye-slash fs-2' />}
                  </div>
                </div>
                {formik?.touched?.password_confirm && formik?.errors?.password_confirm && (
                  <div className={configClass.formError}>
                    {formik?.errors?.password_confirm?.toString()}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
            <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
              <div className='fs-14px'>Tutup</div>
            </div>
            {detail?.id && (
              <button
                type='button'
                disabled={switchBtnIsLoading}
                className='btn btn-sm btn-warning btn-flex flex-center px-15px gap-10px'
                onClick={handleSwitch}>
                {switchBtnIsLoading ? (
                  <span className='indicator-progress d-block fs-14px'>
                    Waiting...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                ) : (
                  <>
                    <i className='fas fa-exchange p-0 text-white fs-13px mb-1px' />
                    <div className='fs-13px me-5px'>Jadikan sebagai trainer</div>
                  </>
                )}
              </button>
            )}
            <button
              type='submit'
              disabled={submitBtnIsLoading}
              className='btn btn-sm btn-primary btn-flex flex-center px-15px gap-10px'>
              {submitBtnIsLoading ? (
                <span className='indicator-progress d-block fs-13px'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <>
                  <i className='fas fa-plus p-0 text-white fs-13px mb-1px' />
                  <div className='fs-13px me-5px'>{detail?.id ? 'Ubah' : 'Tambahkan'}</div>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default Index
