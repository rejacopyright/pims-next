import { getMemberPackage } from '@api/member'
import { importUser } from '@api/users'
import { Select as SelectAjax } from '@components/select/ajax'
import { SingleValue } from '@components/select/config'
import Table from '@components/table'
import { ToastMessage } from '@components/toast'
import { configClass } from '@helpers'
import { useQueryClient } from '@tanstack/react-query'
import compact from 'lodash/compact'
import xor from 'lodash/xor'
import { FC, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

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

  const emptyArray = dataImport?.map(
    (m) =>
      xor(Object.keys(m || {}), [
        'username',
        'email',
        'first_name',
        'last_name',
        'phone',
        'password',
        'role_id',
        'ref',
      ])?.length > 0
  )
  const anyWrongEmailFormat = dataImport
    ?.map(({ email }) => new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email))
    ?.includes(false)

  // FIND DUPLCATE USERNAME
  const arrUsername = dataImport?.map(({ username }) => username)
  const anyDuplicateUsername = arrUsername?.filter((val, i) => arrUsername.includes(val, i + 1))
  // FIND DUPLCATE EMAIL
  const arrEmail = dataImport?.map(({ email }) => email)
  const anyDuplicateEmail = arrEmail?.filter((val, i) => arrEmail.includes(val, i + 1))

  const isAnyEmpty =
    compact(emptyArray)?.length > 0 ||
    anyWrongEmailFormat ||
    !dataImport?.length ||
    anyDuplicateUsername?.length > 0 ||
    anyDuplicateEmail?.length > 0 ||
    !member?.value

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
          headers={[
            { value: 'no', label: 'No', sort: false, className: 'text-center' },
            { value: 'first_name', label: 'Nama Depan', sort: false },
            { value: 'last_name', label: 'Nama Belakang', sort: false },
            { value: 'phone', label: 'No. Handphone', sort: false },
            { value: 'username', label: 'Username', sort: false },
            { value: 'email', label: 'Email', sort: false },
          ]}
          tdClass='px-20px py-10px fs-13px'
          render={(e: any, _original: any, index: number) => {
            const duplicateUsernamefromAPI = duplicatedData
              ?.map(({ username }) => username)
              ?.includes(_original?.username)
            const duplicateEmailFromAPI = duplicatedData
              ?.map(({ email }) => email)
              ?.includes(_original?.email)
            const duplicateUsernamefromData = anyDuplicateUsername?.includes(_original?.username)
            const duplicateEmailfromData = anyDuplicateEmail?.includes(_original?.email)
            const emptyUsername = !_original?.username
            const emptyEmail = !_original?.email
            const correctEmailFormat = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(
              _original?.email
            )
            const emptyFirstName = !_original?.first_name
            const emptyLastName = !_original?.last_name
            const emptyPhone = !_original?.phone

            const isNotValidData =
              duplicateUsernamefromAPI ||
              duplicateEmailFromAPI ||
              emptyUsername ||
              emptyEmail ||
              emptyFirstName ||
              emptyLastName ||
              emptyPhone ||
              !correctEmailFormat ||
              duplicateUsernamefromData ||
              duplicateEmailfromData

            return {
              no: () => (
                <div
                  className={`d-flex flex-center w-25px h-25px bg-${isNotValidData ? 'danger' : 'primary'} text-white mx-auto radius-50`}>
                  {index + 1}
                </div>
              ),
              username: () => (
                <div className=''>
                  <div className=''>{e}</div>
                  {emptyUsername && <i className='text-danger fs-11px'>username harus di isi</i>}
                  {duplicateUsernamefromData && (
                    <i className='text-danger fs-11px'>username terdeteksi duplikat</i>
                  )}
                  {duplicateUsernamefromAPI && (
                    <i className='text-danger fs-11px'>username sudah terdafar</i>
                  )}
                </div>
              ),
              email: () => (
                <div className=''>
                  <div className=''>{e}</div>
                  {emptyEmail && <i className='text-danger fs-11px'>email harus di isi</i>}
                  {duplicateEmailfromData && (
                    <i className='text-danger fs-11px'>email terdeteksi duplikat</i>
                  )}
                  {!correctEmailFormat && <i className='text-danger fs-11px'>format email salah</i>}
                  {duplicateEmailFromAPI && (
                    <i className='text-danger fs-11px'>email sudah terdafar</i>
                  )}
                </div>
              ),
              first_name: () => (
                <div className=''>
                  <div className=''>{e}</div>
                  {emptyFirstName && <i className='text-danger fs-11px'>Nama Depan harus di isi</i>}
                </div>
              ),
              last_name: () => (
                <div className=''>
                  <div className=''>{e}</div>
                  {emptyLastName && (
                    <i className='text-danger fs-11px'>Nama Belakang harus di isi</i>
                  )}
                </div>
              ),
              phone: () => (
                <div className=''>
                  <div className=''>{e}</div>
                  {emptyPhone && <i className='text-danger fs-11px'>No. Handphone</i>}
                </div>
              ),
            }
          }}
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
            disabled={btnLoading || isAnyEmpty}
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
