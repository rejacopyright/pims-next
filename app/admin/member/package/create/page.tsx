'use client'

import { createMemberPackage, getDetailMemberPackage, updateMemberPackage } from '@api/member'
import { ToastMessage } from '@components/toast'
import { APP_ADMIN_PATH, blobToBase64, urlToBase64 } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'
import * as Yup from 'yup'

const FormImage = dynamic(() => import('./_form/ImageUpload'))
const FormMain = dynamic(() => import('./_form/main'))
const FormFeatures = dynamic(() => import('./_form/Features'))

export interface FormValues {
  level: any
  name: any
  fee: any
  fee_before?: any
  duration?: any
  quota_visit_per_day?: any
  quota_class_per_day?: any
  description?: any
  tnc?: any
  image?: any
  isImageChanged?: boolean
  features?: any
}

const validationSchema = Yup.object().shape({
  level: Yup.number().required('Level wajib diisi').min(1, 'Level minimal harus 1'),
  name: Yup.string().required('Nama wajib diisi'),
  fee: Yup.number()
    .required('Harga Paket wajib diisi')
    .when('fee_before', {
      is: (val) => val > 0,
      then: () => Yup.number().required('Harga paket wajib diisi jika ada harga sebelum diskon'),
    }),
  fee_before: Yup.number()
    .when({
      is: 0,
      then: () => Yup.number().min(1, 'Harga paket minimal harus 1'),
    })
    .moreThan(Yup.ref('fee'), 'Nominal harus lebih besar dari Harga Paket'),
  duration: Yup.number().required('Durasi wajib diisi').min(1, 'Durasi minimal harus 1'),
})

const Index: FC<any> = () => {
  const searchParams: any = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const id = queryParams?.id
  const isEdit: boolean = searchParams?.has('id') && Boolean(id)
  const router = useRouter()

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const detailPackageQuery: any = useQuery({
    // initialData: {data: []},
    enabled: isEdit,
    queryKey: ['getDetailMemberPackage', { id }],
    queryFn: async () => {
      const api = await getDetailMemberPackage(id as string)
      const newData = api?.data
      if (api?.data?.badge) {
        newData.image = await urlToBase64(api?.data?.badge)
      }
      return newData
    },
  })

  const detailPackage = detailPackageQuery?.data || {}

  const initialValues = {
    level: detailPackage?.level || '',
    name: detailPackage?.name || '',
    fee: detailPackage?.fee || '',
    fee_before: detailPackage?.fee_before || '',
    duration: detailPackage?.duration || '',
    quota_visit_per_day: detailPackage?.quota_visit_per_day || 0,
    quota_class_per_day: detailPackage?.quota_class_per_day || 2,
    description: detailPackage?.description || '',
    tnc: detailPackage?.tnc || '',
    image: detailPackage?.badge || '',
    features: detailPackage?.member_features
      ? detailPackage?.member_features?.map(({ index, value, title, sub_title }) => ({
          index,
          value,
          title,
          sub_title,
        }))
      : [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (val: any) => {
      // setSubmitBtnIsLoading(true)

      let base64image = formik.values?.image
      if (typeof formik.values?.image !== 'string') {
        base64image = await blobToBase64(formik.values?.image)
      }

      // Check If Image is changed
      const imagefromAPI = detailPackage?.badge
      const imagefromFormik = base64image
      const isImageChanged = imagefromFormik !== imagefromAPI

      const params: FormValues = {
        level: val?.level,
        name: val?.name,
        fee: val?.fee,
        fee_before: val?.fee_before,
        duration: val?.duration,
        quota_visit_per_day: val?.quota_visit_per_day,
        quota_class_per_day: val?.quota_class_per_day,
        description: val?.description,
        tnc: val?.tnc,
        image: base64image,
        isImageChanged,
        features: val?.features,
      }

      const apiInstance =
        isEdit && id ? updateMemberPackage(id as string, params) : createMemberPackage(params)
      apiInstance
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            ToastMessage({ type: 'success', message: data?.message })
            router.push(`${APP_ADMIN_PATH}/member/package`)
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
        <div className='bg-white shadow-xs radius-15 mb-20px'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <div className='fas fa-info-circle me-10px' />
            <div className='fw-bold fs-14px'>Gambar Paket</div>
          </div>
          <div className='px-20px py-10px'>
            <FormImage formik={formik} />
          </div>
        </div>
        <div className='bg-white shadow-xs radius-15 mb-20px'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <div className='fas fa-info-circle me-10px' />
            <div className='fw-bold fs-14px'>Detail Paket</div>
          </div>
          <div className='px-20px py-10px'>
            <FormMain formik={formik} />
          </div>
        </div>
        <div className='bg-white shadow-xs radius-15 mb-20px'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <div className='fas fa-info-circle me-10px' />
            <div className='fw-bold fs-14px'>Fitur Paket</div>
          </div>
          <div className='px-20px py-10px'>
            <FormFeatures formik={formik} />
          </div>
        </div>
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
