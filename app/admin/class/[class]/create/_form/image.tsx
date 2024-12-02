import { ImageUploader } from '@components/form/ImageUploader'
import { ToastMessage } from '@components/toast'
import { FormikProps } from 'formik'
import { FC, useState } from 'react'

import { FormValues } from '../page'

interface FormProps {
  formik: FormikProps<FormValues>
}

const Index: FC<FormProps> = ({ formik }) => {
  const [images, setImages] = useState<any>([])
  return (
    <div className='bg-white shadow-xs radius-15 overflow-hidden'>
      <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
        <div className='fas fa-info-circle me-10px' />
        <div className='fw-bold fs-14px'>Upload Gambar</div>
        <div className='fw-bold ms-5px'>(max. 5)</div>
      </div>
      <div className='px-20px py-10px'>
        <div className='row'>
          {images?.map(({ img, index }: any, key: number) => (
            <div key={key} className='col-auto my-10px'>
              <div
                className='w-150px h-150px btn border border-gray-300 d-flex flex-center position-relative radius-15'
                style={{
                  background: `#fff url(${URL.createObjectURL(img)}) center / cover no-repeat`,
                }}>
                {/*  */}
                <div className='position-absolute top-0 end-0 p-4px'>
                  <div
                    className='btn btn-danger btn-flex flex-center p-0 w-25px h-25px radius-15'
                    onClick={() => {
                      const result = images
                        ?.filter((f: any) => f?.index !== index)
                        ?.map((m: any, idx: number) => ({ ...m, index: idx + 1 }))
                      setImages(result)
                      formik.setFieldValue('images', result)
                    }}>
                    <div className='fas fa-times m-0' />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {images?.length < 5 && (
            <div className='col-auto my-10px'>
              <div className='w-150px h-150px'>
                <ImageUploader
                  onChange={(e: any) => {
                    const indexedFiles = (prev: any) => [
                      ...prev,
                      ...e?.map((img: any, idx: number) => ({
                        index: (prev?.length || 0) + idx + 1,
                        img,
                      })),
                    ]
                    if (indexedFiles(images)?.length > 5) {
                      ToastMessage({
                        type: 'error',
                        message: 'Gambar tidak boleh lebih dari 5',
                      })
                    } else {
                      setImages(indexedFiles)
                      formik.setFieldValue('images', indexedFiles(images))
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
