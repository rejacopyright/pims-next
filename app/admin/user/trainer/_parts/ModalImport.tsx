import { importUser } from '@api/users'
import Table from '@components/table'
import { ToastMessage } from '@components/toast'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

import { userImportHeaders, userImportMapper, userImportValidation } from '../../_function'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  data: any
  queryKey: any[]
}> = ({ show, setShow, data, queryKey }) => {
  const queryClient = useQueryClient()
  const [dataImport, setDataImport] = useState<any[]>([])
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [duplicatedData, setDuplicatedData] = useState<any[]>([])

  useEffect(() => {
    setDataImport(show ? data : [])
    if (!show) {
      setDuplicatedData([])
    }
  }, [show, data])

  const handleImport = () => {
    setBtnLoading(true)
    importUser({ data: dataImport })
      .then(({ data }: any) => {
        if (data?.status === 'success') {
          ToastMessage({ type: 'success', message: data?.message })
          setDuplicatedData([])
          setShow(false)
          queryClient.resetQueries({ queryKey })
        }
      })
      .catch((err: any) => {
        let message = err?.response?.data?.message || err?.message
        if (typeof message === 'object') {
          message = Object.values(message)?.[0]
        }
        const error = err?.response?.data
        if (error?.status === 'duplicated') {
          setDuplicatedData(error?.data || [])
        }
        ToastMessage({ type: 'error', message })
      })
      .finally(() => setBtnLoading(false))
  }

  const { anyDuplicateUsername, anyDuplicateEmail, isNotValid } = userImportValidation(dataImport)

  return (
    <Modal
      centered
      scrollable
      dialogClassName='modal-xl'
      contentClassName='radius-15'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='p-0'>
        <Table
          loading={false}
          stickyHeader={false}
          pagination={false}
          data={dataImport}
          total={dataImport?.length || 0}
          columnClasses={{ no: 'text-center' }}
          headers={userImportHeaders}
          tdClass='px-20px py-10px fs-13px'
          render={(val: any, original: any, index: number) =>
            userImportMapper({
              val,
              original,
              index,
              duplicatedData,
              anyDuplicateUsername,
              anyDuplicateEmail,
            })
          }
        />
      </Modal.Body>
      <Modal.Footer className='w-100 p-0'>
        <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px w-100'>
          <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
            <div className='fs-14px'>Tutup</div>
          </div>
          <button
            type='button'
            disabled={btnLoading || isNotValid}
            onClick={handleImport}
            className='btn btn-sm btn-primary btn-flex flex-center px-15px gap-10px'>
            {btnLoading ? (
              <span className='indicator-progress d-block fs-14px'>
                Waiting...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            ) : (
              <>
                <i className='fas fa-upload p-0 text-white fs-14px mb-1px' />
                <div className='fs-14px me-5px'>Import</div>
              </>
            )}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default Index
