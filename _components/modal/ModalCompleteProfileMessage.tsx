import { KTSVG } from '@helpers'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'

type ModalCompleteProfileMessageProps = {
  isShow: boolean
  setModalUpdateProfile: (val: boolean) => void
}

const ModalCompleteProfileMessage = ({
  isShow,
  setModalUpdateProfile,
}: ModalCompleteProfileMessageProps) => {
  const [show, setShow] = useState<boolean>(isShow)

  const onHandlerClick = () => {
    setShow(false)
    setModalUpdateProfile(true)
  }

  return (
    <Modal centered show={show} size='sm' backdrop='static'>
      <Modal.Body>
        <div className='d-flex flex-column align-items-center gap-8'>
          <KTSVG
            path={'/media/icons/custom/triangle-warning.svg'}
            className='svg-icon-4x mb-1 svg-icon-primary'
          />
          <p className='text-center fs-2 text-warning fw-bold mt-n6'>Warning</p>
          <span className='text-center fw-bolder mt-n6 fs-3'>
            Before you can use this service, please set your name and other required information
            first.
          </span>
        </div>
        <div className='row mt-7 gap-3'>
          <button className='btn btn-primary col' onClick={onHandlerClick}>
            <span className='indicator-label'>Okay</span>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalCompleteProfileMessage
