import { API_SERVER } from '@api/axios'
import {
  createOpenClass,
  getDetailClass,
  getFunctionalClass,
  getStudioClass,
  updateOpenClass,
} from '@api/class'
import { getTrainer } from '@api/users'
import InputCurrency from '@components/form/InputCurrency'
import { Select as SelectAjax } from '@components/select/ajax'
import { SingleValue } from '@components/select/config'
import { Select as SelectData } from '@components/select/select'
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import moment, { Moment } from 'moment'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'

interface FormValues {
  service_id: number
  class_id?: { value: any; label: any }
  trainer_id?: { value: any; label: any }
  fee?: number
  quota?: number
  start_date?: Moment
  end_date?: Moment
  session?: number
}

const validationSchema = Yup.object().shape({
  class_id: Yup.mixed()
    .test('class_id', 'Kelas wajib diisi', (e: any) => e?.value || typeof e === 'string')
    .nullable(),
  trainer_id: Yup.mixed()
    .test('trainer_id', 'Trainer wajib diisi', (e: any) => e?.value || typeof e === 'string')
    .nullable(),
  quota: Yup.number().min(1, 'Minimal 1').required('Kuota wajib diisi'),
  session: Yup.number().min(1, 'Minimal 1').required('Sesi wajib diisi'),
  // fee: Yup.number().min(1, 'Minimal 1').required('Fee wajib diisi'),
})

