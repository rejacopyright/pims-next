import { VideoPlayer } from '@components/viewer/video'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  src: any
}> = ({ show, setShow, src }) => {
  return (
    <Modal
      centered
      dialogClassName='modal-lg modal-video'
      contentClassName='radius-15 shadow-none p-0 bg-transparent w-auto mx-auto'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='d-flex flex-center p-0'>
        <VideoPlayer src={src} />
        {/* <video
          className='radius-10'
          src={src}
          // poster=''
          // loop
          controls
          autoPlay
          style={{ width: '100%', maxHeight: '65vh' }}
        /> */}
        <div className='position-fixed' style={{ top: '15px', right: '15px' }}>
          <div
            onClick={() => setShow(false)}
            className='btn btn-flex flex-center p-0 radius-50'
            style={{ width: '35px', height: '35px', background: 'rgba(0,0,0,0.5)' }}>
            <i className='las la-times p-0 text-white fs-22px' />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
