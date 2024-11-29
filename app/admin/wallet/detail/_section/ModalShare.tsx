import { ToastWhite } from '@components/toast'
import { configClass, copyToClipboard, KTSVG } from '@helpers'
import { FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

interface Props {
  show: boolean
  setShow?: (e: any) => void
  isLoading: boolean
  sharingToken?: string
}

const Index: FC<Props> = ({ show, setShow = () => false, isLoading, sharingToken }) => {
  const [url, setUrl] = useState<any>('')
  useEffect(() => {
    if (show) {
      const sharingURL: any = `${location?.origin}/public/user/badge/${sharingToken}`
      setUrl(sharingURL)
    }
  }, [sharingToken, show])
  return (
    <Modal
      centered
      dialogClassName='modal-md w-lg-400px'
      contentClassName='radius-15 shadow-lg'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='p-24px'>
        <div className='d-flex justify-content-center fw-bolder fs-20px'>
          <span className=''>URL 공유</span>
        </div>
        <div
          className='position-absolute top-0 end-0 mt-24px me-24px p-1px d-flex flex-center cursor-pointer'
          onClick={() => setShow(false)}>
          <i className='las la-times text-dark fs-20px' />
        </div>
        <div className='my-24px fs-16px text-center'>
          <div className='lh-24px'>URL을 복사하여, 나의 배지를</div>
          <div className='lh-24px'>다른 사람에게 공유할 수 있습니다.</div>
        </div>
        {isLoading || !sharingToken ? (
          <div className='d-flex flex-center h-40px mb-24px'>
            <span className='indicator-progress d-block'>
              <span className='spinner-border spinner-border-sm align-middle text-gray-400 w-25px h-25px' />
            </span>
          </div>
        ) : (
          <div className='input-group input-group-solid d-flex align-items-center border border-gray-300 overflow-hidden h-40px mb-24px'>
            <input
              type='text'
              disabled
              value={url}
              // placeholder='Password'
              autoComplete='off'
              name='password'
              placeholder='비밀번호를 입력해 주세요.'
              className={`border-0 text-dark ${configClass?.form}`}
            />
            <div
              className='px-3 bg-gray-100 cursor-pointer h-100 d-flex flex-center'
              onClick={() => {
                copyToClipboard(url)
                ToastWhite(
                  <div className='d-flex p-24px gap-16px'>
                    <KTSVG
                      path='/media/icons/custom/check_circle.svg'
                      width={26}
                      height={26}
                      className='mt-3px'
                    />
                    <div className='fw-bolder text-dark fs-22px'>링크를 복사했습니다.</div>
                  </div>,
                  { autoClose: 1000 }
                )
              }}>
              <KTSVG path='/media/icons/custom/copy.svg' width={16} height={20} />
            </div>
          </div>
        )}
        <div className='row m-0 gap-8px'>
          <div className='col p-0'>
            <div
              className='btn w-100 btn-white text-dark btn-flex flex-center h-40px p-0 border border-gray-300 fw-bolder'
              onClick={() => {
                copyToClipboard(url)
                ToastWhite(
                  <div className='d-flex p-24px gap-16px'>
                    <KTSVG
                      path='/media/icons/custom/check_circle.svg'
                      width={26}
                      height={26}
                      className='mt-3px'
                    />
                    <div className='fw-bolder text-dark fs-22px'>링크를 복사했습니다.</div>
                  </div>,
                  { autoClose: 1500 }
                )
              }}>
              링크 복사
            </div>
          </div>
          <div className='col p-0'>
            <div
              className='btn w-100 btn-primary btn-flex flex-center h-40px p-0 fw-bolder'
              onClick={() => setShow(false)}>
              완료
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
