'use client'

import { deleteEmail } from '@api/profile'
import { ToastMessage } from '@components/toast'
import { setUser } from '@redux'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'

const Index: FC<{
  onSubmit?: (e: any) => void
}> = ({ onSubmit = () => '' }) => {
  const router = useRouter()
  const pathname = usePathname()

  const { user, profile }: any = useSelector(
    ({ user, profile }: any) => ({ user: user?.data, profile }),
    shallowEqual
  )
  const { tmpEmail } = profile || {}

  const [loading, setLoading] = useState<boolean>(false)

  const closeModal: any = () => router.replace('/profile', { scroll: false })

  const handleOnSubmit = () => {
    setLoading(true)
    deleteEmail({ user_id: tmpEmail?.user_id, user_eml: tmpEmail?.user_eml })
      .then(() => {
        closeModal()
        onSubmit(tmpEmail?.user_eml)
        const filteredEmails: any = user?.mails?.filter(
          ({ user_eml }: any) => user_eml !== tmpEmail?.user_eml
        )
        setUser({ mails: filteredEmails })
        ToastMessage({ type: 'success', message: '이메일이 성공적으로 제거되었습니다.' })
      })
      .catch(({ response }: any) => {
        ToastMessage({ type: 'error', message: response?.data?.message?.reason })
      })
      .finally(() => setLoading(false))
  }
  return (
    <Modal
      scrollable
      centered
      dialogClassName='modal-md w-lg-400px'
      contentClassName='radius-15 shadow-lg'
      show={pathname?.endsWith('delete-email')}
      onHide={closeModal}>
      <Modal.Body className='p-24px'>
        <div className='text-center mb-24px'>
          <span className='fw-bolder'>{tmpEmail?.user_eml || 'email'}</span>
          <span className='mx-1'>을 삭제하시겠습니까</span>
          <span>?</span>
        </div>
        <div className='d-flex gap-8px'>
          <div className='col'>
            <div
              className='btn btn-flex w-100 btn-white border border-gray-300 text-dark fw-bolder flex-center px-12px'
              onClick={closeModal}>
              아니오
            </div>
          </div>
          <div className='col'>
            <button
              type='button'
              onClick={handleOnSubmit}
              disabled={loading}
              className='btn btn-danger btn-flex flex-center w-100 text-nowrap'>
              {loading ? (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span>예</span>
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