const Index: FC<{
  queryKey?: any[]
  show: boolean
  setShow: (e: boolean) => void
  selectedTime?: Moment
  isEdit?: boolean
  detail?: any
}> = ({ show, setShow, selectedTime, isEdit = false, detail = {}, queryKey }) => {
  const thisParams: any = useParams()
  const queryClient = useQueryClient()
  const classType = thisParams?.class

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const initialValues: any = {
    class_id: detail?.class?.id ? { value: detail?.class?.id, label: detail?.class?.name } : {},
    trainer_id: detail?.trainer?.id
      ? { value: detail?.trainer?.id, label: detail?.trainer?.full_name }
      : {},
    fee: detail?.fee || '',
    quota: detail?.quota || '',
    session: detail?.session || 1,
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    onSubmit: async (val: any) => {
      setSubmitBtnIsLoading(true)

      const params: FormValues = {
        service_id: classType === 'studio' ? 2 : classType === 'functional' ? 3 : 2,
        start_date: moment(selectedTime),
        end_date: moment(selectedTime).add({ minutes: 30 * (val?.session || 1) }),
        class_id: val?.class_id?.value,
        trainer_id: val?.trainer_id?.value,
        fee: val?.fee,
        quota: val?.quota,
        session: val?.session,
      }

      const apiInstance =
        isEdit && detail?.id
          ? updateOpenClass(detail?.id as string, params)
          : createOpenClass(params)
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

  const detailClassQuery: any = useQuery({
    // initialData: {data: []},
    enabled: show && Boolean(formik?.values?.class_id?.value) && Boolean(!detail?.id),
    queryKey: ['getDetailClass', { id: formik?.values?.class_id?.value }],
    queryFn: async () => {
      const api = await getDetailClass(formik?.values?.class_id?.value as string)
      const newData = api?.data
      return newData
    },
  })

  useEffect(() => {
    const detailClass = detailClassQuery?.data
    const detailTrainer = detailClass?.default_trainer || {}
    const full_name = `${detailTrainer?.first_name} ${detailTrainer?.last_name}`
    formik.setValues((prev) => ({
      ...prev,
      trainer_id: detailTrainer?.id ? { value: detailTrainer?.id, label: full_name } : {},
      fee: detailClass?.default_fee || '',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailClassQuery?.data])

  useEffect(() => {
    if (show && detail?.quota) {
      formik.setFieldValue('quota', detail?.quota)
      formik.setFieldValue('session', detail?.session)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const extendedDate = useMemo(() => {
    if (selectedTime) {
      return {
        date: selectedTime?.format('dddd, D MMMM yyyy'),
        start_time: selectedTime?.format('HH:mm'),
        end_time: selectedTime
          ?.clone()
          ?.add({ minutes: 30 * (formik?.values?.session || 1) })
          ?.format('HH:mm'),
      }
    }
    return undefined
  }, [formik?.values?.session, selectedTime])

  return (
    <Modal
      centered
      dialogClassName='modal-lg'
      contentClassName='radius-15'
      show={show}
      onHide={() => {
        setShow(false)
        formik.setValues({
          class_id: {},
          trainer_id: {},
          fee: '',
          quota: '',
        })
        formik.resetForm()
      }}>
      <Modal.Body className='p-0'>
        <form action='' onSubmit={formik.handleSubmit}>
          <div
            className='p-15px fw-bold fs-14px border-bottom bg-gray-100'
            style={{ borderRadius: '15px 15px 0 0' }}>
            {isEdit ? 'Update Kelas' : 'Buka Kelas'} ({extendedDate?.date} |{' '}
            {extendedDate?.start_time} - {extendedDate?.end_time})
          </div>
          <div className='px-15px'>
            <div className='row'>
              <div className='col my-10px'>
                <div className={configClass?.label}>Pilih Kelas</div>
                <SelectAjax
                  api={classType === 'studio' ? getStudioClass : getFunctionalClass}
                  reload={detail?.class_id}
                  sm={true}
                  name='class_id'
                  // className='w-100'
                  isClearable={false}
                  placeholder='Pilih Kelas'
                  defaultValue={
                    detail?.class_id
                      ? { value: detail?.class?.id, label: detail?.class?.name }
                      : undefined
                  }
                  parse={(e: any) => {
                    const img = e?.class_gallery?.length
                      ? `${API_SERVER}/static/images/class/${e?.class_gallery?.[0]?.filename}`
                      : '/media/placeholder/blank-image.svg'
                    return {
                      img,
                      value: e?.id,
                      label: e?.name,
                    }
                  }}
                  SingleValueElement={({ data, ...props }) => {
                    return <SingleValue {...props}>{data?.label}</SingleValue>
                  }}
                  formatOptionLabel={(e: any) => (
                    <div className='d-flex align-items-center gap-10px'>
                      <div
                        className='w-30px h-30px radius-5 border'
                        style={{
                          background: `#fff url(${e?.img}) center / cover no-repeat`,
                        }}
                      />
                      <div className='col'>{e?.label}</div>
                    </div>
                  )}
                  styleOption={{
                    // singleValue: { height: 'auto', display: 'flex' },
                    control: {
                      border: '1px solid #eee',
                      borderRadius: '5px',
                      // width: 'calc(50% - 10px)',
                      width: '100%',
                      // height: 42,
                    },
                    placeholder: { color: '#000' },
                  }}
                  onChange={(e: any) => {
                    formik.setFieldValue('class_id', e)
                  }}
                />
                {formik?.errors?.class_id && (
                  <div className={configClass.formError}>
                    {formik?.errors?.class_id?.toString()}
                  </div>
                )}
              </div>
              <div className='col-auto my-10px'>
                <div className='' style={{ width: '120px' }}>
                  <div className={configClass?.label}>Kuota</div>
                  <InputCurrency
                    defaultValue={initialValues?.quota}
                    placeholder='Kuota'
                    onChange={(e: any) => {
                      formik.setFieldValue('quota', e?.floatValue || '')
                    }}
                  />
                  {formik?.errors?.quota && Boolean(!formik?.values?.quota) && (
                    <div className={configClass.formError}>{formik?.errors?.quota?.toString()}</div>
                  )}
                </div>
              </div>
              <div className='col-auto my-10px'>
                <div className='' style={{ width: '150px' }}>
                  <div className={configClass?.label}>Sesi</div>
                  <SelectData
                    sm={true}
                    name='session'
                    className='p-0 text-start'
                    data={Array(10)
                      .fill('')
                      .map((_, index: number) => ({
                        value: index + 1,
                        label: `${index + 1} Sesi`,
                      }))}
                    isClearable={false}
                    placeholder='Pilih Sesi'
                    defaultValue={detail?.session || 1}
                    styleOption={{
                      control: {
                        border: '1px solid #eee',
                        borderRadius: '5px',
                        // width: 150,
                        height: 42,
                      },
                      placeholder: { color: '#000' },
                    }}
                    onChange={(e: any) => {
                      formik.setFieldValue('session', e?.value)
                    }}
                  />
                  {formik?.errors?.session && Boolean(!formik?.values?.session) && (
                    <div className={configClass.formError}>
                      {formik?.errors?.session?.toString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col my-10px'>
                <div className={configClass?.label}>Pilih Trainer</div>
                <SelectAjax
                  api={getTrainer}
                  reload={detail?.trainer?.value || formik?.values?.class_id?.value}
                  sm={true}
                  name='trainer_id'
                  // className='w-100'
                  isClearable={false}
                  placeholder='Pilih Trainer'
                  defaultValue={
                    detail?.trainer_id
                      ? { value: detail?.trainer?.id, label: detail?.trainer?.full_name }
                      : formik?.values?.trainer_id?.value
                        ? formik?.values?.trainer_id
                        : {}
                  }
                  parse={(e: any) => {
                    const img = e?.avatar
                      ? `${API_SERVER}/static/images/user/${e?.avatar}`
                      : '/media/placeholder/avatar.svg'
                    return {
                      img,
                      value: e?.id,
                      label: e?.full_name,
                    }
                  }}
                  SingleValueElement={({ data, ...props }) => {
                    return <SingleValue {...props}>{data?.label}</SingleValue>
                  }}
                  formatOptionLabel={(e: any) => (
                    <div className='d-flex align-items-center gap-10px'>
                      <div
                        className='w-30px h-30px radius-50 border'
                        style={{
                          background: `#fff url(${e?.img}) center / cover no-repeat`,
                        }}
                      />
                      <div className=''>{e?.label}</div>
                    </div>
                  )}
                  styleOption={{
                    // singleValue: { height: 'auto', display: 'flex' },
                    control: {
                      border: '1px solid #eee',
                      borderRadius: '5px',
                      width: '100%',
                      // height: 42,
                    },
                    placeholder: { color: '#000' },
                  }}
                  onChange={(e: any) => {
                    formik.setFieldValue('trainer_id', e)
                  }}
                />
                {formik?.errors?.trainer_id && (
                  <div className={configClass.formError}>
                    {formik?.errors?.trainer_id?.toString()}
                  </div>
                )}
              </div>
              <div className='col my-10px'>
                <div className={configClass?.label}>Harga Program</div>
                <InputCurrency
                  defaultValue={isEdit ? initialValues?.fee : formik?.values?.fee}
                  prefix='Rp.'
                  placeholder='Masukan Harga'
                  onChange={(e: any) => {
                    formik.setFieldValue('fee', e?.floatValue || '')
                  }}
                />
                {formik?.errors?.fee && (
                  <div className={configClass.formError}>{formik?.errors?.fee?.toString()}</div>
                )}
              </div>
            </div>
          </div>
          <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
            <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
              <div className='fs-14px'>Tutup</div>
            </div>
            <button
              type='submit'
              disabled={submitBtnIsLoading}
              className='btn btn-sm btn-primary fs-14px'>
              {!submitBtnIsLoading ? (
                isEdit ? (
                  'Update Kelas'
                ) : (
                  'Buka Kelas'
                )
              ) : (
                <span className='indicator-progress d-block'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default Index
