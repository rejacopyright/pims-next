import axios from '@api/axios'
import { ToastMessage } from '@components/toast'
import { configClass, phoneCode } from '@helpers'
import { setUser } from '@redux'
import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'

type UserInfoType = {
  country_code: 'kr' | 'id' | 'en'
  user_frst_nm: string
  user_last_nm: string
}

type ModalEditProfileProps = {
  user: any
  isModalShow: boolean
  setModalProfile: (val: boolean) => void
}

const updateProfileValidation = Yup.object().shape({
  user_frst_nm: Yup.string().required('First Name is Required'),
  user_last_nm: Yup.string().required('Last Name is Required'),
})

const ModalUpdateProfile = ({ user, isModalShow, setModalProfile }: ModalEditProfileProps) => {
  const initialState: UserInfoType = {
    country_code: 'kr',
    user_frst_nm: user?.user_frst_nm,
    user_last_nm: user?.user_last_nm,
  }

  const [isLoading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState('')

  const onSubmitHandler = async (values: UserInfoType) => {
    let phoneNumber
    const selectedCountry = phoneCode.find((item) => item.value === values.country_code)
    // if (String(values.user_mbl).substring(0, 2) === selectedCountry?.label.substring(1, 3)) {
    //   phoneNumber = String(values.user_mbl).replace(selectedCountry?.label.substring(1, 3), '')
    // } else {
    //   phoneNumber = values.user_mbl
    // }
    setLoading(true)
    try {
      const data = {
        user_id: user?.user_id,
        user_frst_nm: values.user_frst_nm,
        user_last_nm: values.user_last_nm,
        user_mbl: Number(`${selectedCountry?.label}${phoneNumber}`),
      }
      const res = await axios.put('/member/update_user_info', data)
      if (res.data.code === 1000) {
        const newUserData = { ...user, ...values }
        setUser(newUserData)
        setStatus('')
        ToastMessage({ type: 'success', message: 'Profile Updated.' })
        setModalProfile(false)
      }
      setLoading(false)
    } catch (e: any) {
      e.response?.data
      setStatus(e.message.reason)
      setLoading(false)
      // if (error.code === 10004) {
      // }
    }
  }
  return (
    <Modal centered dialogClassName='w-lg-500px' show={isModalShow} backdrop={'static'}>
      <Modal.Header className='bg-primary d-flex justify-content-center align-items-center'>
        <Modal.Title className='text-white'>Complete Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-0'>
        <Formik
          initialValues={initialState}
          onSubmit={onSubmitHandler}
          validationSchema={updateProfileValidation}>
          {({ handleSubmit, errors, touched }) => (
            <Form className='container d-flex row gap-5 my-10' onSubmit={handleSubmit}>
              {status && (
                <div className={`alert alert-danger my-lg-7`}>
                  <div className='alert-text font-weight-bold text-danger fw-bold'>{status}</div>
                </div>
              )}
              <div className='d-flex flex-column'>
                <label htmlFor={'firstName'} className={clsx(configClass.label)}>
                  First Name
                </label>
                <Field
                  id={'firstName'}
                  name={'user_frst_nm'}
                  placeholder={'Enter First Name'}
                  className={clsx('form-control text-dark border border-primary bg-gray-100', {
                    'is-invalid border-danger': touched.user_frst_nm && errors.user_frst_nm,
                  })}
                />
                <div className={'d-flex justify-content-between'}>
                  {touched.user_frst_nm && errors.user_frst_nm && (
                    <div className={'fs-7 text-danger'}>{errors.user_frst_nm || ''}</div>
                  )}
                </div>
              </div>
              <div className='d-flex flex-column'>
                <label htmlFor={'lastName'} className={clsx(configClass.label)}>
                  Last Name
                </label>
                <Field
                  id={'lastName'}
                  name={'user_last_nm'}
                  placeholder={'Enter Last Name'}
                  className={clsx('form-control text-dark border border-primary bg-gray-100', {
                    'is-invalid border-danger': touched.user_last_nm && errors.user_last_nm,
                  })}
                />
                <div className={'d-flex justify-content-between'}>
                  {touched.user_last_nm && errors.user_last_nm && (
                    <div className={'fs-7 text-danger'}>{errors.user_last_nm || ''}</div>
                  )}
                </div>
              </div>
              {/* <label htmlFor={'lastName'} className={clsx(configClass.label, 'mb-n5')}>
                Phone Number
              </label> */}
              {/* <div className='d-flex '>
                <div className='w-100px'>
                  <ReactSelect
                    sm={true}
                    name='phone_code'
                    className='col p-0 border border-primary border-right-0'
                    data={phoneCode}
                    isClearable={false}
                    placeholder='Country'
                    defaultValue={values.country_code}
                    styleOption={{ control: { borderColor: '#fff' } }}
                    formatOptionLabel={({ label, icon }) => (
                      <div className='d-flex align-items-center'>
                        <img className='me-2' src={icon} alt='' style={{ width: '12px' }} />
                        <div>{label}</div>
                      </div>
                    )}
                    onChange={(e) => setFieldValue('country_code', e.value)}
                  />
                </div>
                <Field
                  type='number'
                  name='user_mbl'
                  placeholder='Enter Phone Number'
                  className={`text-dark fs-13px min-h-40px border border-primary border-left-0 w-75`}
                  style={{ outline: 'none' }}
                />
              </div> */}
              {/* {touched.user_mbl && errors.user_mbl && (
                <div className={'fs-7 text-danger mt-n5'}>{errors.user_mbl || ''}</div>
              )} */}
              <div className='d-flex column justify-content-evenly gap-3'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='btn btn-primary flex-fill d-flex justify-content-center align-items-center gap-2'>
                  {!isLoading && (
                    <>
                      <i className='fas fa-check-circle text-white fs-2' />{' '}
                      <span className='indicator-label'>{'Save'}</span>
                    </>
                  )}
                  {isLoading && (
                    <span className='indicator-progress' style={{ display: 'block' }}>
                      Waiting...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default ModalUpdateProfile
