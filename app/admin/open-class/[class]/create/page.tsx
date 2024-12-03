'use client'

import { API_SERVER } from '@api/axios'
import { createClass, getDetailClass, updateClass } from '@api/class'
import { ToastMessage } from '@components/toast'
import { APP_ADMIN_PATH, blobToBase64, urlToBase64 } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, use, useEffect, useState } from 'react'
import * as Yup from 'yup'

const FormImage = dynamic(() => import('./_form/ImageUpload'))
const FormMain = dynamic(() => import('./_form/main'))

export interface FormValues {
  service_id: number
  images: any[]
  name?: string
  default_fee?: number
  gender?: number
  default_trainer_id?: { value: any; label: any }
  description?: string
  isImageChanged?: boolean
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nama wajib diisi'),
})

const Index: FC<any> = ({ params }) => {
  const thisParams: any = use(params)
  const searchParams: any = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const class_id = queryParams?.id
  const isEdit: boolean = searchParams?.has('id') && Boolean(class_id)
  const classType = thisParams?.class
  const router = useRouter()

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const initialValues = {
    images: [],
    name: '',
    default_fee: '',
    default_trainer_id: {},
    gender: 3,
    description: '',
  }

  const detailClassQuery: any = useQuery({
    // initialData: {data: []},
    enabled: isEdit,
    queryKey: ['getDetailClass', { id: class_id }],
    queryFn: async () => {
      const api = await getDetailClass(class_id as string)
      const newData = api?.data
      newData.images = await Promise.all(
        newData?.class_gallery?.map(async (img) => {
          const base64Img = await urlToBase64(`${API_SERVER}/static/images/class/${img?.filename}`)
          return { index: img?.index, img: base64Img }
        })
      )

      return newData
    },
  })

  const detailClass = detailClassQuery?.data || {}

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (val: any) => {
      // setSubmitBtnIsLoading(true)

      const base64images = await Promise.all(
        formik.values?.images?.map(async (item: any) => {
          let img = item?.img
          if (typeof item?.img !== 'string') {
            img = await blobToBase64(item?.img)
          }
          return { ...item, img }
        })
      )

      // Check If Image is changed
      const imagefromAPI = detailClass?.images?.map((item) => item?.img)?.join()
      const imagefromFormik = base64images?.map((item) => item?.img)?.join()
      const isImageChanged = imagefromFormik !== imagefromAPI

      const params: FormValues = {
        service_id: classType === 'studio' ? 2 : classType === 'functional' ? 3 : 2,
        name: val?.name,
        default_fee: val?.default_fee,
        default_trainer_id: val?.default_trainer?.value,
        gender: val?.gender || '',
        description: val?.description || '',
        images: base64images || [],
        isImageChanged,
      }

      const apiInstance =
        isEdit && class_id ? updateClass(class_id as string, params) : createClass(params)
      apiInstance
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

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        images: detailClass?.images || [],
        name: detailClass?.name || '',
        default_fee: detailClass?.default_fee || '',
        default_trainer_id: detailClass?.default_trainer?.id
          ? {
              value: detailClass?.default_trainer?.id,
              label: `${detailClass?.default_trainer?.first_name} ${detailClass?.default_trainer?.last_name}`,
            }
          : {},
        gender: detailClass?.gender || 3,
        description: detailClass?.description || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailClass, isEdit])
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
