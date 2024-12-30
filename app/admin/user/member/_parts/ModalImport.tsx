import { getMemberPackage } from '@api/member'
import { importUser } from '@api/users'
import { Select as SelectAjax } from '@components/select/ajax'
import { SingleValue } from '@components/select/config'
import Table from '@components/table'
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
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
  const [member, setMember] = useState<any>()

  useEffect(() => {
    setDataImport(show ? data : [])
    if (!show) {
      setDuplicatedData([])
      setMember(undefined)
    }
  }, [show, data])

  const handleImport = () => {
    setBtnLoading(true)
    importUser({ data: dataImport, member_id: member?.value })
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
          <div className='w-300px my-10px position-relative'>
            {/* <div className={configClass?.label}>Pilih Member</div> */}
            <SelectAjax
              api={getMemberPackage}
              reload={false}
              sm={true}
              name='member_id'
              // className='w-100'
              isClearable={false}
              placeholder='Pilih Member'
              defaultValue={undefined}
              parse={(e: any) => {
                const img = e?.badge || '/media/placeholder/blank-image.svg'
                return {
                  img,
                  value: e?.id,
                  label: e?.name,
                }
              }}
              SingleValueElement={({ data, ...props }) => {
                return <SingleValue {...props}>{data?.label}</SingleValue>
              }}
              formatOptionLabel={(e: any) => (
                <div className='d-flex align-items-center gap-10px'>
                  <div
                    className='w-30px h-30px radius-50 border'
                    style={{
                      background: `#fff url(${e?.img}) center / cover no-repeat`,
                    }}
                  />
                  <div className=''>{e?.label}</div>
                </div>
              )}
              styleOption={{
                // singleValue: { height: 'auto', display: 'flex' },
                control: {
                  border: '1px solid #eee',
                  borderRadius: '5px',
                  width: '100%',
                  // height: 30,
                },
                placeholder: { color: '#000' },
              }}
              onChange={setMember}
            />
            {!member?.value && (
              <div
                className={`${configClass.formError} position-absolute`}
                style={{ bottom: '-20px' }}>
                Member wajib diisi
              </div>
            )}
          </div>
          <div
            onClick={() => setShow(false)}
            className='btn btn-sm btn-flex h-40px btn-light px-15px'>
            <div className='fs-14px'>Tutup</div>
          </div>
          <button
            type='button'
            disabled={btnLoading || isNotValid || !member?.value}
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
