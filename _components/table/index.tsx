import './style.scss'

import { elementProperty } from '@components/cards/Sticky'
import { LogoLoader } from '@components/loader/logo'
import { useSize } from '@hooks'
import { clsx } from 'clsx'
import filter from 'lodash/filter'
import find from 'lodash/find'
import pick from 'lodash/pick'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { CSSProperties, FC, useMemo, useRef, useState } from 'react'

import { TablePagination } from './pagination'

export interface TableHeaderProps {
  value: string
  label: string
  width?: number | string
  sort?: boolean
  colSpan?: number
  className?: string
  labelClass?: string
}

export interface TableTypes {
  data: Array<any>
  pagination?: boolean
  total?: number
  // hiddenItems?: Array<string>
  headers: Array<TableHeaderProps>
  render?: any
  columnStyles?: { [x: string]: CSSProperties }
  columnClasses?: { [x: string]: string }
  tdClass?: string
  thClass?: string
  theadClass?: string
  stickyHeader?: boolean
  loading?: boolean
  searchParam?: any
  select?: boolean
  onSelect?: (e: any[]) => void
}

const Index: FC<TableTypes> = ({
  data = [],
  pagination = false,
  total = 0,
  // hiddenItems = [],
  headers,
  render = false,
  columnStyles = {},
  columnClasses = {},
  tdClass = 'px-22px py-10px',
  thClass = 'py-5px px-7px',
  theadClass = 'gd-primary fw-bolder text-white',
  stickyHeader = false,
  loading = false,
  select = false,
  onSelect = () => '',
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { orderDir, orderBy, limit = 5, page = 1 }: any = params || {}

  // STATES
  const [stickyHeight, setStickyHeight] = useState<number>(0)
  const [checkedItem, setCheckedItem] = useState<any>([])

  const allIsChecked: any = useMemo(() => {
    return checkedItem?.length >= data?.length
  }, [data?.length, checkedItem?.length])

  // REF
  const thRef: any = useRef([])

  // Function
  const addOrEditParams = (queries: { [key: string]: any }) => {
    const resParams = stringify({ ...params, ...queries }, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }

  const handleSort = (value: string, sort: any) => {
    if (value) {
      addOrEditParams({ orderBy: value, orderDir: orderDir === 'asc' || !sort ? 'desc' : 'asc' })
    }
  }

  // CLASS
  const activeHeaderStyle = 'linear-gradient(0deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))'

  useSize(() => {
    const topbar = elementProperty()
    let sumHeight = topbar?.headerHeight + topbar?.toolBarHeight

    const stickyEl: any = document.querySelector('.sticky-custom')
    if (stickyEl) {
      const stickyProperty = window?.getComputedStyle(stickyEl, null)
      if (stickyProperty?.getPropertyValue('height')) {
        sumHeight = sumHeight + (parseInt(stickyProperty?.getPropertyValue('height')) || 0)
      }
    }
    setStickyHeight(sumHeight)
  }, 100)

  return (
    <>
      <div className='table-responsive-mobile bg-white'>
        <table className='table m-0 table-sm table-striped gx-4 gy-2 radius-10 position-relative'>
          <thead
            className={`${theadClass} ${stickyHeader ? 'position-lg-sticky' : ''}`}
            style={{ top: stickyHeader ? `${stickyHeight}px` : 'unset', zIndex: 2 }}>
            <tr className=''>
              {select && (
                <th style={{ width: 0, left: 0 }} className='user-select-none'>
                  <div
                    className={`d-inline-flex align-items-center radius-5 cursor-pointer header-container`}>
                    <div className='form-check' style={{ marginRight: '-28px' }}>
                      <input
                        className='form-check-input me-0'
                        name='name'
                        autoComplete='all'
                        type='checkbox'
                        checked={allIsChecked}
                        onChange={(e: any) => {
                          const isChecked: boolean = e?.target?.checked
                          setCheckedItem(isChecked ? data : [])
                          onSelect(isChecked ? data : [])
                        }}
                      />
                      {/* <div className='fw-bold fs-14px text-white text-nowrap'>All</div> */}
                    </div>
                  </div>
                </th>
              )}
              {headers?.map((header: any, index: number) => {
                const {
                  value,
                  label,
                  sort = true,
                  width,
                  colSpan = 1,
                  className = '',
                  labelClass = 'text-nowrap fs-13px',
                } = header || {}
                const thisActiveSort = orderBy === value
                const thisInActiveSort = orderBy !== value
                return (
                  <th
                    key={index}
                    ref={(el: any) => (thRef.current[index] = el)}
                    colSpan={colSpan}
                    style={{ width, left: 0 }}
                    className={clsx(className, 'user-select-none', {
                      'cursor-default': sort,
                      'cursor-na': !sort,
                    })}
                    onClick={() => {
                      if (sort) {
                        handleSort(value, thisActiveSort)
                      }
                    }}
                    onMouseEnter={() => {
                      if (sort) {
                        const headerContainer: any = [
                          ...(thRef?.current?.[index]?.children || []),
                        ]?.find((el: any) => el?.classList?.contains('header-container'))
                        headerContainer?.style?.setProperty('background', activeHeaderStyle)
                      }
                    }}
                    onMouseLeave={() => {
                      if (sort && !thisActiveSort) {
                        const headerContainer: any = [
                          ...(thRef?.current?.[index]?.children || []),
                        ]?.find((el: any) => el?.classList?.contains('header-container'))
                        headerContainer?.style?.removeProperty('background')
                      }
                    }}>
                    <div
                      className={`d-inline-flex align-items-center ${thClass} radius-7 ${sort ? 'cursor-pointer' : ''} header-container`}
                      style={{
                        background: thisActiveSort ? activeHeaderStyle : 'unset',
                      }}>
                      <span className={labelClass}>{label}</span>
                      {sort && (
                        <div
                          className='d-flex flex-center h-25px w-25px radius-50 ms-3'
                          style={{
                            background: thisActiveSort ? 'rgba(255,255,255,0.9)' : 'unset',
                          }}>
                          <i
                            className={clsx('fas fs-12px mb-1px', {
                              'text-white': !thisActiveSort,
                              'text-primary': thisActiveSort,
                              'la-arrow-down':
                                (thisActiveSort && orderDir === 'asc') ||
                                thisInActiveSort ||
                                !orderBy,
                              'la-arrow-up': thisActiveSort && orderDir === 'desc',
                            })}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className='fs-7 fw-bold text-dark text-nowrap fs-7 position-relative'>
            {loading && (
              <tr>
                <td colSpan={headers?.length} className='align-middle p-0'>
                  <div
                    className='position-absolute start-0 w-100 top-0 bottom-0 d-flex flex-center blur-5'
                    style={{ background: 'rgba(255,255,255,0.5)', zIndex: 1 }}>
                    <LogoLoader size={50} />
                  </div>
                </td>
              </tr>
            )}
            {!data?.length && (
              <tr>
                <td colSpan={headers?.length} className='align-middle p-0'>
                  <div className='d-flex flex-center h-150px w-100'>
                    <div className='text-center'>
                      <img
                        src={'/media/placeholder/nodata.svg'}
                        alt='no-data'
                        style={{ opacity: 0.5 }}
                        className='w-auto h-75px'
                      />
                      <div className='text-gray-500 fw-300 fs-14px'>No data found!</div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {data?.map((dt: any, index: number) => {
              const headerArrayStr: any = headers?.map(({ value }: any) => value) || []
              const item = pick(dt, headerArrayStr)
              // const itemKeys: any = Object.keys(item) || []
              // const visibleItems: any = itemKeys?.filter((f: any) => !hiddenItems?.includes(f))
              const customEl: any = render ? render('', dt, index) : {}

              return (
                <tr className='' key={index}>
                  {select && (
                    <td className='align-middle'>
                      <div
                        className={`d-inline-flex align-items-center radius-5 cursor-pointer header-container`}>
                        <div className='form-check' style={{ marginRight: '-28px' }}>
                          <input
                            className='form-check-input me-0'
                            name='name'
                            autoComplete='all'
                            type='checkbox'
                            checked={Boolean(find(checkedItem, dt))}
                            onChange={(e: any) => {
                              const isChecked: boolean = e?.target?.checked
                              const includedItem: any = [...checkedItem, dt]
                              const excludedItem: any = filter(checkedItem, (f: any) => f !== dt)
                              setCheckedItem(isChecked ? includedItem : excludedItem)
                              onSelect(isChecked ? includedItem : excludedItem)
                            }}
                          />
                          {/* <div className='fw-bold fs-14px text-white text-nowrap'>All</div> */}
                        </div>
                      </div>
                    </td>
                  )}
                  {headerArrayStr?.map((key: any, indexItem: number) => {
                    const content: any = item?.[key]
                    let thisEl: any = content

                    if (customEl?.[key]) {
                      const El: any = render(content, dt, index)
                      if (typeof El?.[key] === 'function') {
                        thisEl = El?.[key]?.()
                      } else {
                        thisEl = El?.[key]
                      }
                    } else if ([null, undefined, '']?.includes(content)) {
                      thisEl = '-'
                    } else if (['object', 'function']?.includes(typeof content)) {
                      thisEl = `[${typeof content}]`
                    }

                    return (
                      <td
                        key={indexItem}
                        className={clsx('align-middle', tdClass, {
                          [columnClasses?.[key]]: columnClasses?.[key],
                        })}
                        style={columnStyles?.[key]}>
                        {thisEl}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className='bg-white position-lg-sticky bottom-0' style={{ zIndex: 2 }}>
          <TablePagination
            limit={limit}
            page={page}
            total={total}
            onChangeLimit={(e: any) => addOrEditParams({ limit: e, page: 1 })}
            onChangePage={(e: any) => addOrEditParams({ page: e })}
          />
        </div>
      )}
    </>
  )
}

export default Index
