import { Sticky } from '@components/cards/Sticky'
import { FilterDate } from '@components/filter/Calendar'
import { Searchbox } from '@components/form'
import { exportToExcel } from '@helpers'
import { useLocation } from '@hooks'
import omit from 'lodash/omit'
import moment from 'moment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

export const Filter: FC<any> = ({ onClickAdd = () => '', onClickImport = () => '' }) => {
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
            <div className='d-none flex-wrap align-items-center gap-12px mb-4 mb-lg-0'>
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
              <div className='col-auto'>
                <Searchbox
                  size='sm'
                  controlled
                  placeholder='Cari member'
                  className='radius-5 w-300px'
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
              {/* <div className='col-auto'>
                <div
                  className='d-flex flex-center gap-6px bg-white border border-gray-300 radius-5 h-36px px-16px cursor-pointer'
                  onClick={() => router.push(pathname)}>
                  <i className='las la-redo-alt fs-16px text-dark' />
                  <div className='fw-bolder lh-1 text-nowrap'>Reset</div>
                </div>
              </div> */}
              <div className='col-auto ms-auto' />
              <div className='col-auto'>
                <Dropdown>
                  <Dropdown.Toggle
                    variant='white'
                    size='sm'
                    className='text-dark border border-gray-300 fw-bolder h-36px d-flex align-items-center gap-6px'>
                    <i className='fas fa-upload fs-11px text-dark' />
                    <div className='fw-bolder lh-1 text-nowrap text-dark'>Import Member</div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={onClickImport}>
                      <div className='d-flex align-items-center gap-10px py-5px'>
                        <i className='fas fa-upload fs-10px text-dark' />
                        <div className='fw-bold lh-1 text-nowrap text-dark'>Import Member</div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        exportToExcel({
                          fileName: `${moment().format('[MEMBER-TEMPLATE]_yyyy-MM-DD_HH:mm:ss')}`,
                          data: [
                            {
                              first_name: null,
                              last_name: null,
                              phone: null,
                              username: null,
                              password: null,
                              email: null,
                            },
                          ],
                        })
                      }>
                      <div className='d-flex align-items-center gap-10px py-5px'>
                        <i className='fas fa-cloud-download fs-10px text-dark' />
                        <div className='fw-bold lh-1 text-nowrap text-dark'>Download Template</div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className='col-auto'>
                <div
                  className='d-flex flex-center gap-6px btn btn-sm btn-white border border-gray-300 radius-5 h-36px px-16px cursor-pointer'
                  onClick={() => onClickAdd()}>
                  <i className='fas fa-plus fs-16px text-dark' />
                  <div className='fw-bolder lh-1 text-nowrap text-dark'>Tambah Member</div>
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