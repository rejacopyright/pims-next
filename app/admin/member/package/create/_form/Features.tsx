import InputCurrency from '@components/form/InputCurrency'
import { configClass } from '@helpers'
import { FormikProps } from 'formik'
import keys from 'lodash/keys'
import orderBy from 'lodash/orderBy'
import pickBy from 'lodash/pickBy'
import { FC, useEffect, useState } from 'react'

import { FormValues } from '../page'

interface FormProps {
  formik: FormikProps<FormValues>
}

const CardEdit: FC<any> = ({ item, indexes, onChange = () => '', onDelete = () => '' }) => {
  const [mode, setMode] = useState<any>('view')
  const [tmpValue, setTmpValue] = useState<any>(item)
  const requiredError = keys(pickBy(tmpValue, (val) => !val))?.[0]

  const setValue = (name: string, value: any) => {
    setTmpValue((prev) => ({ ...prev, [name]: value || undefined }))
  }

  const duplicateIndex = indexes?.includes(tmpValue?.index)

  useEffect(() => {
    setTmpValue(item)
  }, [item])

  return (
    <div className='border shadow-xs radius-10 mt-20px mb-10px overflow-hidden'>
      <div className='h-2px bg-primary' />
      <div className='px-15px py-5px'>
        {mode === 'view' ? (
          <div className='d-flex justify-content-between'>
            <div className='row align-items-center'>
              <div className='col-auto text-center my-10px'>
                <div className='bg-gray-100 px-3 py-1 radius-5'>
                  <div className={configClass.label}>Index</div>
                  <div className=''>{tmpValue?.index || ''}</div>
                </div>
              </div>
              <div className='col-auto my-10px'>
                <div className='bg-gray-100 px-3 py-1 radius-5'>
                  <div className={configClass.label}>Feature</div>
                  <div className=''>{tmpValue?.title || ''}</div>
                </div>
              </div>
              <div className='col-auto my-10px'>
                <div className='bg-gray-100 px-3 py-1 radius-5'>
                  <div className={configClass.label}>Value</div>
                  <div className=''>{tmpValue?.value || ''}</div>
                </div>
              </div>
              <div className='col-auto my-10px'>
                <div className='bg-gray-100 px-3 py-1 radius-5'>
                  <div className={configClass.label}>Subtitle</div>
                  <div className=''>{tmpValue?.sub_title || ''}</div>
                </div>
              </div>
            </div>
            <div className='row flex-nowrap'>
              <div className='col-auto ms-auto my-10px'>
                <button
                  type='button'
                  className='btn btn-flex flex-center h-40px btn-light-danger'
                  onClick={() => onDelete(item)}>
                  <i className='fas fa-trash-alt' />
                  <span className=''>Hapus</span>
                </button>
              </div>
              <div className='col-auto my-10px'>
                <button
                  type='button'
                  className='btn btn-flex flex-center h-40px btn-light-warning'
                  onClick={() => setMode('edit')}>
                  <i className='fas fa-pen' />
                  <span className=''>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='row'>
            {duplicateIndex ? (
              <div
                className={`text-danger fw-bold bg-light-danger d-flex flex-center p-10px radius-5 mb-10px gap-5px`}>
                <div className='fas fa-info-circle' />
                <div className=''>Index sudah ada</div>
              </div>
            ) : (
              requiredError && (
                <div
                  className={`text-danger fw-bold bg-light-danger d-flex flex-center p-10px radius-5 mb-10px gap-5px`}>
                  <div className='fas fa-info-circle' />
                  <div className=''>{requiredError} harus diisi</div>
                </div>
              )
            )}
            <div className='col-lg-2 my-10px'>
              <div className={configClass?.label}>Index</div>
              <InputCurrency
                // ref={(e: any) => (featuresRef.current.index = e)}
                placeholder='Index'
                max={99}
                defaultValue={tmpValue?.index || ''}
                onChange={(e) => setValue('index', parseInt(e?.floatValue))}
              />
            </div>
            <div className='col-lg-6 my-10px'>
              <div className={configClass?.label}>Feature</div>
              <input
                // ref={(e: any) => (featuresRef.current.title = e)}
                type='text'
                placeholder='Masukan Feature'
                className={configClass?.form}
                value={tmpValue?.title || ''}
                onChange={(e) => setValue('title', e?.target?.value)}
              />
            </div>
            <div className='col-lg-4 my-10px'>
              <div className={configClass?.label}>Value</div>
              <input
                // ref={(e: any) => (featuresRef.current.value = e)}
                type='text'
                placeholder='Masukan Value'
                className={configClass?.form}
                value={tmpValue?.value || ''}
                onChange={(e) => setValue('value', e?.target?.value)}
              />
            </div>
            <div className='col-lg my-10px'>
              <div className={configClass?.label}>Subtitle</div>
              <input
                // ref={(e: any) => (featuresRef.current.sub_title = e)}
                type='text'
                placeholder='Masukan Subtitle'
                className={configClass?.form}
                value={tmpValue?.sub_title || ''}
                onChange={(e) => setValue('sub_title', e?.target?.value)}
              />
            </div>
            <div className='col-auto ms-auto my-10px'>
              <button
                type='button'
                className='btn btn-flex flex-center h-40px btn-white text-dark mt-24px'
                onClick={() => {
                  setTmpValue(item)
                  setMode('view')
                }}>
                <i className='fas fa-times' />
                <span className=''>Tutup</span>
              </button>
            </div>
            <div className='col-auto my-10px'>
              <button
                type='button'
                disabled={requiredError || duplicateIndex}
                className='btn btn-flex flex-center h-40px btn-warning mt-24px'
                onClick={() => {
                  setMode('view')
                  onChange(tmpValue)
                }}>
                <i className='fas fa-pen' />
                <span className=''>Update</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Index: FC<FormProps> = ({ formik }) => {
  // const featuresRef: any = useRef([])
  const initialValue = {
    index: '',
    value: undefined,
    title: undefined,
    sub_title: undefined,
  }
  const [tmpValue, setTmpValue] = useState<any>(initialValue)
  const [features, setFeatures] = useState<any[]>([])
  const requiredError = keys(pickBy(tmpValue, (val) => !val))?.[0]

  const setValue = (name: string, value: any) => {
    setTmpValue((prev) => ({ ...prev, [name]: value || undefined }))
  }

  const duplicateIndex = features?.map(({ index }) => index)?.includes(tmpValue?.index)

  useEffect(() => {
    if (formik?.values?.features?.length > 0) {
      setFeatures(formik?.values?.features)
    }
  }, [formik?.values?.features])

  return (
    <div className=''>
      {duplicateIndex ? (
        <div
          className={`text-danger fw-bold bg-light-danger d-flex flex-center p-10px radius-5 mb-10px gap-5px`}>
          <div className='fas fa-info-circle' />
          <div className=''>Index sudah ada</div>
        </div>
      ) : (
        requiredError && (
          <div
            className={`text-danger fw-bold bg-light-danger d-flex flex-center p-10px radius-5 mb-10px gap-5px`}>
            <div className='fas fa-info-circle' />
            <div className=''>{requiredError} harus diisi</div>
          </div>
        )
      )}
      <div className='border shadow-xs px-10px radius-10'>
        <div className='row'>
          <div className='col-lg-2 my-10px'>
            <div className={configClass?.label}>Index</div>
            <InputCurrency
              // ref={(e: any) => (featuresRef.current.index = e)}
              placeholder='Index'
              max={99}
              reload={tmpValue?.index}
              defaultValue={tmpValue?.index || ''}
              onChange={(e) => setValue('index', parseInt(e?.floatValue))}
            />
          </div>
          <div className='col-lg-6 my-10px'>
            <div className={configClass?.label}>Feature</div>
            <input
              // ref={(e: any) => (featuresRef.current.title = e)}
              type='text'
              placeholder='Masukan Feature'
              className={configClass?.form}
              value={tmpValue?.title || ''}
              onChange={(e) => setValue('title', e?.target?.value)}
            />
          </div>
          <div className='col-lg-4 my-10px'>
            <div className={configClass?.label}>Value</div>
            <input
              // ref={(e: any) => (featuresRef.current.value = e)}
              type='text'
              placeholder='Masukan Value'
              className={configClass?.form}
              value={tmpValue?.value || ''}
              onChange={(e) => setValue('value', e?.target?.value)}
            />
          </div>
          <div className='col-lg my-10px'>
            <div className={configClass?.label}>Subtitle</div>
            <input
              // ref={(e: any) => (featuresRef.current.sub_title = e)}
              type='text'
              placeholder='Masukan Subtitle'
              className={configClass?.form}
              value={tmpValue?.sub_title || ''}
              onChange={(e) => setValue('sub_title', e?.target?.value)}
            />
          </div>
          <div className='col-auto ms-auto my-10px'>
            <button
              type='button'
              disabled={requiredError || duplicateIndex}
              className='btn btn-flex flex-center h-40px btn-dark mt-24px'
              onClick={() => {
                const result = [...features, tmpValue]
                setFeatures(result)
                formik.setFieldValue('features', result)
                setTmpValue(initialValue)
              }}>
              <i className='fas fa-plus' />
              <span className=''>Tambahkan</span>
            </button>
          </div>
        </div>
      </div>
      {orderBy(features, 'index')?.map((item, key: number) => {
        return (
          <CardEdit
            key={key}
            item={item}
            indexes={features?.filter((f) => f?.index !== item?.index)?.map((m) => m?.index)}
            onChange={(e) => {
              const result = features.map((m) => {
                let res = m
                if (res?.index === item?.index) {
                  res = e
                }
                return res
              })
              setFeatures(result)
              formik.setFieldValue('features', result)
            }}
            onDelete={(e) => {
              const result = features.filter((m) => m?.index !== e?.index)
              setFeatures(result)
              formik.setFieldValue('features', result)
            }}
          />
        )
      })}
    </div>
  )
}

export default Index
