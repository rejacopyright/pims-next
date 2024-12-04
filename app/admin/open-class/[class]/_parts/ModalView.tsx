import { toCurrency } from '@helpers'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
}> = ({ show, setShow, detail = {} }) => {
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
          <div className='fw-bold fs-14px'>Lihat Kelas</div>
        </div>
        <div className='p-15px'>
          <div className='row'>
            <div className='col-12 mb-15px'>
              <div className='text-gray-500'>Nama Kelas</div>
              <div className='fw-bold fs-14px'>{detail?.class?.name}</div>
            </div>
            <div className='col-auto mb-15px'>
              <div className='text-gray-500'>Kuota</div>
              <div className='fw-bold fs-14px'>{toCurrency(detail?.quota || 0)}</div>
            </div>
            <div className='col-auto mb-15px'>
              <div className='text-gray-500'>Trainer</div>
              <div className='fw-bold fs-14px'>{detail?.trainer?.full_name}</div>
            </div>
            <div className='col-auto mb-15px'>
              <div className='text-gray-500'>Harga Kelas</div>
              <div className='fw-bold fs-14px'>Rp. {toCurrency(detail?.fee || 0)}</div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 my-10px'>
              <div className='bg-gray-200 py-5px px-10px fw-bold'>Peserta</div>
            </div>
            <div className='col-12 mb-15px'>
              <div className='fw-bold fs-14px'>{detail?.class?.name}</div>
            </div>
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
