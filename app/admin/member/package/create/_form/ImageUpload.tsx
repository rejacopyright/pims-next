import { ImageUploaderSingle } from '@components/form/ImageUploaderSingle'
import { FormikProps } from 'formik'
import { FC, useEffect, useState } from 'react'

import { FormValues } from '../page'

interface FormProps {
  formik: FormikProps<FormValues>
}

const Index: FC<FormProps> = ({ formik }) => {
  const [image, setImage] = useState<any>()
  useEffect(() => {
    setImage(formik.values?.image)
  }, [formik.values?.image])
  return (
    <div className='row'>
      {Boolean(image) && (
        <div className='col-auto my-10px mx-auto'>
          <div
            className='w-150px h-150px btn border border-gray-300 d-flex flex-center position-relative radius-15'
            style={{
              background: `#fff url(${typeof image === 'string' ? image : URL.createObjectURL(image)}) center / contain no-repeat`,
            }}>
            <div className='position-absolute top-0 end-0 p-4px'>
              <div
                className='btn btn-danger btn-flex flex-center p-0 w-25px h-25px radius-15'
                onClick={() => {
                  setImage('')
                  formik.setFieldValue('image', '')
                }}>
                <div className='fas fa-times m-0' />
              </div>
            </div>
          </div>
        </div>
      )}
      {!image && (
        <div className='col-auto my-10px mx-auto'>
          <div className='w-150px h-150px'>
            <ImageUploaderSingle
              onChange={(e: any) => {
                if (e) {
                  setImage(e)
                  formik.setFieldValue('image', e)
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Index
