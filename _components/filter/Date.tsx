import { InputDateRange } from '@components/form/date-range'
import { KTSVG } from '@helpers'
import { useFormik } from 'formik'
import moment from 'moment'
import { FC, useEffect } from 'react'

const Index: FC<any> = ({ filterDate, onFilterDate = () => '' }) => {
  const formik = useFormik({
    initialValues: {
      start_date: undefined,
      end_date: undefined,
    },
    // validationSchema,
    onSubmit: (_val: any) => {
      setTimeout(() => {
        // onFilterDate(val)
      }, 500)
    },
  })
  useEffect(() => {
    formik?.setFieldValue('start_date', filterDate?.start_date)
    formik?.setFieldValue('end_date', filterDate?.end_date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDate?.start_date, filterDate?.end_date])
  return (
    <div className='cursor-pointer' style={{ width: '274px', height: '40px' }}>
      <InputDateRange
        modal={true}
        btnToday={false}
        btnReset={false}
        minDate={moment().subtract(3, 'y')?.toDate()}
        value={{
          startDate: formik?.values?.start_date || '',
          endDate: formik?.values?.end_date || '',
        }}
        onChange={({ startDate, endDate }: any) => {
          const start_date: any = startDate ? moment(startDate || '')?.format('Y-MM-DD') : ''
          const end_date: any = endDate ? moment(endDate || '')?.format('Y-MM-DD') : ''
          formik?.setFieldValue('start_date', start_date)
          formik?.setFieldValue('end_date', end_date)
          onFilterDate({ start_date, end_date })
        }}>
        <div className='input-group input-group-solid d-flex bg-white align-items-center border border-gray-300 position-relative h-40px'>
          <div
            className='form-control bg-white fs-14px text-dark h-100 radius-5 lh-18px'
            style={{ letterSpacing: '-0.6px' }}>
            {!formik?.values?.start_date || !formik?.values?.end_date ? (
              <span className='text-dark'>YYYY. MM. DD ~ YYYY. MM. DD</span>
            ) : formik?.values?.start_date === formik?.values?.end_date ? (
              <span>{moment(formik?.values?.start_date || '')?.format('YYYY. MM. DD')}</span>
            ) : (
              <span>
                {moment(formik?.values?.start_date || '')?.format('YYYY. MM. DD')}
                <span className='mx-4px'>~</span>
                {moment(formik?.values?.end_date || '')?.format('YYYY. MM. DD')}
              </span>
            )}
            <div className='position-absolute top-0 bottom-0 end-0 d-flex align-items-center px-14px'>
              <KTSVG path='/media/icons/custom/calendar.svg' className='' width={20} height={20} />
            </div>
          </div>
        </div>
      </InputDateRange>
    </div>
  )
}

export default Index
