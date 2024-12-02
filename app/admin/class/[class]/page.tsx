'use client'
import { API_SERVER } from '@api/axios'
import { getClass } from '@api/class'
import { Sticky } from '@components/cards/Sticky'
import { FilterDate } from '@components/filter/Calendar'
import { Searchbox } from '@components/form'
import Table from '@components/table'
import { APP_ADMIN_PATH, isDev, toCapitalize } from '@helpers'
import { useLocation } from '@hooks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import omit from 'lodash/omit'
import moment from 'moment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC, use, useState } from 'react'

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

const Filter: FC<any> = () => {
  const pathname: any = usePathname()
  const searchParamsFn = useSearchParams()
  const searchParams = parse(searchParamsFn.toString() || '', { ignoreQueryPrefix: true })

  // MODAL
  const [showModalStartDate, setShowModalStartDate] = useState<boolean>(false)
  const [showModalEndDate, setShowModalEndDate] = useState<boolean>(false)

  const { startDate, endDate, q = '' }: any = searchParams || {}
  const router = useRouter()

  // Functions

  const addOrEditParams = (key: string, value: any) => {
    if (searchParams?.page) {
      searchParams.page = '1'
    }
    const resParams = stringify({ ...searchParams, [key]: value }, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }

  const omitParams = (key: string) => {
    if (searchParams?.page) {
      searchParams.page = '1'
    }
    const omittedParams: any = omit(searchParams, key)
    const resParams = stringify(omittedParams, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }
  return (
    <>
      <Sticky className='pb-8px mb-5px bg-body mx-n5 px-5 mt-5 mt-lg-0'>
        <div className='page-filter pt-14px'>
          <div className='d-flex flex-wrap align-items-center justify-content-lg-between bg-white p-18px radius-10 shadow-xs gap-20px'>
            {/* PART 1 */}
            <div className='d-flex flex-wrap align-items-center gap-12px mb-4 mb-lg-0'>
              <div className='fs-14px fw-600 text-nowrap'>Pilih Tanggal</div>
              <div className='d-flex flex-center gap-5px'>
                <div
                  onClick={() => setShowModalStartDate(true)}
                  className='d-flex flex-center border border-gray-300 bg-white radius-5 cursor-pointer h-36px w-100px'>
                  <div
                    className={`fs-13px ${startDate ? 'text-dark fw-500' : 'text-gray-500 fw-400'} me-2px`}
                    style={{ letterSpacing: '-0.5px' }}>
                    {startDate || 'YYYY. MM. DD'}
                  </div>
                </div>
                <div className='border-bottom border-gray-600 w-5px' />
                <div
                  onClick={() => setShowModalEndDate(true)}
                  className='d-flex flex-center border border-gray-300 bg-white radius-5 cursor-pointer h-36px w-100px'>
                  <div
                    className={`fs-13px ${endDate ? 'text-dark fw-500' : 'text-gray-500 fw-400'} me-2px`}
                    style={{ letterSpacing: '-0.5px' }}>
                    {endDate || 'YYYY. MM. DD'}
                  </div>
                </div>
              </div>
            </div>
            {/* PART 2 */}
            <div className='d-flex flex-wrap align-items-center gap-12px col'>
              <div className='col'>
                <Searchbox
                  size='sm'
                  controlled
                  placeholder='Cari program kelas'
                  className='radius-5 w-auto'
                  height={36}
                  delay={1000}
                  defaultValue={q}
                  onChange={async (e: any) => {
                    const location = useLocation()
                    if (e) {
                      const thisParams = location?.params || {}
                      if (thisParams?.page) {
                        thisParams.page = '1'
                      }
                      const thisResParams = await stringify(
                        { ...thisParams, q: e },
                        { encode: false }
                      )
                      router.replace(`${pathname}?${thisResParams}`)
                    } else {
                      omitParams('q')
                    }
                  }}
                />
              </div>
              <div className='col-auto'>
                <div
                  className='d-flex flex-center gap-6px bg-white border border-gray-300 radius-5 h-36px px-16px cursor-pointer'
                  onClick={() => router.push(pathname)}>
                  <i className='las la-redo-alt fs-16px text-dark' />
                  <div className='fw-bolder lh-1 text-nowrap'>Reset</div>
                </div>
              </div>
              <div className='col-auto'>
                <div
                  className='d-flex flex-center gap-6px bg-primary border border-gray-300 radius-5 h-36px px-16px cursor-pointer'
                  onClick={() => router.push(`${pathname}/create`)}>
                  <i className='fas fa-plus fs-16px text-white' />
                  <div className='fw-bolder lh-1 text-nowrap text-white'>Tambah Program</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sticky>
      {/* Modal Start Date */}
      <FilterDate
        show={showModalStartDate}
        maxDate={
          endDate && moment(endDate).isSameOrBefore(moment(), 'days')
            ? moment(endDate).toDate()
            : new Date()
        }
        setShow={setShowModalStartDate}
        filterDate={startDate}
        onFilterDate={(e) => (e ? addOrEditParams('startDate', e) : omitParams('startDate'))}
      />

      {/* Modal End Date */}
      <FilterDate
        show={showModalEndDate}
        minDate={startDate ? moment(startDate).toDate() : undefined}
        setShow={setShowModalEndDate}
        filterDate={endDate}
        onFilterDate={(e) => (e ? addOrEditParams('endDate', e) : omitParams('endDate'))}
      />
    </>
  )
}

const Index: FC<any> = ({ params }) => {
  const router = useRouter()
  const thisParams: any = use(params)
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const classType = thisParams?.class

  const dataClassQueryParams: any = {
    service_id: classType,
    q: queryParams?.q || '',
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
          columnClasses={{
            number: 'text-center',
          }}
          headers={[
            { value: 'image', label: '#', className: 'text-start px-20px', width: 0, sort: false },
            { value: 'name', label: 'Nama Program', className: 'text-start' },
            { value: 'actions', label: '', className: 'text-center', width: 0, sort: false },
          ]}
          tdClass='px-20px py-10px fs-13px'
          render={(e: any, _original: any) => ({
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
                  <div
                    className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                    onClick={() => {
                      //
                    }}>
                    <div className='fas fa-eye' />
                  </div>
                  <div
                    className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                    onClick={() =>
                      router.push(`${APP_ADMIN_PATH}/class/${classType}/create?id=${_original?.id}`)
                    }>
                    <div className='fas fa-pen-alt' />
                  </div>
                  <div
                    className='btn btn-light-danger btn-flex flex-center p-0 w-30px h-30px radius-50'
                    onClick={() => {
                      //
                    }}>
                    <div className='fas fa-trash-alt' />
                  </div>
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
    </div>
  )
}

export default Index
