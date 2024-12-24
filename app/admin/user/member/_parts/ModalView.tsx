import { FC } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
}> = ({ show, setShow, detail }) => {
  return (
    <Modal
      centered
      dialogClassName='modal-md'
      contentClassName='radius-15'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='p-0'>
        <div className='border-bottom border-gray-300 p-15px m-0 d-flex align-items-center'>
          <div className='fas fa-info-circle text-primary me-10px fs-16px' />
          <div className='fw-bold fs-14px'>{detail?.full_name}</div>
        </div>
        <div className='px-15px pt-20px'>
          <div
            className='w-200px h-200px btn border border-gray-300 d-flex flex-center position-relative radius-15 mx-auto'
            style={{
              background: `#fff url(${detail?.avatar_link || '/media/placeholder/avatar.svg'}) center / cover no-repeat`,
            }}
          />
        </div>
        <div className='p-15px'>
          <div className='mb-15px'>
            <div className='text-gray-500'>Nama</div>
            <div className='fw-bold fs-14px'>{detail?.full_name}</div>
          </div>
          <div className='mb-15px'>
            <div className='text-gray-500'>Username</div>
            <div className='fw-bold fs-14px'>{detail?.username}</div>
          </div>
          <div className='mb-15px'>
            <div className='text-gray-500'>Email</div>
            <div className='fw-bold fs-14px'>{detail?.email}</div>
          </div>
          <div className=''>
            <div className='text-gray-500'>No. Handphone</div>
            <div className='fw-bold fs-14px'>{detail?.phone}</div>
          </div>
        </div>
        <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
          <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
            <div className='fs-14px'>Tutup</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
