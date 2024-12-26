import InputCurrency from '@components/form/InputCurrency'
import { configClass } from '@helpers'
import { FormikProps } from 'formik'
import { FC } from 'react'

import { FormValues } from '../page'

interface FormProps {
  formik: FormikProps<FormValues>
  detail: any
}

const Index: FC<FormProps> = ({ formik, detail }) => {
  return (
    <div className='bg-white shadow-xs radius-15'>
      <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
        <div className='fas fa-info-circle me-10px' />
        <div className='fw-bold fs-14px'>Pengaturan Harga</div>
      </div>
      <div className='px-20px py-10px'>
        <div className='row'>
          <div className='col-lg-4 my-10px'>
            <div className={configClass?.label}>Harga Gym Visit</div>
            <InputCurrency
              defaultValue={detail?.visit_fee}
              prefix='Rp.'
              placeholder='Masukan Harga'
              onChange={(e: any) => {
                formik.setFieldValue('visit_fee', e?.floatValue || 0)
              }}
            />
          </div>
          <div className='col-lg-4 my-10px'>
            <div className={configClass?.label}>Biaya Layanan</div>
            <InputCurrency
              defaultValue={detail?.service_fee}
              prefix='Rp.'
              placeholder='Masukan Harga'
              onChange={(e: any) => {
                formik.setFieldValue('service_fee', e?.floatValue || 0)
              }}
            />
          </div>
          <div className='col-lg-4 my-10px'>
            <div className={configClass?.label}>Biaya Aplikasi</div>
            <InputCurrency
              defaultValue={detail?.app_fee}
              prefix='Rp.'
              placeholder='Masukan Harga'
              onChange={(e: any) => {
                formik.setFieldValue('app_fee', e?.floatValue || 0)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
