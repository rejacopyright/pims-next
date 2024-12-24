'use client'
import { getTrainer } from '@api/users'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { isDev } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useRef, useState } from 'react'
import * as xlsx from 'xlsx'

import { Filter } from './_parts/Filter'
import ModalAddItem from './_parts/ModalAdd'
import ModalDelete from './_parts/ModalDelete'
import ModalImport from './_parts/ModalImport'
import ModalView from './_parts/ModalView'

const Index: FC<any> = () => {
  const fileImportRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = '1', limit = '5' } = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false)
  const [dataImport, setDataImport] = useState<any[]>([])
  const [showModalImport, setShowModalImport] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataTrainerQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataTrainerQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getTrainer', dataTrainerQueryParams],
    queryFn: () => getTrainer(dataTrainerQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataTrainer: any = dataTrainerQuery?.data?.data || []
  const dataTrainerTotal = dataTrainerQuery?.data?.total || 0
  const pageIsLoading: any = !dataTrainerQuery?.isFetched

  return (
    <div className='content'>
      <title>Trainer</title>
      <Filter
        onClickAdd={() => {
          setTmpDetail(undefined)
          setShowModalAdd(true)
        }}
        onClickImport={() => {
          fileImportRef.current?.click()
        }}
      />
      <input
        ref={fileImportRef}
        type='file'
        multiple={false}
        accept='.csv, .xls, .xlsx, application/sheet, application/ms-excel, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e?.target?.files?.length) {
            const reader = new FileReader()
            reader.onloadend = async (e) => {
              const data = e?.target?.result
              const workbook = xlsx.read(data, { type: 'array' })
              const sheetName = workbook.SheetNames[0]
              const worksheet = workbook.Sheets[sheetName]
              const jsonArr = xlsx.utils.sheet_to_json(worksheet)
              const result = jsonArr?.map((item: any) => {
                const newItem: any = item
                newItem.role_id = 3
                newItem.ref = 3
                newItem.first_name = item?.first_name?.toString()
                newItem.last_name = item?.last_name?.toString()
                newItem.username = item?.username?.toString()
                newItem.phone = item?.phone?.toString()
                newItem.password = (item?.password || 1234)?.toString()
                return newItem
              })
              await setDataImport(result)
              setShowModalImport(true)
            }
            reader.readAsArrayBuffer(e.target.files[0])
          }
          if (fileImportRef.current) {
            fileImportRef.current.value = ''
          }
        }}
      />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        <div className='fs-12px'>Total</div>
        <div className='fs-12px'>:</div>
        <div className='fw-700 text-primary'>{dataTrainerTotal}</div>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getTrainer'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='bg-white shadow-xs mb-50px'>
        <Table
          loading={pageIsLoading}
          stickyHeader
          data={dataTrainer}
          pagination
          total={dataTrainerTotal}
          columnClasses={{ image: 'text-center' }}
          headers={[
            { value: 'image', label: '#', className: 'text-center', width: 0, sort: false },
            { value: 'name', label: 'Nama', className: 'text-start', sort: false },
            { value: 'email', label: 'Email', className: 'text-start', sort: false },
            { value: 'phone', label: 'No. Handphone', className: 'text-start', sort: false },
            { value: 'actions', label: '', className: 'text-center', width: 0, sort: false },
          ]}
          tdClass='px-20px py-10px fs-13px'
          render={(e: any, _original: any) => {
            return {
              name: () => (
                <div className=''>
                  <div className='text-wrap'>{_original?.full_name}</div>
                  <div className='fs-11px text-gray-600'>{_original?.username}</div>
                </div>
              ),
              image: () => {
                const img = _original?.avatar_link
                if (img) {
                  return (
                    <div
                      className='w-50px h-50px radius-50 border'
                      style={{
                        background: `#fff url(${img}) center / cover no-repeat`,
                      }}
                    />
                  )
                } else {
                  return (
                    <div
                      className='w-50px h-50px radius-50 border'
                      style={{
                        background: `#fff url(/media/placeholder/avatar.svg) center / cover no-repeat`,
                      }}
                    />
                  )
                }
              },
              actions: () => {
                return (
                  <div className='d-flex flex-center gap-10px'>
                    <Tooltip placement='top' title='Lihat detail kelas'>
                      <button
                        type='button'
                        disabled={_original?.service_id === 1}
                        className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          new Promise((resolve) => resolve(setTmpDetail(_original))).then(() =>
                            setShowModalView(true)
                          )
                        }}>
                        <div className='fas fa-eye' />
                      </button>
                    </Tooltip>
                    <Tooltip placement='top' title='Edit paket'>
                      <div
                        className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          new Promise((resolve) => resolve(setTmpDetail(_original))).then(() => {
                            setShowModalAdd(true)
                          })
                        }}>
                        <div className='fas fa-pen-alt' />
                      </div>
                    </Tooltip>
                    <Tooltip placement='auto' title='Hapus paket'>
                      <div
                        className='btn btn-light-danger btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          setTmpDetail(_original)
                          setShowModalDelete(true)
                        }}>
                        <div className='fas fa-trash-alt' />
                      </div>
                    </Tooltip>
                  </div>
                )
              },
            }
          }}
        />
      </div>
      {/* Modal View */}
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />
      {/* Modal Add Item */}
      <ModalAddItem
        show={showModalAdd}
        setShow={setShowModalAdd}
        detail={tmpDetail}
        queryKey={['getTrainer', dataTrainerQueryParams]}
      />
      {/* Modal Delete Item */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getTrainer', dataTrainerQueryParams]}
      />
      {/* Modal Delete Item */}
      <ModalImport
        show={showModalImport}
        setShow={setShowModalImport}
        data={dataImport}
        queryKey={['getTrainer', dataTrainerQueryParams]}
      />
    </div>
  )
}

export default Index
