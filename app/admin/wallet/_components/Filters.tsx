'use client'
import { FilterDate } from '@components/filter/Calendar'
import { FilterCategory } from '@components/filter/Category'
import { configClass, KTSVG } from '@helpers'
import omit from 'lodash/omit'
import moment from 'moment'
import { usePathname, useRouter } from 'next/navigation'
import { parse, stringify } from 'qs'
import { useState } from 'react'

export default function Index({ searchParams }) {
  const router = useRouter()
  const pathname = usePathname()

  const [showModalStartDate, setShowModalStartDate] = useState<boolean>(false)
  const [showModalEndDate, setShowModalEndDate] = useState<boolean>(false)

  const {
    startDate,
    endDate,
    sortBy,
    filterAchievement: encodedFilterAchievement = '',
  } = searchParams || {}

  const { filterAchievement } = parse(atob(encodedFilterAchievement))

  const addOrEditParams = (key: string, value: any) => {
    const resParams = stringify({ ...searchParams, [key]: value }, { encode: false })
    router.replace(`${pathname}?${resParams}`, { scroll: false })
  }

  const omitParams = (key: string) => {
    const omittedParams: any = omit(searchParams, key)
    const resParams = stringify(omittedParams, { encode: false })
    router.replace(`${pathname}?${resParams}`, { scroll: false })
  }

  return (
    <div className='page-filter'>
      <div className='d-flex flex-wrap gap-16px'>
        <div className=''>
          <div className='fs-14px fw-bold mb-8px'>배지 구분</div>
          <FilterCategory
            filterCategory={filterAchievement}
            onFilterCategory={(e: any) => {
              const stringifiedParams: any = btoa(
                stringify({ filterAchievement: e }, { encode: true })
              )

              stringifiedParams
                ? addOrEditParams('filterAchievement', stringifiedParams)
                : omitParams('filterAchievement')
            }}
          />
        </div>
        <div className=''>
          <div className='fs-14px mb-8px fw-bold'>발행 날짜</div>
          <div className='cursor-pointer w-date-filter' style={{ height: '40px' }}>
            <div className='input-group input-group-solid d-flex bg-white align-items-center border border-gray-300 position-relative h-40px'>
              <div
                className='form-control bg-white fs-15px text-dark h-100 radius-5 lh-18px'
                style={{ letterSpacing: '-0.6px' }}>
                <div className='d-flex gap-5px text-date-filter pe-30px'>
                  <div className='' onClick={() => setShowModalStartDate(true)}>
                    {startDate || 'YYYY. MM. DD'}
                  </div>
                  <div className=''>~</div>
                  <div className='' onClick={() => setShowModalEndDate(true)}>
                    {endDate || 'YYYY. MM. DD'}
                  </div>
                </div>
                <div className='position-absolute top-0 bottom-0 end-0 d-flex align-items-center pe-14px'>
                  <KTSVG
                    path='/media/icons/custom/calendar.svg'
                    className=''
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Modal Start Date */}
          <FilterDate
            show={showModalStartDate}
            setShow={setShowModalStartDate}
            maxDate={
              endDate && moment(endDate).isSameOrBefore(moment(), 'days')
                ? moment(endDate).toDate()
                : new Date()
            }
            filterDate={startDate}
            onFilterDate={(e: any) => addOrEditParams('startDate', e)}
          />

          {/* Modal End Date */}
          <FilterDate
            show={showModalEndDate}
            setShow={setShowModalEndDate}
            minDate={startDate ? moment(startDate).toDate() : undefined}
            filterDate={endDate}
            onFilterDate={(e: any) => addOrEditParams('endDate', e)}
          />
        </div>
        <div className='d-flex gap-16px'>
          <div
            className={configClass?.filterButton}
            onClick={() => addOrEditParams('sortBy', sortBy === 'A' ? 'B' : 'A')}>
            <i
              className={`las la-arrow-${sortBy === 'A' ? 'up' : 'down'} fs-16px text-dark mb-2px`}
            />
            <div className='fw-bolder fs-14px'>{sortBy === 'A' ? '최신순' : '오래된 순'}</div>
          </div>
          <div
            className={configClass?.filterButton}
            onClick={() => router.replace(pathname, { scroll: false })}>
            <i className='las la-redo-alt fs-16px text-dark mb-2px' />
            <div className='fw-bolder fs-14px'>초기화</div>
          </div>
        </div>
      </div>
    </div>
  )
}
