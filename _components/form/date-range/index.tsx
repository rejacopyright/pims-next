/* eslint-disable max-lines */
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './style.scss'

import { configClass } from '@helpers'
import { ko } from 'date-fns/locale'
import moment from 'moment'
import { FC, memo, ReactNode, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Calendar, DateRange } from 'react-date-range'
// import * as locales from 'react-date-range/dist/locale'

interface Props {
  children?: ReactNode
  className?: any
  btnClass?: any
  icon?: any
  onChange?: (e?: any) => void
  value: {
    startDate: any
    endDate: any
  }
  modal?: boolean
  minDate?: any
  btnReset?: boolean
  btnToday?: boolean
}
interface SingleDateProps extends Omit<Props, 'value'> {
  value?: Date
}

interface ElementProps {
  ranges?: any
  date?: Date
  maxDate?: any
  minDate?: any
  btnReset?: boolean
  btnToday?: boolean
  xBtn?: boolean
  onChange: (e?: any) => void
  onClickToday?: () => void
  onCancel: () => void
  onReset?: () => void
  onSave?: () => void
}

export const DateRangeElement: FC<ElementProps> = ({
  ranges,
  minDate = new Date(),
  btnReset = true,
  btnToday = true,
  xBtn = true,
  onChange = () => '',
  onClickToday = () => '',
  onCancel = () => '',
  onReset = () => '',
  onSave = () => '',
}) => {
  return (
    <div className='position-relative'>
      <DateRange
        ranges={[ranges]}
        locale={ko}
        onChange={onChange}
        color='#4CAF50'
        rangeColors={['#FDEEE6']}
        shownDate={new Date()}
        minDate={minDate}
        direction='vertical'
        months={1}
        dateDisplayFormat='d MMM yyyy'
        showMonthAndYearPickers={true}
        showDateDisplay={false}
      />
      {/* <hr className='border-2 my-2' /> */}
      <div className='d-flex align-items-center py-16px px-24px gap-8px'>
        {btnToday && (
          <button
            type='button'
            className='btn btn-sm btn-flex flex-center bg-white tetx-dark fw-bolder fs-14px me-auto h-40px col text-nowrap'
            onClick={onClickToday}>
            Today
          </button>
        )}
        <button
          type='button'
          className='btn btn-sm btn-flex flex-center btn-white border border-gray-300 text-dark fw-bolder fs-14px h-40px col text-nowrap'
          onClick={onCancel}>
          닫기
        </button>
        {btnReset && (
          <button
            type='button'
            className='btn btn-sm btn-flex flex-center btn-light-danger fw-bolder fs-14px h-40px col text-nowrap'
            onClick={onReset}>
            Reset
          </button>
        )}
        <button
          type='button'
          className='btn btn-sm btn-flex flex-center btn-primary fw-bolder fs-14px h-40px col text-nowrap'
          onClick={onSave}>
          적용
        </button>
      </div>
      {xBtn && (
        <div className='position-absolute top-0 end-0 me-n5 mt-n3'>
          <div
            onClick={onCancel}
            className='btn btn-dark btn-icon btn-flex w-25px h-25px radius-50 shadow-sm'>
            <i className='fas fa-times' />
          </div>
        </div>
      )}
    </div>
  )
}
export const DateSingleElement: FC<ElementProps> = ({
  ranges,
  minDate = new Date(),
  btnReset = true,
  btnToday = true,
  xBtn = true,
  onChange = () => '',
  onClickToday = () => '',
  onCancel = () => '',
  onReset = () => '',
  onSave = () => '',
}) => {
  return (
    <div className='position-relative'>
      <DateRange
        ranges={[
          {
            startDate: ranges,
            endDate: ranges,
            key: 'selection',
          },
        ]}
        showMonthAndYearPickers={false}
        dragSelectionEnabled={false}
        preventSnapRefocus={false}
        showPreview={false}
        locale={ko}
        onChange={onChange}
        color='#4CAF50'
        rangeColors={['#FDEEE6']}
        shownDate={new Date()}
        minDate={minDate}
        direction='vertical'
        months={1}
        dateDisplayFormat='d MMM yyyy'
        showDateDisplay={false}
      />
      {/* <hr className='border-2 my-2' /> */}
      <div className='d-flex align-items-center py-16px px-24px gap-8px'>
        {btnToday && (
          <button
            type='button'
            className='btn btn-sm btn-flex flex-center bg-white tetx-dark fw-bolder fs-14px me-auto h-40px col text-nowrap'
            onClick={onClickToday}>
            Today
          </button>
        )}
        <button
          type='button'
          className='btn btn-sm btn-flex flex-center btn-white border border-gray-300 text-dark fw-bolder fs-14px h-40px col text-nowrap'
          onClick={onCancel}>
          닫기
        </button>
        {btnReset && (
          <button
            type='button'
            className='btn btn-sm btn-flex flex-center btn-light-danger fw-bolder fs-14px h-40px col text-nowrap'
            onClick={onReset}>
            Reset
          </button>
        )}
        <button
          type='button'
          className='btn btn-sm btn-flex flex-center btn-primary fw-bolder fs-14px h-40px col text-nowrap'
          onClick={onSave}>
          적용
        </button>
      </div>
      {xBtn && (
        <div className='position-absolute top-0 end-0 me-n5 mt-n3'>
          <div
            onClick={onCancel}
            className='btn btn-dark btn-icon btn-flex w-25px h-25px radius-50 shadow-sm'>
            <i className='fas fa-times' />
          </div>
        </div>
      )}
    </div>
  )
}
export const DateElement: FC<ElementProps> = ({
  date = new Date(),
  maxDate,
  minDate,
  onChange = () => '',
  onCancel = () => '',
}) => {
  return (
    <div className='position-relative'>
      <Calendar
        onChange={onChange}
        color='#4CAF50'
        date={date}
        shownDate={new Date()}
        maxDate={maxDate || new Date()}
        minDate={minDate || undefined}
        direction='vertical'
        months={1}
        dateDisplayFormat='d MMM yyyy'
        showMonthAndYearPickers={true}
        showDateDisplay={false}
        dragSelectionEnabled={false}
      />
      <div className='position-absolute top-0 end-0 me-n5 mt-n2'>
        <div
          onClick={onCancel}
          className='btn btn-danger btn-icon btn-flex w-25px h-25px radius-50 shadow-sm'>
          <i className='las la-times' />
        </div>
      </div>
    </div>
  )
}

