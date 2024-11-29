// eslint-disable-next-line simple-import-sort/imports
import 'react-calendar/dist/Calendar.css'
import './style.scss'

import moment from 'moment'
import 'moment/locale/ko'
import { FC, useEffect, useState } from 'react'
import Calendar from 'react-calendar'

// type ValuePiece = Date | null

// type Value = ValuePiece | [ValuePiece, ValuePiece]

interface Props {
  defaultValue?: string | undefined
  minDate?: Date | undefined
  maxDate?: Date | undefined
  onChange?: (e: string | undefined) => void
  onSubmit?: (e: any) => void
  onCancel?: () => void
}

const Index: FC<Props> = ({
  defaultValue,
  onChange = () => '',
  onSubmit = () => '',
  onCancel = () => false,
  minDate = undefined,
  maxDate = undefined,
}) => {
  const [value, setValue] = useState<any>(new Date())
  const [view, setView] = useState<any>('month')
  const [activeStartDate, setActiveStartDate] = useState<any>(undefined)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <div className='w-calendar m-auto'>
      <div className='pb-24px'>
        <Calendar
          view={view}
          locale='ko'
          // nextLabel=':)'
          showNavigation={['month', 'decade'].includes(view)}
          minDate={minDate}
          maxDate={maxDate}
          showNeighboringCentury={false}
          onChange={(e: any) => {
            setValue(e)
            onChange(e)
          }}
          onClickYear={(e: any) => {
            const selectedYear = moment(e).get('year')
            let res: any = moment(value).year(selectedYear).toDate()
            if (maxDate && moment(res).isAfter(moment(maxDate), 'days')) {
              res = moment(maxDate).toDate()
            } else if (minDate && moment(res).isBefore(moment(minDate), 'days')) {
              res = moment(minDate).toDate()
            }

            onChange(res)
            setActiveStartDate(res)
          }}
          onClickMonth={(e: any) => {
            const selectedMonth = moment(e).get('month')
            const res: any = moment(value).month(selectedMonth).toDate()
            onChange(res)
            setActiveStartDate(res)
          }}
          onDrillDown={(e: any) => {
            if (e?.view === 'year') {
              const selectedYear = moment(e?.activeStartDate).get('year')
              const res: any = moment(value).year(selectedYear).toDate()
              setValue(res)
            } else if (e?.view === 'month') {
              const selectedMonth = moment(e?.activeStartDate).get('month')
              const res: any = moment(value).month(selectedMonth).toDate()
              setValue(res)
            }
            if (e?.view !== 'date') {
              setView('month')
              setTimeout(() => {
                // setActiveStartDate(undefined)
              }, 500)
            }
          }}
          onActiveStartDateChange={(e: any) => {
            if (e?.action !== 'drillDown') {
              setActiveStartDate(e?.activeStartDate)
            }
          }}
          // view='month'
          navigationLabel={({ date }) => (
            <div className='d-flex flex-center h-100' onClick={(e: any) => e.stopPropagation()}>
              {['decade', 'month'].includes(view) && (
                <div
                  className='btn btn-sm btn-white text-dark fw-600 fs-13px px-12px'
                  onClick={(e: any) => {
                    e.stopPropagation()
                    setView('decade')
                  }}>
                  {moment(value).format('YYYY[년]')}
                </div>
              )}
              {['year', 'month'].includes(view) && (
                <div
                  className='btn btn-sm btn-white text-dark fw-600 fs-13px px-10px'
                  onClick={(e: any) => {
                    e.stopPropagation()
                    setView('year')
                  }}>
                  {moment(date).format('MMM')}
                </div>
              )}
            </div>
          )}
          value={value}
          activeStartDate={activeStartDate}
          formatDay={(_locale: any, date) => moment(date).format('D')}
        />
      </div>
      {view === 'month' ? (
        <div className='row m-0 gap-8px py-16px'>
          <div className='col p-0'>
            <button
              type='button'
              onClick={onCancel}
              className='btn w-100 btn-sm btn-flex flex-center btn-white border border-gray-300 text-dark fw-bolder fs-14px h-40px col text-nowrap'>
              닫기
            </button>
          </div>
          <div className='col p-0'>
            <button
              type='button'
              onClick={() => onSubmit(moment(value).toDate())}
              className='btn w-100 btn-sm btn-flex flex-center btn-primary fw-bolder fs-14px h-40px col text-nowrap'>
              적용
            </button>
          </div>
        </div>
      ) : (
        <div className='w-100 py-16px'>
          <button
            type='button'
            onClick={() => setView('month')}
            className='btn w-100 btn-sm btn-flex flex-center btn-white border border-gray-300 text-dark fw-bolder fs-14px h-40px col text-nowrap gap-5px'>
            <i className='las la-arrow-left text-dark fs-16px mb-1px' />
            <span>돌아가다</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Index
