import { badgePDF } from '@api/badge'
import { PDFViewer } from '@components/viewer/PDFViewer'
import { downloadBlobFile } from '@helpers'
import moment from 'moment'
import { FC, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  state: any
}> = ({ show, setShow, state }) => {
  const bodyRef: any = useRef()

  const [PDFFile, setPDFFile] = useState<any>(undefined)
  const [pdfBtnIsLoading, setPdfBtnIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setPdfBtnIsLoading(true)
    if (state?.CERT_FILE_NAME) {
      badgePDF({
        user_id: state?.USER_ID,
        cert_file_name: state?.CERT_FILE_NAME,
      })
        .then(({ data }: any) => {
          const fileName: any = `${state?.NAME?.toString().replace(' ', '-')}_${moment().format('YMMDDx')}`
          setPDFFile({ blob: data, fileName })
        })
        .catch((err: any) => {
          const _message: any = err?.response?.data?.message?.reason || err?.message || ''
        })
        .finally(() => setPdfBtnIsLoading(false))
    } else {
      setPdfBtnIsLoading(false)
    }
  }, [state?.CERT_FILE_NAME, state?.NAME, state?.USER_ID])

  return (
    <Modal
      centered
      dialogClassName='modal-lg w-lg-400pxs'
      contentClassName='radius-15 shadow-lg'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='position-relative p-0' ref={bodyRef}>
        {/* <div className='position-absolute top-0 end-0'>
          <div
            onClick={() => setShow(false)}
            className='btn btn-flex flex-center btn-white p-0'
            style={{ width: '30px', height: '30px' }}>
            <i className='las la-times p-0 text-gray-300s fs-24px' />
          </div>
        </div> */}
        <div className='overflow-auto radius-15' style={{ maxHeight: '85vh' }}>
          <PDFViewer src={PDFFile?.blob} parentRef={bodyRef} />
        </div>
        <div className='row m-0 gap-10px p-24px'>
          <div className='col-auto p-0 ms-auto'>
            <div
              className='btn w-100 btn-white text-dark btn-flex flex-center h-40px p-0 border border-gray-300 fw-bolder w-150px'
              onClick={() => setShow(false)}>
              닫기
            </div>
          </div>
          {!pdfBtnIsLoading && (
            <div className='col-auto p-0'>
              <button
                type='button'
                disabled={pdfBtnIsLoading}
                className='btn btn-primary btn-flex flex-center h-40px border border-gray-300 radius-5 px-10px shadow-xs'
                onClick={() =>
                  downloadBlobFile({ blob: PDFFile?.blob, fileName: PDFFile?.fileName })
                }>
                <div className='d-flex align-items-center'>
                  <i className='las la-download fs-16px mb-1px text-white' />
                  <span>Download PDF</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
