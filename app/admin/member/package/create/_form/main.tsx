import InputCurrency from '@components/form/InputCurrency'
import TextEditor from '@components/form/TextEditor'
import { Select as SelectData } from '@components/select/select'
import { configClass } from '@helpers'
import { FormikProps } from 'formik'
import { FC } from 'react'

import { FormValues } from '../page'

interface FormProps {
  formik: FormikProps<FormValues>
}

const Index: FC<FormProps> = ({ formik }) => {
  return (
    <div className='row'>
      <div className='col-lg-9 my-10px'>
        <div className={configClass?.label}>Nama Paket</div>
        <input
          type='text'
          placeholder='Masukan Nama Paket'
          // autoComplete='off'
          name='name'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.name}
        />
        {formik?.touched?.name && formik?.errors?.name && (
          <div className={configClass.formError}>{formik?.errors?.name?.toString()}</div>
        )}
      </div>
      <div className='col-lg-3 my-10px'>
        <div className={configClass?.label}>Level Paket</div>
        <InputCurrency
          defaultValue={formik.values?.level}
          placeholder='Masukan Level Paket'
          onChange={(e: any) => formik.setFieldValue('level', e?.floatValue)}
        />
        {formik?.touched?.level && formik?.errors?.level && (
          <div className={configClass.formError}>{formik?.errors?.level?.toString()}</div>
        )}
      </div>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Harga Paket</div>
        <InputCurrency
          defaultValue={formik.values?.fee}
          prefix='Rp.'
          placeholder='Masukan Harga Paket'
          onChange={(e: any) => {
            formik.setFieldValue('fee', e?.floatValue)
          }}
        />
        {formik?.touched?.fee && formik?.errors?.fee && (
          <div className={configClass.formError}>{formik?.errors?.fee?.toString()}</div>
        )}
      </div>
      <div className='col-lg-6 my-10px'>
        <div className={configClass?.label}>Harga Paket Sebelum Diskon (Jika ada)</div>
        <InputCurrency
          defaultValue={formik.values?.fee_before}
          prefix='Rp.'
          placeholder='Masukan Harga Paket'
          onChange={(e: any) => {
            formik.setFieldValue('fee_before', e?.floatValue)
          }}
        />
        {formik?.errors?.fee_before && (
          <div className={configClass.formError}>{formik?.errors?.fee_before?.toString()}</div>
        )}
      </div>
      <div className='col-lg-4 my-10px'>
        <div className={configClass?.label}>Durasi Paket (Hari)</div>
        <InputCurrency
          defaultValue={formik.values?.duration}
          suffix='Hari'
          placeholder='Masukan Durasi Paket'
          onChange={(e: any) => {
            formik.setFieldValue('duration', e?.floatValue)
          }}
        />
        {formik?.touched?.duration && formik?.errors?.duration && (
          <div className={configClass.formError}>{formik?.errors?.duration?.toString()}</div>
        )}
      </div>
      <div className='col-lg-4 my-10px'>
        <div className={configClass?.label}>Limit Visit per Hari</div>
        <SelectData
          sm={true}
          name='quota_visit_per_day'
          className='p-0 text-start'
          data={[
            { value: 0, label: 'Unlimited' },
            ...Array(10)
              .fill('')
              .map((_, index: number) => ({ value: index + 1, label: `${index + 1}x` })),
          ]}
          isClearable={false}
          placeholder='Pilih Limit'
          defaultValue={formik.values?.quota_visit_per_day}
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
            formik.setFieldValue('quota_visit_per_day', e?.value)
          }}
        />
      </div>
      <div className='col-lg-4 my-10px'>
        <div className={configClass?.label}>Limit Kelas per Hari</div>
        <SelectData
          sm={true}
          name='quota_class_per_day'
          className='p-0 text-start'
          data={[
            { value: 0, label: 'Unlimited' },
            ...Array(10)
              .fill('')
              .map((_, index: number) => ({ value: index + 1, label: `${index + 1}x` })),
          ]}
          isClearable={false}
          placeholder='Pilih Limit'
          defaultValue={formik.values?.quota_class_per_day}
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
            formik.setFieldValue('quota_class_per_day', e?.value)
          }}
        />
      </div>
      <div className='col-12 my-10px'>
        <div className={configClass?.label}>Deskripsi Paket</div>
        <TextEditor
          options={{ minHeight: '150px' }}
          placeholder='Tulis deskripsi disini...'
          defaultData={formik?.values?.description || ''}
          onChange={(e: any) => {
            formik.setFieldValue('description', e)
          }}
          loading={false}
        />
      </div>
      <div className='col-12 my-10px'>
        <div className={configClass?.label}>Syarat & Ketentuan</div>
        <TextEditor
          options={{ minHeight: '250px' }}
          placeholder='Tulis Syarat & Ketentuan disini...'
          defaultData={formik?.values?.tnc || ''}
          onChange={(e: any) => {
            formik.setFieldValue('tnc', e)
          }}
          loading={false}
        />
      </div>
    </div>
  )
}

export default Index
