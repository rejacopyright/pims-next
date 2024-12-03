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
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import moment, { Moment } from 'moment'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
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
}

const validationSchema = Yup.object().shape({
  class_id: Yup.mixed()
    .test('class_id', 'Kelas wajib diisi', (e: any) => e?.value || typeof e === 'string')
    .nullable(),
  trainer_id: Yup.mixed()
    .test('trainer_id', 'Trainer wajib diisi', (e: any) => e?.value || typeof e === 'string')
    .nullable(),
  quota: Yup.number().min(1, 'Mminimal 1').required('Kuota wajib diisi'),
})

const Index: FC<{
  queryKey?: any[]
  show: boolean
  setShow: (e: boolean) => void
  selectedTime: any
  isEdit?: boolean
  detail?: any
}> = ({ show, setShow, selectedTime, isEdit = false, detail = {}, queryKey }) => {
  const thisParams: any = useParams()
  const queryClient = useQueryClient()
  const classType = thisParams?.class

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const initialValues = {
    class_id: {},
    trainer_id: {},
    fee: '',
    quota: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (val: any) => {
      setSubmitBtnIsLoading(true)

      const params: FormValues = {
        service_id: classType === 'studio' ? 2 : classType === 'functional' ? 3 : 2,
        start_date: moment(selectedTime),
        end_date: moment(selectedTime).add({ minutes: 30 }),
        class_id: val?.class_id?.value,
        trainer_id: val?.trainer_id?.value,
        fee: val?.fee,
        quota: val?.quota,
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
    enabled: show && Boolean(formik?.values?.class_id?.value),
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
    // formik.setFieldValue(
    //   'trainer_id',
    //   detailTrainer?.id ? { value: detailTrainer?.id, label: full_name } : {}
    // )
    formik.setValues((prev) => ({
      ...prev,
      trainer_id: detailTrainer?.id ? { value: detailTrainer?.id, label: full_name } : {},
      fee: detailClass?.default_fee || '',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailClassQuery?.data])

  useEffect(() => {
    if (!show) {
      formik.resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <Modal
      centered
      dialogClassName='modal-md'
      contentClassName='radius-15'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='p-0'>
        <form action='' onSubmit={formik.handleSubmit}>
          <div
            className='p-15px fw-bold fs-14px border-bottom bg-gray-100'
            style={{ borderRadius: '15px 15px 0 0' }}>
            Buka Kelas
          </div>
          <div className='px-15px'>
            <div className='row'>
              <div className='col my-10px'>
                <div className={configClass?.label}>Pilih Kelas</div>
                <SelectAjax
                  api={classType === 'studio' ? getStudioClass : getFunctionalClass}
                  reload={formik.values?.class_id?.value}
                  sm={true}
                  name='class_id'
                  // className='w-100'
                  isClearable={false}
                  placeholder='Pilih Kelas'
                  defaultValue={
                    formik.values?.class_id?.value ? formik.values?.class_id : undefined
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
                      <div className=''>{e?.label}</div>
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
                    defaultValue={formik.values?.quota}
                    placeholder='Kuota'
                    onChange={(e: any) => {
                      formik.setFieldValue('quota', e?.floatValue || '')
                    }}
                  />
                  {formik?.errors?.quota && (
                    <div className={configClass.formError}>{formik?.errors?.quota?.toString()}</div>
                  )}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col my-10px'>
                <div className={configClass?.label}>Pilih Trainer</div>
                <SelectAjax
                  api={getTrainer}
                  reload={formik.values?.class_id?.value}
                  sm={true}
                  name='trainer_id'
                  // className='w-100'
                  isClearable={false}
                  placeholder='Pilih Trainer'
                  defaultValue={
                    formik.values?.trainer_id?.value ? formik.values?.trainer_id : undefined
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
                  defaultValue={formik.values?.fee}
                  prefix='Rp.'
                  placeholder='Masukan Harga'
                  onChange={(e: any) => {
                    formik.setFieldValue('fee', e?.floatValue || 0)
                  }}
                />
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
                'Buat Kelas'
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
