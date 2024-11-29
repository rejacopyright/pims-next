'use client'
import { KTSVG } from '@helpers'
import { useLocation } from '@hooks'
import { usePathname, useRouter } from 'next/navigation'
import { Modal } from 'react-bootstrap'

const Index = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { params } = useLocation()

  const { email, message, statusCode: code }: any = params || {}

  const noAccount: boolean = ['20101', '1000'].includes(code?.toString())
  const wrongPassword: boolean = ['20103'].includes(code?.toString())

  const handleOnSubmit = () => {
    setTimeout(() => {
      if (noAccount) {
        router.push(`/register?email=${email}`)
      }
    }, 300)
  }

  const closeModal = () => router.replace(`/password/forgot?email=${email}`, { scroll: false })

  return (
    <Modal
      scrollable
      centered
      dialogClassName='modal-xxx w-md-400px'
      show={pathname === '/password/error'}
      onHide={closeModal}>
      {/* <Modal.Header closeButton className='p-5' /> */}
      <Modal.Body className='p-24px'>
        {noAccount ? (
          <>
            <div className='text-center mb-24px p-8px'>
              <KTSVG
                path='/media/icons/custom/loading_circle.svg'
                className='svg-icon-white'
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            <div className='text-center fw-bolder fs-20px mb-2'>일치하는 계정 정보가 없습니다.</div>
            <div className='text-center fw-400 fs-16px'>
              회원가입하면 포텐톡을 이용할 수 있습니다.
            </div>
          </>
        ) : wrongPassword ? (
          <>
            <div className='text-center mb-24px'>
              <KTSVG
                path='/media/icons/custom/alert.svg'
                className='svg-icon-white'
                style={{ width: '32px', height: '32px' }}
              />
            </div>
            <div className='text-center fw-bolder fs-20px'>입력하신 계정 정보가 틀립니다.</div>
          </>
        ) : (
          <div className='text-center fw-bolder fs-18px'>{message || ''}</div>
        )}
      </Modal.Body>
      <Modal.Footer className='pb-5 pt-0 px-3 border-0'>
        <div className='row w-100'>
          <div className='col'>
            <div
              className='btn btn-outline btn-outline-secondary text-dark fw-bolder w-100'
              onClick={closeModal}>
              다시 시도
            </div>
          </div>
          {noAccount && (
            <div className='col'>
              <button
                type='button'
                onClick={handleOnSubmit}
                className='btn btn-flex flex-center w-100 btn-primary'>
                회원가입
              </button>
            </div>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default Index
