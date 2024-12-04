'use client'
import { API_SERVER } from '@api/axios'
import { getClass } from '@api/class'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { APP_ADMIN_PATH, isDev, toCapitalize } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, use, useState } from 'react'

import { Filter } from './_parts/Filter'
import ModalDelete from './_parts/ModalDelete'
import ModalView from './_parts/ModalView'

const ClickableComponent: FC<{
  align?: 'center' | 'start' | 'end'
  content?: string
  icon?: string
  onClick?: (e?: any) => void
}> = ({ align = 'center', content = '-', icon = 'eye', onClick = () => '' }) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  return (
    <div
      className={`d-flex align-items-center justify-content-${align} py-8px ps-12px radius-50 user-select-none position-relative ${isHover ? 'text-primary cursor-pointer' : 'text-dark'}`}
      style={{ backgroundColor: isHover ? '#f26d2610' : 'unset' }}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div className='pe-15px'>{content}</div>
      <div className={`position-absolute end-0 pe-5px ${isHover ? 'd-block' : 'd-none'}`}>
        <div className='w-25px h-25px radius-50 bg-light-primary d-flex flex-center shadow-xs'>
          <i className={`fas fa-${icon} text-primary fs-14px`} />
        </div>
      </div>
    </div>
  )
}

const Index: FC<any> = ({ params }) => {
  const router = useRouter()
  const thisParams: any = use(params)
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = 1, limit = 5 } = queryParams
  const classType = thisParams?.class

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  const dataClassQueryParams: any = {
    service_id: classType,
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataClassQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getClass', { dataClassQueryParams }],
    queryFn: () => getClass(classType, dataClassQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataClass: any = dataClassQuery?.data?.data || []
  const dataClassTotal = dataClassQuery?.data?.total || 0
  const pageIsLoading: any = !dataClassQuery?.isFetched

  return (
    <div className='content'>
      <title>{`Kelas ${toCapitalize(classType === 'studio' ? 'Studio' : classType === 'functional' ? 'Fungsional' : 'Studio')}`}</title>
      <Filter />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        <div className='fs-12px'>Total</div>
        <div className='fs-12px'>:</div>
        <div className='fw-700 text-primary'>{dataClassTotal}</div>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getClass'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='bg-white shadow-xs mb-50px'>
        <Table
          loading={pageIsLoading}
          stickyHeader
          data={dataClass}
          pagination
          total={dataClassTotal}
          columnClasses={{}}
          headers={[
            { value: 'image', label: '#', className: 'text-start px-20px', width: 0, sort: false },
            { value: 'name', label: 'Nama Program', className: 'text-start', sort: false },
            { value: 'actions', label: '', className: 'text-center', width: 0, sort: false },
          ]}
          tdClass='px-20px py-10px fs-13px'
          render={(e: any, _original: any) => ({
            name: () => (
              <Tooltip active title={e?.toString()}>
                <div className='w-500px text-truncate'>{e}</div>
              </Tooltip>
            ),
            image: () => {
              const images = _original?.class_gallery
              if (images?.length) {
                return (
                  <div
                    className='w-50px h-50px radius-5 border'
                    style={{
                      background: `#fff url(${API_SERVER}/static/images/class/${images?.[0]?.filename}) center / cover no-repeat`,
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
                  <Tooltip placement='top' title='Lihat kelas'>
                    <div
                      className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                      onClick={() => {
                        setTmpDetail(_original)
                        setShowModalView(true)
                      }}>
                      <div className='fas fa-eye' />
                    </div>
                  </Tooltip>
                  <Tooltip placement='top' title='Edit kelas'>
                    <div
                      className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                      onClick={() =>
                        router.push(
                          `${APP_ADMIN_PATH}/class/${classType}/create?id=${_original?.id}`
                        )
                      }>
                      <div className='fas fa-pen-alt' />
                    </div>
                  </Tooltip>
                  <Tooltip placement='auto' title='Hapus kelas'>
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
            xxx: (
              <ClickableComponent
                align='start'
                content={e}
                icon='arrow-right'
                onClick={async () => {
                  //
                }}
              />
            ),
          })}
        />
      </div>

      {/* Modal View Class */}
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />

      {/* Modal Delete Class */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getClass', { dataClassQueryParams }]}
      />
    </div>
  )
}

export default Index
