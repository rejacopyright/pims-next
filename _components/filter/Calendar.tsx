import Datepicker from '@components/form/date-picker'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

interface Props {
  filterDate?: string | undefined
  onFilterDate?: (e: string | undefined) => void
  show: boolean
  setShow: (e: boolean) => void
  minDate?: Date | undefined
  maxDate?: Date | undefined
}

export const FilterDate: FC<Props> = ({
  filterDate = undefined,
  onFilterDate = () => '',
  show,
  setShow,
  minDate = undefined,
  maxDate = undefined,
}) => {
  const [value, setValue] = useState<any>(new Date())
  // const [isShown, setIsShown] = useState<any>(new Date())
  useEffect(() => {
    setValue(moment(filterDate).format('YYYY-MM-DD'))
  }, [filterDate])
  return (
    <Modal
      dialogClassName='modal-sm modal-dialog-centered justify-content-center'
      contentClassName='w-auto'
      show={show}
      onHide={() => {
        setShow(false)
        // setDates(initDate)
      }}>
      <Modal.Body className='p-0'>
        <div className='px-24px pt-24px radius-10 shadow-calendar'>
          <Datepicker
            defaultValue={value}
            minDate={minDate}
            maxDate={maxDate}
            onCancel={() => setShow(false)}
            onChange={setValue}
            onSubmit={(e: any) => {
              onFilterDate(moment(e).format('YYYY-MM-DD'))
              setShow(false)
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  )
}
