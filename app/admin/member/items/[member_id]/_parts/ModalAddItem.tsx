import { API_SERVER } from '@api/axios'
import { getClass } from '@api/class'
import { addMemberItem, updateMemberItem } from '@api/member'
import InputCurrency from '@components/form/InputCurrency'
import { Select as SelectAjax } from '@components/select/ajax'
import { SingleValue } from '@components/select/config'
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'

interface FormValues {
  member_id: number
  service_id: number
  class_id?: { value: any; label: any }
  fee?: number
  quota?: number
}

const validationSchema = Yup.object().shape({
  class_id: Yup.mixed().test(
    'class_id',
    'Kelas wajib diisi',
    (e: any) => e?.value || typeof e === 'string'
  ),
  // fee: Yup.number().min(1, 'Mminimal 1').required('Fee wajib diisi'),
  // quota: Yup.number().min(1, 'Mminimal 1').required('Kuota wajib diisi'),
})

const validationSchemaForVisit = Yup.object().shape({
  class_id: Yup.mixed().notRequired(),
})

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  classType: any
  member_id: any
  detail: any
  queryKey: any[]
}> = ({ show, setShow, classType, member_id, detail: data, queryKey }) => {
  const queryClient = useQueryClient()
  const [detail, setDetail] = useState<any>()
  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (show) {
      setDetail(data)
    }
  }, [show, data])

  const initialValues: any = {
    class_id: detail?.class?.id
      ? { value: detail?.class?.id, label: detail?.class?.name }
      : undefined,
    fee: detail?.fee || '',
    quota: detail?.quota || '',
    isFree: Boolean(!detail?.fee),
    isUnlimited: Boolean(!detail?.quota),
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.lazy((_value) => {
      if (classType === 1) {
        return validationSchemaForVisit
      }
      return validationSchema
    }),
    validateOnMount: false,
    onSubmit: async (val: any) => {
      setSubmitBtnIsLoading(true)

      const params: FormValues = {
        member_id,
        service_id: classType,
        class_id: val?.class_id?.value,
        fee: val?.isFree ? '' : val?.fee,
        quota: val?.isUnlimited ? '' : val?.quota,
      }
      const apiInstance = detail?.id
        ? updateMemberItem(detail?.id as string, params)
        : addMemberItem(params)
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

  const classTypeName =
    classType === 1
      ? 'visit'
      : classType === 2
        ? 'studio'
        : classType === 3
          ? 'functional'
          : 'studio'

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
        // formik.setValues((prev) => ({
        //   ...prev,
        //   isFree: true,
        //   isUnlimited: true,
        //   class_id: undefined,
        // }))
      }}>
      <Modal.Body className='p-0'>
        <form action='' onSubmit={formik.handleSubmit}>
          <div
            className='p-15px bg-gray-200 fw-bold fs-14px d-flex gap-10px'
            style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
            <div className='fas fa-info-circle fs-16px mt-2px' />
            <div className=''>{classType === 1 ? 'Gym Visit' : detail?.class?.name}</div>
          </div>
          <div className='p-15px'>
            {classType !== 1 && !detail?.id && (
              <div className='row'>
                <div className='col-12 my-10px'>
                  <div className={configClass.label}>Pilih Kelas</div>
                  <SelectAjax
                    api={(e) => getClass(classTypeName, e)}
                    params={{ member_id }}
                    reload={false}
                    sm={true}
                    name='class_id'
                    // className='w-100'
                    isClearable={false}
                    placeholder='Pilih'
                    defaultValue={formik?.values?.class_id}
                    parse={(e: any) => {
                      const img = e?.class_gallery?.[0]?.filename
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
                        width: '100%',
                        // height: 42,
                      },
                      placeholder: { color: '#000' },
                    }}
                    onChange={(e: any) => formik.setFieldValue('class_id', e)}
                  />
                  {formik?.errors?.class_id && (
                    <div className={configClass.formError}>
                      {formik?.errors?.class_id?.toString()}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className='row'>
              <div className='col-auto my-10px'>
                <div className='' style={{ width: '120px' }}>
                  <div className={configClass?.label}>Harga</div>
                  <div className='btn btn-outline btn-outline-secondary w-100 px-10px py-10px radius-10'>
                    <div className='form-check'>
                      <label className='form-check-label d-flex align-items-center gap-5px'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={formik?.values?.isFree}
                          onChange={(e) => {
                            formik.setFieldValue('isFree', e?.target?.checked)
                          }}
                        />
                        <div className='fw-bold lh-2 me-5px text-dark fs-13px'>Free</div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {!formik?.values?.isFree && (
                <div className='col my-10px'>
                  <div className={configClass?.label}>Masukan Harga</div>
                  <InputCurrency
                    defaultValue={formik?.values?.fee}
                    prefix='Rp.'
                    placeholder='Masukan Harga'
                    onChange={(e: any) => formik.setFieldValue('fee', e?.floatValue || '')}
                  />
                  {formik?.errors?.fee && (
                    <div className={configClass.formError}>{formik?.errors?.fee?.toString()}</div>
                  )}
                </div>
              )}
            </div>
            <div className='row'>
              <div className='col-auto my-10px'>
                <div className='' style={{ width: '120px' }}>
                  <div className={configClass?.label}>Kuota</div>
                  <div className='btn btn-outline btn-outline-secondary w-100 px-10px py-10px radius-10'>
                    <div className='form-check'>
                      <label className='form-check-label d-flex align-items-center gap-5px'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={formik?.values?.isUnlimited}
                          onChange={(e) => formik.setFieldValue('isUnlimited', e?.target?.checked)}
                        />
                        <div className='fw-bold lh-2 me-5px text-dark fs-13px'>Unlimited</div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {!formik?.values?.isUnlimited && (
                <div className='col my-10px'>
                  <div className={configClass?.label}>Masukan Kuota</div>
                  <InputCurrency
                    defaultValue={formik?.values?.quota}
                    placeholder='Kuota'
                    onChange={(e: any) => formik.setFieldValue('quota', e?.floatValue || '')}
                  />
                  {formik?.errors?.quota && Boolean(!formik?.values?.quota) && (
                    <div className={configClass.formError}>{formik?.errors?.quota?.toString()}</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
            <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
              <div className='fs-14px'>Tutup</div>
            </div>
            <button
              type='submit'
              disabled={submitBtnIsLoading}
              className='btn btn-sm btn-primary btn-flex flex-center px-15px gap-10px'>
              {submitBtnIsLoading ? (
                <span className='indicator-progress d-block fs-14px'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <>
                  <i className='fas fa-plus p-0 text-white fs-14px mb-1px' />
                  <div className='fs-14px me-5px'>{detail?.id ? 'Ubah' : 'Tambahkan'}</div>
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
