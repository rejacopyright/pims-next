'use client'

import { getAppBanner } from '@api/settings'
import { compressImage } from '@components/form/ImageUploader'
import Tooltip from '@components/tooltip'
import { blobToBase64 } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, FC, useRef, useState } from 'react'

import { Filter } from './_parts/Filter'
import ModalAddEditImage from './_parts/ModalAddEditImage'
import ModalDelete from './_parts/ModalDelete'

const Index: FC<any> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [showModalAddEdit, setShowModalAddEdit] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
  const [tmpDetail, setTmpDetail] = useState<any>()

  const detailQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getAppBanner'],
    queryFn: async () => {
      const api = await getAppBanner()
      const newData = api?.data
      return newData
    },
  })

  const appBanner = detailQuery?.data?.data || []

  const updateImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.length && event?.target?.files?.[0]) {
      const files = await compressImage(event?.target?.files?.[0])
      const result: any = await blobToBase64(files)
      new Promise((resolve) => resolve(setTmpDetail((prev) => ({ ...prev, image: result })))).then(
        () => {
          setShowModalAddEdit(true)
        }
      )
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <div className='content'>
        <title>User | Regular</title>
        <Filter
          onClickAdd={() => {
            setTmpDetail(undefined)
            fileInputRef.current?.click()
          }}
        />
        <input
          ref={fileInputRef}
          type='file'
          multiple={false}
          accept='image/*'
          style={{ display: 'none' }}
          onChange={updateImage}
        />
        <div className='row'>
          {appBanner?.map((item, key: number) => (
            <div key={key} className='col-12 my-10px'>
              <div className='bg-white border radius-10 overflow-hidden d-flex card-2'>
                <div
                  className='w-200px h-auto me-10px position-relative'
                  style={{
                    minHeight: '100px',
                    background: `#fff url(${item?.image || '/media/placeholder/blank-image.svg'}) center / contain no-repeat`,
                  }}>
                  <div className='position-absolute'>
                    <div
                      className='d-flex flex-center w-25px h-25px bg-primary text-white fw-bold'
                      style={{ borderBottomRightRadius: '5px' }}>
                      {item?.index}
                    </div>
                  </div>
                </div>
                <div className='col p-10px'>
                  <div className='fw-bolder'>{item?.title || '???'}</div>
                  <div className=''>{item?.sub_title || '???'}</div>
                </div>
                <div className='d-flex flex-center p-15px gap-10px'>
                  <Tooltip placement='left' title='Edit Banner'>
                    <div
                      className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                      onClick={() => {
                        new Promise((resolve) => resolve(setTmpDetail(item))).then(() => {
                          setShowModalAddEdit(true)
                        })
                      }}>
                      <div className='fas fa-pen-alt fs-14px' />
                    </div>
                  </Tooltip>
                  <Tooltip placement='left' title='Hapus Banner'>
                    <div
                      className='btn btn-light-danger btn-flex flex-center p-0 w-30px h-30px radius-50'
                      onClick={() => {
                        new Promise((resolve) => resolve(setTmpDetail(item))).then(() => {
                          setShowModalDelete(true)
                        })
                      }}>
                      <div className='fas fa-trash-alt fs-14px' />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add / Edit Banner */}
      <ModalAddEditImage
        detail={tmpDetail}
        show={showModalAddEdit}
        setShow={setShowModalAddEdit}
        queryKey={['getAppBanner']}
        fileInputRef={fileInputRef}
      />
      {/* Modal Delete Banner */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getAppBanner']}
      />
    </>
  )
}

export default Index
