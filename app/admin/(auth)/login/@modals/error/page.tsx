'use client'
import { APP_ADMIN_PATH, KTSVG } from '@helpers'
import { usePathname, useRouter } from 'next/navigation'
import { use } from 'react'
import { Modal } from 'react-bootstrap'

const Index = ({ searchParams }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = use(searchParams)

  const { email, message, code }: any = params || {}

  const noAccount: boolean = code?.toString() === 'no_account'

  const handleOnSubmit = () => {
    setTimeout(() => {
      if (noAccount) {
        router.push(`${APP_ADMIN_PATH}/register?email=${email}`)
      }
    }, 300)
  }

  const closeModal = () => router.replace(`${APP_ADMIN_PATH}/login`, { scroll: false })

  return (
    <Modal
      scrollable
      centered
      dialogClassName='modal-xxx w-md-400px'
      show={pathname === `${APP_ADMIN_PATH}/login/error`}
      onHide={closeModal}>
      {/* <Modal.Header closeButton className='p-5' /> */}
      <Modal.Body className='p-24px'>
        <div className='alert alert-danger bg-light-danger text-danger m-0'>
          <div className='text-center mb-20px'>
            <KTSVG
              path='/media/icons/custom/loading_circle.svg'
              className='svg-icon-danger'
              style={{ width: '24px', height: '24px' }}
            />
          </div>
          <div className='text-center fw-bold fs-13px'>{message || ''}</div>
        </div>
      </Modal.Body>
      <Modal.Footer className='pb-5 pt-0 px-3 border-0'>
        <div className='row w-100'>
          <div className='col'>
            <div
              className='btn btn-outline btn-outline-secondary text-dark fw-bolder w-100'
              onClick={closeModal}>
              Tutup
            </div>
          </div>
          {noAccount && (
            <div className='col'>
              <button
                type='button'
                onClick={handleOnSubmit}
                className='btn btn-flex flex-center w-100 btn-primary'>
                Daftar
              </button>
            </div>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default Index
