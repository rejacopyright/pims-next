'use client'
import { getMemberPackage } from '@api/member'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { APP_ADMIN_PATH, isDev, toCurrency } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'

import { Filter } from './_parts/Filter'
import ModalDelete from './_parts/ModalDelete'

const Index: FC<any> = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = 1, limit = 5 } = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataMemberPackageQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataMemberPackageQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getMemberPackage', dataMemberPackageQueryParams],
    queryFn: () => getMemberPackage(dataMemberPackageQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataMemberPackage: any = dataMemberPackageQuery?.data?.data || []
  const dataMemberPackageTotal = dataMemberPackageQuery?.data?.total || 0
  const pageIsLoading: any = !dataMemberPackageQuery?.isFetched

  return (
    <div className='content'>
      <title>Member | Paket</title>
      <Filter />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        <div className='fs-12px'>Total</div>
        <div className='fs-12px'>:</div>
        <div className='fw-700 text-primary'>{dataMemberPackageTotal}</div>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getMemberPackage'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='bg-white shadow-xs mb-50px'>
        <Table
          loading={pageIsLoading}
          stickyHeader
          data={dataMemberPackage}
          pagination
          total={dataMemberPackageTotal}
          columnClasses={{ level: 'text-center' }}
          headers={[
            { value: 'level', label: 'Level', className: 'text-center', width: 0, sort: false },
            { value: 'image', label: '#', className: 'text-start px-20px', width: 0, sort: false },
            { value: 'name', label: 'Nama Program', className: 'text-start', sort: false },
            { value: 'quota', label: 'Limit', className: 'text-start', width: 0, sort: false },
            { value: 'actions', label: '', className: 'text-center', width: 0, sort: false },
          ]}
          tdClass='px-20px py-10px fs-13px'
          render={(e: any, _original: any) => {
            return {
              name: () => (
                <>
                  <div className=''>{e}</div>
                  <div className='fs-11px text-primary'>Rp. {toCurrency(_original?.fee)}</div>
                  <div className='fs-11px text-gray-600'>
                    {toCurrency(_original?.duration)} hari
                  </div>
                </>
              ),
              quota: () => (
                <>
                  <div className='fs-11px'>
                    <span className='text-gray-500'>Visit: </span>
                    {_original?.quota_visit_per_day || 'Unlimited'}
                  </div>
                  <div className='fs-11px'>
                    <span className='text-gray-500'>Kelas: </span>
                    {_original?.quota_class_per_day || 'Unlimited'}
                  </div>
                </>
              ),
              image: () => {
                if (_original?.badge) {
                  return (
                    <div
                      className='w-50px h-50px radius-5 border'
                      style={{
                        background: `#fff url(${_original?.badge}) center / cover no-repeat`,
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
                    <div
                      className='btn btn-sm btn-light-primary btn-flex flex-center gap-5px radius-50 border border-primary py-7px'
                      onClick={() => {
                        router.push(`${APP_ADMIN_PATH}/member/items/${_original?.id}`)
                      }}>
                      <div className='fas fa-wrench' />
                      <div className='fe-bold'>Kelola Program</div>
                    </div>
                    <Tooltip placement='top' title='Lihat paket'>
                      <div
                        className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          router.push(`${APP_ADMIN_PATH}/member/package/view/${_original?.id}`)
                        }}>
                        <div className='fas fa-eye' />
                      </div>
                    </Tooltip>
                    <Tooltip placement='top' title='Edit paket'>
                      <div
                        className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() =>
                          router.push(`${APP_ADMIN_PATH}/member/package/create?id=${_original?.id}`)
                        }>
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

      {/* Modal Delete Member Package */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getMemberPackage', dataMemberPackageQueryParams]}
      />
    </div>
  )
}

export default Index
