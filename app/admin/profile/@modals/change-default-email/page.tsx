'use client'

import { me, setDefaultEmail } from '@api/profile'
import { ToastMessage, ToastWhite } from '@components/toast'
import { KTSVG } from '@helpers'
import { setUser } from '@redux'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'

const OptionComponent: FC<any> = ({
  detail = {},
  selectedItem,
  setSelectedItem = () => undefined,
}) => {
  const { user_eml } = detail
  const isSelected: boolean = selectedItem === user_eml

  return (
    <div
      className='d-flex align-items-center border-bottom border-gray-300 fw-bold px-12px bg-white gap-10px'
      style={{ height: '44px' }}
      onClick={() => setSelectedItem(isSelected ? undefined : user_eml)}>
      <div
        className={clsx('border border-2 radius-5 d-flex flex-center', {
          'border-gray-300 bg-white': !isSelected,
          'border-primary bg-primary': isSelected,
        })}
        style={{ width: '16px', height: '16px' }}>
        <div className='fa fa-check fs-10px text-white' />
      </div>
      <div className='fs-14px text-dark cursor-default user-select-none'>{user_eml}</div>
    </div>
  )
}

const Index: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const { mails = [] } = user || {}

  const primaryMails = mails?.find(({ user_eml_rprs }: any) => user_eml_rprs === 'Y')
  const secondaryMails = mails?.filter(({ user_eml_rprs }: any) => user_eml_rprs === 'N')

  const [selectedItem, setSelectedItem] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const closeModal: any = () => router.replace('/profile', { scroll: false })

  const handleOnSubmit = () => {
    if (selectedItem && user?.user_id) {
      setLoading(true)
      setDefaultEmail({ user_id: user?.user_id, user_eml: selectedItem })
        .then(async () => {
          const myProfile: any = (await me(user?.user_id))?.data?.message
          const user_info: any = myProfile?.user_info || {}
          const combinedUser: any = {
            ...(user_info?.user_info || {}),
            mails: user_info?.user_mail_infos || {},
          }
          setUser(combinedUser)
          closeModal()
          // onSubmit(selectedItem)

          ToastWhite(
            <div className='d-flex p-24px gap-16px'>
              <KTSVG
                path='/media/icons/custom/check_circle.svg'
                width={26}
                height={26}
                className='mt-3px'
              />
              <div className='fw-bolder text-dark fs-16px'>
                기본 이메일이 성공적으로 업데이트되었습니다
              </div>
            </div>,
            { autoClose: 1000 }
          )
        })
        .catch(({ response }: any) => {
          ToastMessage({ type: 'error', message: response?.data?.error })
        })
        .finally(() => setLoading(false))
    }
  }
  return (
    <Modal
      scrollable
      centered
      dialogClassName='modal-md'
      show={pathname?.endsWith('change-default-email')}
      onHide={closeModal}>
      <Modal.Body className='p-24px'>
        <div className='text-center fw-bolder fs-20px mb-24px'>대표 이메일 변경하기</div>
        <div className='position-absolute top-0 end-0'>
          <div
            onClick={closeModal}
            className='btn p-0 mt-24px me-24px'
            style={{ width: '24px', height: '24px' }}>
            <i className='las la-times p-0 text-gray-800 fs-18px' />
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between fw-bold fs-16px text-dark bg-gray-100 px-16px radius-5 border-0 h-40px'>
          <div className=''>{primaryMails?.user_eml}</div>
          <div className='text-primary fs-13px'>현재 대표 이메일</div>
        </div>
        <div className='fw-bold fs-16px my-24px text-center text-gray-500'>
          대표 이메일로 설정할 이메일을 선택하세요.
        </div>
        <div className='row mb-24px'>
          {secondaryMails?.map((m: any, index: number) => (
            <div className='col-12' key={index}>
              <OptionComponent
                detail={m}
                key={index}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </div>
          ))}
        </div>
        <div className='d-flex gap-8px'>
          <div className='col'>
            <div
              className='btn btn-flex w-100 btn-white border border-gray-300 text-dark fw-bolder flex-center px-12px'
              onClick={closeModal}>
              닫기
            </div>
          </div>
          <div className='col'>
            <button
              type='submit'
              onClick={handleOnSubmit}
              disabled={loading || !selectedItem}
              className={clsx('btn btn-flex flex-center w-100 text-nowrap', {
                'btn-primary': selectedItem,
                'btn-disabled': !selectedItem,
              })}>
              {loading ? (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span>대표이메일 설정</span>
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
