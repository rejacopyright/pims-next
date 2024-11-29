'use client'

import axios from '@api/axios'
import { InputDate } from '@components/form'
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
import { setUser } from '@redux'
import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'

// import ModalManagePhoneNumber from './ModalManagePhoneNumber'

type UserInfoType = {
  user_frst_nm: string
  user_last_nm: string
  user_brth_ymd?: any
  user_mbl?: string
  user_ntn_cd?: string
  user_psta_cd?: string
  user_ctpv?: string
  user_cty?: string
  user_addr?: string
  user_daddr?: string
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
    user_frst_nm: user?.user_frst_nm,
    user_last_nm: user?.user_last_nm,
    user_brth_ymd: user?.user_brth_ymd ? moment(user?.user_brth_ymd, 'YYYY-MM-DD').toDate() : '',
    user_ntn_cd: user?.user_ntn_cd,
    user_psta_cd: user?.user_psta_cd,
    user_cty: user?.user_cty,
    user_ctpv: user?.user_ctpv,
    user_addr: user?.user_addr,
    user_daddr: user?.user_daddr,
  }

  const [isLoading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState('')
  // const [showManagePhone, setModalManagePhone] = useState<boolean>(false)

  const onSubmitHandler = async (values: UserInfoType) => {
    setLoading(true)
    try {
      const data = {
        user_id: user?.user_id,
        ...values,
        user_brth_ymd: moment(values.user_brth_ymd).format('YYYY-MM-DD'),
      }

      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== null && v !== '')
      )

      const res = await axios.put('/member/update_user_info', filteredData)
      if (res.data.code === 1000) {
        const newUserData = { ...user, ...filteredData }
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

  const openModalManagePhone = () => {
    setModalProfile(false)
    // setModalManagePhone(true)
  }

  // const closeModalManagePhone = () => {
  //   setModalProfile(true)
  //   setModalManagePhone(false)
  // }

  return (
    <>
      <Modal
        centered
        dialogClassName='w-lg-500px'
        show={isModalShow}
        onHide={() => setModalProfile(false)}>
        <Modal.Header className='bg-primary d-flex justify-content-center align-items-center'>
          <Modal.Title className='text-white'>Edit Information Data</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-0'>
          <Formik
            initialValues={initialState}
            onSubmit={onSubmitHandler}
            validationSchema={updateProfileValidation}>
            {({ handleSubmit, errors, touched, values, setFieldValue, dirty }) => (
              <Form
                className='container d-flex row gap-5 my-10'
                onSubmit={(e: any) => {
                  e.preventDefault()
                  if (!dirty) {
                    setModalProfile(false)
                  } else {
                    handleSubmit()
                  }
                }}>
                {status && (
                  <div className={`alert alert-danger my-lg-7`}>
                    <div className='alert-text font-weight-bold text-danger fw-bold'>{status}</div>
                  </div>
                )}
                <div className='d-flex flex-row gap-2'>
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
                </div>
                <div className='d-flex flex-row gap-2'>
                  <div className='d-flex flex-column w-50'>
                    <label htmlFor={'dob'} className={clsx(configClass.label)}>
                      Date of Birth
                    </label>
                    <InputDate
                      modal={false}
                      value={values.user_brth_ymd || ''}
                      onChange={(e) => {
                        setFieldValue('user_brth_ymd', e)
                      }}>
                      {values.user_brth_ymd ? (
                        <span className='text-black'>
                          {moment(values.user_brth_ymd).format('YYYY-MM-DD')}
                        </span>
                      ) : (
                        <span className='text-gray-500'>Select Date</span>
                      )}
                    </InputDate>
                    <div className={'d-flex justify-content-between'}>
                      {touched.user_last_nm && errors.user_last_nm && (
                        <div className={'fs-7 text-danger'}>{errors.user_last_nm || ''}</div>
                      )}
                    </div>
                  </div>
                  <div className='d-flex flex-column w-50'>
                    <label htmlFor={'country'} className={clsx(configClass.label)}>
                      Country
                    </label>
                    <Field
                      as='select'
                      id='country'
                      name='user_ntn_cd'
                      className={clsx('form-select text-dark border border-primary bg-gray-100', {
                        'is-invalid border-danger': touched.user_ntn_cd && errors.user_ntn_cd,
                      })}>
                      <option disabled className='text-gray-500' selected>
                        Select Country
                      </option>
                      <option className='text-dark' value={'KR'}>
                        Korea
                      </option>
                      <option className='text-dark' value={'ID'}>
                        Indonesia
                      </option>
                      <option className='text-dark' value={'US'}>
                        United State
                      </option>
                    </Field>
                    <div className={'d-flex justify-content-between'}>
                      {touched.user_ntn_cd && errors.user_ntn_cd && (
                        <div className={'fs-7 text-danger'}>{errors.user_ntn_cd || ''}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-row gap-2'>
                  <div className='d-flex flex-column'>
                    <label htmlFor={'province'} className={clsx(configClass.label)}>
                      Province/State
                    </label>
                    <Field
                      id={'province'}
                      name={'user_ctpv'}
                      placeholder={'Enter Province/State'}
                      className={clsx('form-control text-dark border border-primary bg-gray-100', {
                        'is-invalid border-danger': touched.user_ctpv && errors.user_ctpv,
                      })}
                    />
                    <div className={'d-flex justify-content-between'}>
                      {touched.user_ctpv && errors.user_ctpv && (
                        <div className={'fs-7 text-danger'}>{errors.user_ctpv || ''}</div>
                      )}
                    </div>
                  </div>
                  <div className='d-flex flex-column'>
                    <label htmlFor={'city'} className={clsx(configClass.label)}>
                      City
                    </label>
                    <Field
                      id={'city'}
                      name={'user_cty'}
                      placeholder={'Enter City Name'}
                      className={clsx('form-control text-dark border border-primary bg-gray-100', {
                        'is-invalid border-danger': touched.user_cty && errors.user_cty,
                      })}
                    />
                    <div className={'d-flex justify-content-between'}>
                      {touched.user_cty && errors.user_cty && (
                        <div className={'fs-7 text-danger'}>{errors.user_cty || ''}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <label htmlFor={'address'} className={clsx(configClass.label)}>
                    Address
                  </label>
                  <Field
                    id={'address'}
                    name={'user_addr'}
                    placeholder={'Enter Address'}
                    className={clsx('form-control text-dark border border-primary bg-gray-100', {
                      'is-invalid border-danger': touched.user_addr && errors.user_addr,
                    })}
                  />
                  <div className={'d-flex justify-content-between'}>
                    {touched.user_addr && errors.user_addr && (
                      <div className={'fs-7 text-danger'}>{errors.user_addr || ''}</div>
                    )}
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <label htmlFor={'dAddr'} className={clsx(configClass.label)}>
                    Detail Address
                  </label>
                  <Field
                    id={'dAddr'}
                    name={'user_daddr'}
                    placeholder={'Enter Detail Address'}
                    className={clsx('form-control text-dark border border-primary bg-gray-100', {
                      'is-invalid border-danger': touched.user_daddr && errors.user_daddr,
                    })}
                  />
                  <div className={'d-flex justify-content-between'}>
                    {touched.user_daddr && errors.user_daddr && (
                      <div className={'fs-7 text-danger'}>{errors.user_daddr || ''}</div>
                    )}
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <label htmlFor={'lastName'} className={clsx(configClass.label)}>
                    Phone Number
                  </label>
                  <div
                    id={'lastName'}
                    className={
                      'form-control d-flex flex-row align-items-center justify-content-between text-dark border border-primary bg-gray-100'
                    }>
                    {user.user_mbl ? <span>+{user?.user_mbl}</span> : <span></span>}
                    <button
                      type='button'
                      className='btn btn-sm btn-warning'
                      onClick={openModalManagePhone}>
                      {user?.user_mbl ? 'Change' : 'Add'}
                    </button>
                  </div>
                </div>
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
      {/* <ModalManagePhoneNumber
        show={showManagePhone}
        title={user?.user_mbl ? 'Change' : 'Add'}
        closeModal={closeModalManagePhone}
      /> */}
    </>
  )
}

export default ModalUpdateProfile
