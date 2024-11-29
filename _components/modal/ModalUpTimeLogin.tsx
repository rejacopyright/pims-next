import { refreshToken } from '@api/auth'
import { getJWTPayload, KTSVG } from '@helpers'
import { logout } from '@redux'
import Cookies from 'js-cookie'
import moment from 'moment'
import { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'

const Index: FC<any> = ({ show, setShow, countDown }) => {
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false)

  const extendTheLogin = () => {
    setLoadingBtn(true)
    const user_id = user?.user_id
    if (user_id) {
      refreshToken({ user_id })
        .then(({ data: { message } }: any) => {
          const { token } = message || {}
          if (token) {
            const payload: any = getJWTPayload(token)
            setShow(0)
            Cookies.set(`token`, token, { expires: moment.unix(payload?.exp).toDate() })
            setTimeout(() => {
              window.location.reload()
            }, 100)
          }
          // setShow(0)
        })
        .catch(() => '')
        .finally(() => setLoadingBtn(false))
    }
    setTimeout(() => {
      setLoadingBtn(false)
    }, 1000)
  }
  return (
    <Modal
      centered
      dialogClassName='modal-sm'
      backdrop='static'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body>
        <div className='d-flex flex-center w-75px h-75px border border-2 border-dashed border-primary radius-50 mx-auto mb-3'>
          <KTSVG
            path='/media/icons/custom/lock.svg'
            className='svg-icon-3x mb-1 svg-icon-primary'
          />
        </div>
        <div className='text-center'>
          <span className=''>
            Your session will end soon. You will be logged out automatically within
          </span>
          <div className='fw-bold mx-2 fs-3x'>{countDown || '...'}</div>
          <span className=''>seconds</span>
        </div>
      </Modal.Body>
      <Modal.Footer className='pt-4 pb-0 px-1'>
        <div className='row w-100'>
          <div className='col-12 mb-4'>
            <div className='btn w-100 bg-light-danger text-danger text-nowrap' onClick={logout}>
              Logout Now
            </div>
          </div>
          <div className='col-12 mb-4'>
            <button
              onClick={extendTheLogin}
              disabled={loadingBtn}
              className='btn btn-flex flex-center w-100 btn-primary'>
              {loadingBtn ? (
                <span className='indicator-progress text-nowrap d-block'>
                  Waiting...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span className='text-nowrap'>Stay Login</span>
              )}
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default Index
