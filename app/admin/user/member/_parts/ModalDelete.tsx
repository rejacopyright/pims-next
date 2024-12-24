import { deleteUser } from '@api/users'
import { ToastMessage } from '@components/toast'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
  queryKey: any[]
}> = ({ show, setShow, detail, queryKey }) => {
  const queryClient = useQueryClient()
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const handleDelete = () => {
    if (detail?.id) {
      setBtnLoading(true)
      deleteUser(detail?.id)
        .then(({ data }: any) => {
          if (data?.status === 'success') {
            ToastMessage({ type: 'success', message: data?.message })
            setShow(false)
            queryClient.resetQueries({ queryKey })
          }
        })
        .catch((err: any) => {
          let message = err?.response?.data?.message || err?.message
          if (typeof message === 'object') {
            message = Object.values(message)?.[0]
          }
          ToastMessage({ type: 'error', message })
        })
        .finally(() => setBtnLoading(false))
    }
  }

  return (
    <Modal
      centered
      dialogClassName='modal-sm'
      contentClassName='radius-15'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='p-0'>
        <div className=''>
          <div className='p-15px d-flex flex-center h-100px'>
            <div className='text-center fs-14px'>
              <span className=''>Apakah anda yakin ingin menghapus</span>
              <span className='fw-bolder mx-5px'>{detail?.full_name || 'Member'}</span>
              <span className=''>?</span>
            </div>
          </div>
          <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
            <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
              <div className='fs-14px'>Tutup</div>
            </div>
            <button
              type='button'
              disabled={btnLoading}
              onClick={handleDelete}
              className='btn btn-sm btn-danger btn-flex flex-center px-15px gap-10px'>
              {btnLoading ? (
                <span className='indicator-progress d-block fs-14px'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <>
                  <i className='fas fa-trash-alt p-0 text-white fs-14px mb-1px' />
                  <div className='fs-14px me-5px'>Hapus</div>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
