import { createAppBanner, updateAppBanner } from '@api/settings'
import InputCurrency from '@components/form/InputCurrency'
import { ToastMessage } from '@components/toast'
import Tooltip from '@components/tooltip'
import { configClass, urlToBase64 } from '@helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FC, RefObject, useRef, useState } from 'react'
import { CropperRef, FixedCropper, ImageRestriction } from 'react-advanced-cropper'
import { Modal } from 'react-bootstrap'
import * as Yup from 'yup'

export interface FormValues {
  index?: number
  title?: string
  sub_title?: string
  image?: any
  isImageChanged?: boolean
}

const validationSchema = Yup.object().shape({
  index: Yup.number().required('Index wajib diisi').min(1, 'Minimal 1'),
  title: Yup.string().required('Title wajib diisi'),
  sub_title: Yup.string().required('Subtitle wajib diisi'),
})

interface FormProps {
  queryKey?: any[]
  detail: any
  show: boolean
  setShow: (e: boolean) => void
  fileInputRef: RefObject<HTMLInputElement>
}

const Index: FC<FormProps> = ({ detail, show, setShow, queryKey, fileInputRef }) => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const cropperRef = useRef<any>(null)
  const queryClient = useQueryClient()

  const initialValues = {
    index: detail?.index || '',
    title: detail?.title || '',
    sub_title: detail?.sub_title || '',
    image: detail?.image || '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (val: any) => {
      setBtnLoading(true)

      const base64image = cropperRef?.current?.getCanvas()?.toDataURL()

      // Check If Image is changed
      const imagefromAPI = await urlToBase64(detail?.image)
      const isImageChanged = base64image !== imagefromAPI

      const params: FormValues = {
        index: val?.index,
        title: val?.title,
        sub_title: val?.sub_title,
        image: base64image,
        isImageChanged,
      }

      // if (detail?.id === 'xxx') {
      const apiInstance = detail?.id
        ? updateAppBanner(detail?.id as string, params)
        : createAppBanner(params)
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
        .finally(() => setBtnLoading(false))
      // }
    },
  })

  const onInteractionEnd = (_e: CropperRef) => ''

  return (
    <Modal
      centered
      dialogClassName='modal-md'
      contentClassName='radius-15'
      show={show}
      backdrop='static'
      onHide={() => setShow(false)}>
      <Modal.Body className='p-0'>
        <form action='' onSubmit={formik.handleSubmit}>
          <div className='bg-white shadow-xs radius-15'>
            <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
              <div className='fas fa-info-circle me-10px' />
              <div className='fw-bold fs-14px'>Banner Aplikasi</div>
            </div>
            <div className='px-20px py-10px'>
              <div className='row'>
                <div className='col-auto my-10px'>
                  <div className={configClass?.label}>Index</div>
                  <div className='w-125px'>
                    <InputCurrency
                      defaultValue={detail?.index}
                      placeholder='Index'
                      onChange={(e: any) => {
                        formik.setFieldValue('index', e?.floatValue || '')
                      }}
                    />
                  </div>
                  {formik?.touched?.index && formik?.errors?.index && (
                    <div className={configClass.formError}>{formik?.errors?.index?.toString()}</div>
                  )}
                </div>
                <div className='col my-10px'>
                  <div className={configClass?.label}>Title</div>
                  <input
                    type='text'
                    placeholder='Masukan Title'
                    // autoComplete='off'
                    name='title'
                    className={configClass?.form}
                    onChange={formik.handleChange}
                    value={formik.values?.title}
                  />
                  {formik?.touched?.title && formik?.errors?.title && (
                    <div className={configClass.formError}>{formik?.errors?.title?.toString()}</div>
                  )}
                </div>
                <div className='col-12 my-10px'>
                  <div className={configClass?.label}>Subtitle</div>
                  <input
                    type='text'
                    placeholder='Masukan Subtitle'
                    name='sub_title'
                    className={configClass?.form}
                    onChange={formik.handleChange}
                    value={formik.values?.sub_title}
                  />
                  {formik?.touched?.sub_title && formik?.errors?.sub_title && (
                    <div className={configClass.formError}>
                      {formik?.errors?.sub_title?.toString()}
                    </div>
                  )}
                </div>
                <div className='col-12 my-10px'>
                  <div className='position-relative'>
                    {detail?.image ? (
                      <FixedCropper
                        ref={cropperRef}
                        src={detail?.image}
                        className={'cropper border radius-10'}
                        backgroundClassName='bg-white'
                        imageRestriction={ImageRestriction?.stencil}
                        stencilSize={{
                          width: 500,
                          height: 250,
                        }}
                        stencilProps={{
                          handlers: false,
                          lines: false,
                          movable: false,
                          resizable: false,
                        }}
                        onInteractionEnd={onInteractionEnd}
                      />
                    ) : (
                      <div
                        className='w-100 h-100px border radius-10'
                        style={{
                          background: `#fff url(/media/placeholder/blank-image.svg) center / contain no-repeat`,
                        }}
                      />
                    )}

                    <div className='position-absolute' style={{ bottom: '5px', right: '5px' }}>
                      <Tooltip placement='left' title='Ganti Gambar'>
                        <div
                          className='btn btn-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                          onClick={() => fileInputRef?.current?.click?.()}>
                          <div className='fas fa-image fs-14px' />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
            <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
              <div className='fs-14px'>Tutup</div>
            </div>
            <button
              type='submit'
              disabled={btnLoading}
              className='btn btn-sm btn-primary btn-flex flex-center px-15px gap-10px'>
              {btnLoading ? (
                <span className='indicator-progress d-block fs-14px'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <>
                  <i className='fas fa-check p-0 text-white fs-14px mb-1px' />
                  <div className='fs-14px me-5px'>Simpan</div>
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
