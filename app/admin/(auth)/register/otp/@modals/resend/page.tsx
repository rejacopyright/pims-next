'use client'
import { getOTP } from '@api/auth'
import { ToastMessage } from '@components/toast'
import { useLocation } from '@hooks'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const Index = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { params } = useLocation()

  const { email } = params || {}

  const [loading, setLoading] = useState<any>(false)
  const [sent, setSent] = useState<any>(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await getOTP({ eml_to: email, eml_se: 'B' })
      const { message } = res?.data
      if (message?.reason === 'success') {
        setLoading(false)
        setSent(true)
        setError('')
      }
    } catch (e: any) {
      const message: any = e?.response?.data?.message?.reason || e?.message || ''
      ToastMessage({ type: 'error', message })
      setError(message)
      setSent(false)
      setLoading(false)
    }
  }

  const closeModal = () => router.replace(`/register/otp?email=${email}`, { scroll: false })

  const handleConfirm = () => {
    closeModal()
    setTimeout(() => {
      setSent(false)
    }, 300)
  }
  return (
    <Modal
      centered
      dialogClassName='modal-md'
      show={pathname === '/register/otp/resend'}
      onHide={closeModal}
      backdrop='static'>
      <Modal.Body>
        {error ? (
          <>
            <div className='d-flex flex-center mx-auto my-5'>
              <i className='fas fa-circle-xmark text-danger fs-5x' />
            </div>
            <div className='d-flex flex-center fw-bold fs-5 px-10 text-center text-danger'>
              The verification code could not be sent to your email.
            </div>
            <div className={`alert alert-danger my-lg-7 mt-n3`}>
              <div className='alert-text font-weight-bold text-danger text-center fw-bolder'>
                {error}
              </div>
            </div>
          </>
        ) : sent ? (
          <>
            <div className='d-flex flex-center mx-auto my-5'>
              <i className='fas fa-check-circle text-primary fs-5x' />
            </div>
            <div className='d-flex flex-center fw-bold fs-5 px-10 text-center'>
              The verification code has been sent to your email
            </div>
          </>
        ) : (
          <div
            className='d-flex flex-center fw-bold fs-5 px-10 text-center mt-5'
            style={{ minHeight: '100px' }}>
            영문문구 한글로 변경 필요?
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!sent ? (
          <div className='row w-100'>
            <div className='col'>
              <div className='btn w-100 btn-light' onClick={closeModal}>
                Close
              </div>
            </div>
            <div className='col'>
              <button
                disabled={loading}
                className='btn btn-flex flex-center w-100 btn-primary'
                onClick={handleSubmit}>
                {!loading && <span className='indicator-label'>Confirm</span>}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Waiting...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className='col'>
            <div className='btn w-100 btn-primary' onClick={handleConfirm}>
              Confirm
            </div>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default Index
