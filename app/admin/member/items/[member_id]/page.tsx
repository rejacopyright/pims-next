'use client'
import { API_SERVER } from '@api/axios'
import { getMemberItems } from '@api/member'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { isDev, toCurrency } from '@helpers'
import ModalViewClass from '@pages/admin/class/[class]/_parts/ModalView'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'

import { Filter } from './_parts/Filter'
import ModalAddItem from './_parts/ModalAddItem'
import ModalDelete from './_parts/ModalDelete'

const Index: FC<any> = () => {
  const queryClient = useQueryClient()
  const { member_id }: any = useParams()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = '1', limit = '5' } = queryParams

  const [tmpClassType, setTmpClassType] = useState<any>()
  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalViewClass, setShowModalViewClass] = useState<boolean>(false)
  const [showModalAddItem, setShowModalAddItem] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataMemberItemsQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataMemberItemsQuery: any = useQuery({
    // initialData: {data: []},
    enabled: Boolean(member_id),
    queryKey: ['getMemberItems', dataMemberItemsQueryParams],
    queryFn: () => getMemberItems(member_id, dataMemberItemsQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataMemberItems: any = dataMemberItemsQuery?.data?.data || []
  const dataMemberItemsTotal = dataMemberItemsQuery?.data?.total || 0
  const hasVisit = dataMemberItemsQuery?.data?.hasVisit
  const pageIsLoading: any = !dataMemberItemsQuery?.isFetched

  return (
    <div className='content'>
      <title>Member | Item</title>
      <Filter
        hasVisit={hasVisit}
        onClickAdd={(e) => {
          setTmpClassType(e)
          setTmpDetail(undefined)
          setShowModalAddItem(true)
        }}
      />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        <div className='fs-12px'>Total</div>
        <div className='fs-12px'>:</div>
        <div className='fw-700 text-primary'>{dataMemberItemsTotal}</div>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getMemberItems'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='bg-white shadow-xs mb-50px'>
        <Table
          loading={pageIsLoading}
          stickyHeader
          data={dataMemberItems}
          pagination
          total={dataMemberItemsTotal}
          columnClasses={{ fee: 'text-center', quota: 'text-center' }}
          headers={[
            { value: 'image', label: '#', className: 'text-start px-20px', width: 0, sort: false },
            { value: 'service_id', label: 'Tipe Servis', className: 'text-start', sort: false },
            { value: 'name', label: 'Nama Kelas', className: 'text-start', sort: false },
            { value: 'fee', label: 'Harga Member', className: 'text-center', sort: false },
            { value: 'quota', label: 'Limit', className: 'text-center', sort: false },
            { value: 'actions', label: '', className: 'text-center', width: 0, sort: false },
          ]}
          tdClass='px-20px py-10px fs-13px'
          render={(e: any, _original: any) => {
            const isVisit = _original?.service_id === 1
            return {
              name: () => (
                <div className=''>
                  <div className='text-wrap'>{isVisit ? 'Gym Visit' : _original?.class?.name}</div>
                  <div className='fs-11px text-gray-600'>
                    Rp. {toCurrency(isVisit ? _original?.visit_fee : _original?.class?.default_fee)}
                  </div>
                </div>
              ),
              fee: () =>
                !e ? (
                  <div className='fw-bold text-success'>Free</div>
                ) : (
                  <div className='fw-bold text-danger'>Rp. {toCurrency(e)}</div>
                ),
              quota: () =>
                !e ? (
                  <div className='fw-bold text-success d-inline'>Unlimited</div>
                ) : (
                  <div className='fw-bold text-danger'>{toCurrency(e)}</div>
                ),
              service_id: () =>
                e === 1 ? (
                  <div className='bg-dark text-white fs-11px px-7px py-2px radius-10 fw-bold d-inline'>
                    Gym Visit
                  </div>
                ) : e === 2 ? (
                  <div className='bg-light-warning text-warning fs-11px px-7px py-2px radius-10 fw-bold d-inline'>
                    Kelas Studio
                  </div>
                ) : e === 3 ? (
                  <div className='bg-light-success text-success fs-11px px-7px py-2px radius-10 fw-bold d-inline'>
                    Kelas Fungsional
                  </div>
                ) : (
                  <div className='fw-bold text-danger'>{toCurrency(e)}</div>
                ),
              image: () => {
                const img = _original?.class?.class_gallery?.[0]?.filename
                if (isVisit) {
                  return (
                    <div className='d-flex flex-center w-50px h-50px bg-light-primary text-primary border border-primary border-dashed radius-50 text-wrap text-center fw-bolder fs-11px'>
                      VISIT
                    </div>
                  )
                } else if (img) {
                  return (
                    <div
                      className='w-50px h-50px radius-5 border'
                      style={{
                        background: `#fff url(${API_SERVER}/static/images/class/${img}) center / cover no-repeat`,
                      }}
                    />
                  )
                } else {
                  return (
                    <div
                      className='w-50px h-50px radius-5 border'
                      style={{
                        background: `#fff url(/media/placeholder/blank-image.svg) center / cover no-repeat`,
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
                          setTmpDetail(_original)
                          setShowModalViewClass(true)
                        }}>
                        <div className='fas fa-eye' />
                      </button>
                    </Tooltip>
                    <Tooltip placement='top' title='Edit paket'>
                      <div
                        className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          setTmpClassType(_original?.service_id)
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

      {/* Modal View Class */}
      <ModalViewClass
        show={showModalViewClass}
        setShow={setShowModalViewClass}
        detail={tmpDetail?.class || {}}
      />

      {/* Modal Add Item */}
      <ModalAddItem
        show={showModalAddItem}
        setShow={setShowModalAddItem}
        detail={tmpDetail}
        classType={tmpClassType}
        member_id={member_id}
        queryKey={['getMemberItems', dataMemberItemsQueryParams]}
      />

      {/* Modal Delete Item */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getMemberItems', dataMemberItemsQueryParams]}
      />
    </div>
  )
}

export default Index