export const InputDateRange: FC<Props> = ({
  children,
  minDate,
  className,
  btnClass,
  icon,
  onChange,
  value = {},
  modal = true,
  btnReset = true,
  btnToday = true,
}: any) => {
  const initDate: any = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  const [dates, setDates] = useState<any>(initDate)
  const [showModal, setShowModal] = useState<any>(false)
  const [showCalendar, setShowCalendar] = useState<any>(false)

  useEffect(() => {
    if (value?.startDate && value?.endDate && (showModal || showCalendar)) {
      setDates({
        startDate: moment(value?.startDate).toDate(),
        endDate: moment(value?.endDate).toDate(),
        key: 'selection',
      })
    }
  }, [value, showModal, showCalendar])

  const handleChange = (e: any) => {
    setDates({ ...(e?.selection || {}) })
  }

  return (
    <>
      {modal ? (
        <>
          <div
            onClick={() => setShowModal(true)}
            className={
              !children
                ? `same-30 radius-50 center pointer text-9 ${btnClass}`
                : '' + (className || '')
            }>
            {children || <i className={`las ${icon || 'la-calendar'}`} />}
          </div>
          <Modal
            dialogClassName='modal-sm modal-dialog-centered'
            show={showModal}
            onHide={() => {
              setShowModal(false)
              setDates(initDate)
            }}>
            <Modal.Body className='p-0 radius-10'>
              <DateRangeElement
                ranges={dates}
                minDate={minDate}
                btnReset={btnReset}
                btnToday={btnToday}
                xBtn={false}
                onChange={handleChange}
                onClickToday={() => setDates(initDate)}
                onCancel={() => {
                  setShowModal(false)
                  setDates(initDate)
                }}
                onReset={() => {
                  setShowModal(false)
                  onChange &&
                    onChange({
                      startDate: undefined,
                      endDate: undefined,
                      key: 'selection',
                    })
                  setDates(initDate)
                }}
                onSave={() => {
                  setShowModal(false)
                  onChange && onChange(dates)
                  setDates(initDate)
                }}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div className='input-group input-group-solid d-flex bg-light align-items-center border border-gray-300 position-relative'>
          <i className='las la-calendar-alt text-dark fs-2 ms-3 mt-1' />
          <div
            onClick={() => setShowCalendar(true)}
            className={`${configClass?.form} border-0 lh-1 d-flex align-items-center radius-5 me-2`}>
            {children || <i className={`las ${icon || 'la-calendar'}`} />}
          </div>
          {showCalendar && (
            <div
              className='card position-absolute top-0 w-300px bg-white px-3 pb-2 shadow radius-10 mt-n1'
              style={{ zIndex: 9 }}>
              <DateRangeElement
                ranges={dates}
                minDate={minDate}
                onChange={handleChange}
                onClickToday={() => setDates(initDate)}
                onCancel={() => {
                  setShowCalendar(false)
                  setDates(initDate)
                }}
                onReset={() => {
                  setShowCalendar(false)
                  onChange &&
                    onChange({
                      startDate: undefined,
                      endDate: undefined,
                      key: 'selection',
                    })
                  setDates(initDate)
                }}
                onSave={() => {
                  setShowCalendar(false)
                  onChange && onChange(dates)
                  setDates(initDate)
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export const InputDateSingle: FC<Props> = ({
  children,
  minDate,
  className,
  btnClass,
  icon,
  onChange,
  value = {},
  modal = true,
  btnReset = true,
  btnToday = true,
}: any) => {
  const initDate: any = new Date()
  const [dates, setDates] = useState<any>(initDate)
  const [showModal, setShowModal] = useState<any>(false)
  const [showCalendar, setShowCalendar] = useState<any>(false)

  useEffect(() => {
    if (value?.endDate && (showModal || showCalendar)) {
      setDates(moment(value?.endDate).toDate())
    }
  }, [value, showModal, showCalendar])

  const handleChange = (e: any) => {
    setDates(e?.selection?.endDate)
  }

  return (
    <>
      {modal ? (
        <>
          <div
            onClick={() => setShowModal(true)}
            className={
              !children
                ? `same-30 radius-50 center pointer text-9 ${btnClass}`
                : '' + (className || '')
            }>
            {children || <i className={`las ${icon || 'la-calendar'}`} />}
          </div>
          <Modal
            dialogClassName='modal-sm modal-dialog-centered'
            show={showModal}
            onHide={() => {
              setShowModal(false)
              setDates(initDate)
            }}>
            <Modal.Body className='p-0 radius-10'>
              <DateSingleElement
                ranges={dates}
                minDate={minDate}
                btnReset={btnReset}
                btnToday={btnToday}
                xBtn={false}
                onChange={handleChange}
                onClickToday={() => setDates(initDate)}
                onCancel={() => {
                  setShowModal(false)
                  setDates(initDate)
                }}
                onReset={() => {
                  setShowModal(false)
                  onChange &&
                    onChange({
                      startDate: undefined,
                      endDate: undefined,
                      key: 'selection',
                    })
                  setDates(initDate)
                }}
                onSave={() => {
                  setShowModal(false)
                  onChange && onChange(dates)
                  setDates(initDate)
                }}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div className='input-group input-group-solid d-flex bg-light align-items-center border border-gray-300 position-relative'>
          <i className='las la-calendar-alt text-dark fs-2 ms-3 mt-1' />
          <div
            onClick={() => setShowCalendar(true)}
            className={`${configClass?.form} border-0 lh-1 d-flex align-items-center radius-5 me-2`}>
            {children || <i className={`las ${icon || 'la-calendar'}`} />}
          </div>
          {showCalendar && (
            <div
              className='card position-absolute top-0 w-300px bg-white px-3 pb-2 shadow radius-10 mt-n1'
              style={{ zIndex: 9 }}>
              <DateSingleElement
                ranges={dates}
                minDate={minDate}
                onChange={handleChange}
                onClickToday={() => setDates(initDate)}
                onCancel={() => {
                  setShowCalendar(false)
                  setDates(initDate)
                }}
                onReset={() => {
                  setShowCalendar(false)
                  onChange &&
                    onChange({
                      startDate: undefined,
                      endDate: undefined,
                      key: 'selection',
                    })
                  setDates(initDate)
                }}
                onSave={() => {
                  setShowCalendar(false)
                  onChange && onChange(dates)
                  setDates(initDate)
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

let InputDate: FC<SingleDateProps> = ({
  children,
  minDate,
  className,
  btnClass,
  onChange,
  value,
  modal = true,
}: any) => {
  const initDate = new Date()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initDate)
  const [showModal, setShowModal] = useState<any>(false)
  const [showCalendar, setShowCalendar] = useState<any>(false)

  useEffect(() => {
    if (value && (showModal || showCalendar)) {
      setSelectedDate(value)
    }
  }, [value, showModal, showCalendar])

  return (
    <>
      {modal ? (
        <>
          <div
            onClick={() => setShowModal(true)}
            className={
              !children
                ? `same-30 radius-50 center pointer text-9 ${btnClass}`
                : '' + (className || '')
            }>
            {children}
          </div>
          <Modal
            dialogClassName='modal-sm modal-dialog-centered'
            show={showModal}
            onHide={() => setShowModal(false)}>
            <Modal.Body className='p-2'>
              <DateElement
                date={selectedDate}
                minDate={minDate}
                onChange={(e: any) => {
                  setSelectedDate(e)
                  onChange(e)
                  setShowModal(false)
                }}
                onCancel={() => setShowModal(false)}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div className='input-group input-group-solid d-flex bg-light align-items-center border border-primary position-relative'>
          <i className='fas fa-calendar text-primary fs-5 ms-4 me-1' />
          <div
            onClick={() => children && setShowCalendar(true)}
            className={`${configClass?.form} border-0 lh-1 d-flex align-items-center radius-5`}>
            {children || (
              <input
                type='text'
                className='w-100 border-0 bg-transparent'
                style={{ outline: 'none' }}
                value={moment(selectedDate)?.format('Y-MM-DD')}
                onFocus={() => setShowCalendar(true)}
              />
            )}
          </div>
          {showCalendar && (
            <div
              className='card position-absolute top-0 w-300px bg-white px-3 pb-2 shadow radius-10 mt-n1'
              style={{ zIndex: 9 }}>
              <DateElement
                date={selectedDate}
                minDate={minDate}
                onChange={(e: any) => {
                  setSelectedDate(e)
                  onChange(e)
                  setShowCalendar(false)
                }}
                onCancel={() => setShowCalendar(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

InputDate = memo(InputDate)
export { InputDate }
