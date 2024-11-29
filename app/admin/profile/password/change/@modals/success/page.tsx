'use client'

import { APP_ADMIN_PATH, KTSVG } from '@helpers'
import { logout } from '@redux'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC = () => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const onHide = () => {
    setLoading(true)
    setTimeout(async () => {
      setLoading(false)
      logout()
      router.replace(`${APP_ADMIN_PATH}/login`)
    }, 100)
  }
  return (
    <Modal
      scrollable
      centered
      dialogClassName='modal-md w-lg-400px'
      contentClassName='radius-15 shadow-lg'
      show={true}
      onHide={onHide}>
      <Modal.Body className='p-24px'>
        <div className='text-center mb-24px'>
          <KTSVG path='/media/icons/custom/key-orange.svg' svgClassName='w-15px h-15px mb-8px' />
          <div className='fw-bolder mb-8px'>비밀번호를 변경했습니다.</div>
          <div className='fw-bold'>변경한 비밀번호로 다시 로그인해 주세요.</div>
        </div>
        <div className='d-flex gap-8px'>
          <div className='col-12'>
            <button
              type='button'
              onClick={onHide}
              disabled={loading}
              className='btn btn-flex w-100 btn-white border border-gray-300 text-dark fw-bolder flex-center px-12px text-nowrap'>
              {loading ? (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span>확인</span>
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
