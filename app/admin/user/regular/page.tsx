'use client'
import { getUserRegular } from '@api/users'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { isDev } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'

import { Filter } from './_parts/Filter'
import ModalAddItem from './_parts/ModalAdd'
import ModalDelete from './_parts/ModalDelete'
import ModalView from './_parts/ModalView'

const Index: FC<any> = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = '1', limit = '5' } = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalAddItem, setShowModalAddItem] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataUserRegularQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataUserRegularQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getUserRegular', dataUserRegularQueryParams],
    queryFn: () => getUserRegular(dataUserRegularQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataUserRegular: any = dataUserRegularQuery?.data?.data || []
  const dataUserRegularTotal = dataUserRegularQuery?.data?.total || 0
  const pageIsLoading: any = !dataUserRegularQuery?.isFetched

  return (
    <div className='content'>
      <title>User | Regular</title>
      <Filter
        onClickAdd={() => {
          setTmpDetail(undefined)
          setShowModalAddItem(true)
        }}
      />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        <div className='fs-12px'>Total</div>
        <div className='fs-12px'>:</div>
        <div className='fw-700 text-primary'>{dataUserRegularTotal}</div>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getUserRegular'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='bg-white shadow-xs mb-50px'>
        <Table
          loading={pageIsLoading}
          stickyHeader
          data={dataUserRegular}
          pagination
          total={dataUserRegularTotal}
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
                            setShowModalAddItem(true)
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
        show={showModalAddItem}
        setShow={setShowModalAddItem}
        detail={tmpDetail}
        queryKey={['getUserRegular', dataUserRegularQueryParams]}
      />

      {/* Modal Delete Item */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getUserRegular', dataUserRegularQueryParams]}
      />
    </div>
  )
}

export default Index
