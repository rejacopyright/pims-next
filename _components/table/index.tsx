import './style.scss'

import { clsx } from 'clsx'
import { CSSProperties, FC } from 'react'

export interface TableTypes {
  data: Array<any>
  hiddenItems?: Array<string>
  headers: Array<{ label: string; sort?: boolean; colSpan?: number; className?: string }>
  render?: any
  columnStyles?: { [x: string]: CSSProperties }
  columnClasses?: { [x: string]: string }
}

const Index: FC<TableTypes> = ({
  data = [],
  hiddenItems = [],
  headers,
  render = false,
  columnStyles = {},
  columnClasses = {},
}) => {
  return (
    <div className='table-responsive bg-white'>
      <table className='table m-0 table-sm gx-4 gy-5 radius-10'>
        <thead className='bg-gray-200 fw-bolder fs-6 text-dark'>
          <tr className=''>
            {headers?.map(
              (
                {
                  label,
                  sort = true,
                  colSpan = 1,
                  className: labelClass = 'text-nowrap fs-7',
                }: any,
                index: number
              ) => (
                <th key={index} colSpan={colSpan}>
                  <div className='d-flex align-items-center'>
                    <span className={labelClass}>{label}</span>
                    {sort && <i className='las la-angle-down text-dark ms-3' />}
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className='fs-7 fw-bold text-dark text-nowrap fs-7'>
          {data?.map((item: any, index: number) => {
            const itemKeys: any = Object.keys(item) || []
            const visibleItems: any = itemKeys?.filter((f: any) => !hiddenItems?.includes(f))
            const customEl: any = render ? render('', item, index) : {}

            return (
              <tr className='' key={index}>
                {visibleItems?.map((key: any, indexItem: number) => {
                  const content: any = item?.[key] || ''
                  let thisEl: any = content

                  if (customEl?.[key]) {
                    const El: any = render(content, item, index)
                    if (typeof El?.[key] === 'function') {
                      thisEl = El?.[key]?.()
                    } else {
                      thisEl = El?.[key]
                    }
                  } else if ([null, undefined, '']?.includes(content)) {
                    thisEl = '-'
                  } else if (['object', 'function']?.includes(typeof content)) {
                    thisEl = `[${typeof data?.[item]}]`
                  }

                  return (
                    <td
                      key={indexItem}
                      className={clsx({ [columnClasses?.[key]]: columnClasses?.[key] })}
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
  )
}

export default Index
