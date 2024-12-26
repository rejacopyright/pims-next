'use client'

import { getConfig, updateConfig } from '@api/settings'
import { ToastMessage } from '@components/toast'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import * as Yup from 'yup'

const FormMain = dynamic(() => import('./_form/main'))

export interface FormValues {
  visit_fee?: number
  service_fee?: number
  app_fee?: number
}

const validationSchema = Yup.object().shape({
  visit_fee: Yup.number().required('Kolom wajib diisi'),
  service_fee: Yup.number().required('Kolom wajib diisi'),
  app_fee: Yup.number().required('Kolom wajib diisi'),
})

const Index: FC<any> = () => {
  const router = useRouter()

  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  const initialValues = {
    visit_fee: '',
    service_fee: '',
    app_fee: '',
  }

  const detailQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getConfig'],
    queryFn: async () => {
      const api = await getConfig()
      const newData = api?.data
      return newData
    },
  })

  const detail = detailQuery?.data || {}

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (val: any) => {
      setSubmitBtnIsLoading(true)

      const params: FormValues = {
        visit_fee: val?.visit_fee,
        service_fee: val?.service_fee,
        app_fee: val?.app_fee,
      }

      updateConfig(params)
        .then(({ data }: any) => {
          if (data?.status === 'success') {
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

  return (
    <div className='content'>
      <form action='' onSubmit={formik.handleSubmit}>
        <div className='py-10px' />
        <FormMain formik={formik} detail={detail} />
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
