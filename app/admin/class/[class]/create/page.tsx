'use client'

import { createClass } from '@api/class'
import { ToastMessage } from '@components/toast'
import { APP_ADMIN_PATH, blobToBase64 } from '@helpers'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC, use, useState } from 'react'
import * as Yup from 'yup'

const FormImage = dynamic(() => import('./_form/image'))
const FormMain = dynamic(() => import('./_form/main'))

export interface FormValues {
  service_id: number
  images: any[]
  name?: string
  default_fee?: number
  gender?: number
  default_trainer_id?: string
  description?: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nama wajib diisi'),
})

const Index: FC<any> = ({ params }) => {
  const thisParams: any = use(params)
  const classType = thisParams?.class
  const router = useRouter()

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      images: [],
      name: '',
      default_fee: '',
      gender: 3,
    },
    validationSchema,
    onSubmit: async (val: any) => {
      setSubmitBtnIsLoading(true)
      const base64images = await Promise.all(
        formik.values?.images?.map(async (item: any) => {
          const img = await blobToBase64(item?.img)
          return { ...item, img }
        })
      )

      const params: FormValues = {
        service_id: classType === 'studio' ? 2 : classType === 'functional' ? 3 : 2,
        name: val?.name,
        default_fee: val?.default_fee,
        default_trainer_id: val?.default_trainer?.value,
        gender: val?.gender || '',
        description: val?.description || '',
        images: base64images || [],
      }

      createClass(params)
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            ToastMessage({ type: 'success', message: data?.message })
            router.push(`${APP_ADMIN_PATH}/class/${classType}`)
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
  return (
    <div className='content'>
      <form action='' onSubmit={formik.handleSubmit}>
        <FormImage formik={formik} />
        <div className='py-10px' />
        <FormMain formik={formik} />
        <div
          className='my-30px text-end position-sticky bottom-0 border bg-white radius-10 p-16px'
          style={{ zIndex: 1 }}>
          <div className='d-flex align-items-center justify-content-end gap-10px'>
            <button
              type='button'
              disabled={submitBtnIsLoading}
              className='btn btn-light'
              onClick={() => router.back()}>
              Kembali
            </button>
            <button type='submit' disabled={submitBtnIsLoading} className='btn btn-primary'>
              {!submitBtnIsLoading ? (
                'Submit'
              ) : (
                <span className='indicator-progress d-block'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Index
