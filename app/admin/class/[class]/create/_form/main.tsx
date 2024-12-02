import { getTrainer } from '@api/users'
import InputCurrency from '@components/form/InputCurrency'
import TextEditor from '@components/form/TextEditor'
import { Select as SelectAjax } from '@components/select/ajax'
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
    <div className='bg-white shadow-xs radius-15'>
      <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
        <div className='fas fa-info-circle me-10px' />
        <div className='fw-bold fs-14px'>Upload Gambar</div>
        <div className='fw-bold ms-5px'>(max. 5)</div>
      </div>
      <div className='px-20px py-10px'>
        <div className='row'>
          <div className='col-12 my-10px'>
            <div className={configClass?.label}>Nama Progam</div>
            <input
              type='text'
              placeholder='Masukan Nama Program'
              // autoComplete='off'
              name='name'
              className={configClass?.form}
              onChange={formik.handleChange}
              value={formik.values?.name}
            />
            {formik?.errors?.name && (
              <div className={configClass.formError}>{formik?.errors?.name}</div>
            )}
          </div>
          <div className='col-lg-4 my-10px'>
            <div className={configClass?.label}>Harga Default</div>
            <InputCurrency
              prefix='Rp.'
              placeholder='Masukan Harga Default'
              onChange={(e: any) => {
                formik.setFieldValue('default_fee', e?.floatValue || 0)
              }}
            />
          </div>
          <div className='col-auto my-10px'>
            <div className={configClass?.label}>Gender</div>
            <SelectData
              sm={true}
              name='gender'
              className='p-0 text-start'
              data={[
                { value: 1, label: 'Pria' },
                { value: 2, label: 'Wanita' },
                { value: 3, label: 'Campuran' },
              ]}
              isClearable={false}
              placeholder='Pilih Gender'
              defaultValue={formik.initialValues?.gender}
              styleOption={{
                control: {
                  border: '1px solid #eee',
                  borderRadius: '5px',
                  width: 150,
                  height: 42,
                },
                placeholder: { color: '#000' },
              }}
              onChange={(e: any) => {
                formik.setFieldValue('gender', e?.value)
              }}
            />
          </div>
          <div className='col my-10px'>
            <div className={configClass?.label}>Trainer Default</div>
            <SelectAjax
              api={getTrainer}
              reload={false}
              sm={true}
              name='default_trainer_id'
              // className='w-100'
              isClearable={false}
              placeholder='Pilih Trainer'
              defaultValue={undefined}
              parse={(e: any) => {
                return {
                  value: e?.id,
                  label: e?.full_name,
                }
              }}
              // formatOptionLabel={(e: any) => (
              //   <div className='d-flex align-items-center'>
              //     <div className=''>{e?.label}</div>
              //   </div>
              // )}
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
                formik.setFieldValue('default_trainer', e)
              }}
            />
          </div>
          <div className='col-12 my-10px'>
            <div className={configClass?.label}>Deskripsi Program</div>
            <TextEditor
              id='editor'
              options={{ minHeight: '300px' }}
              placeholder='Tulis deskripsi disini...'
              defaultData=''
              onChange={(e: any) => {
                formik.setFieldValue('description', e)
              }}
              loading={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
