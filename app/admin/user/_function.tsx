import { notUsername } from '@helpers'
import compact from 'lodash/compact'
import xor from 'lodash/xor'

interface importMapperTypes {
  val: any
  original: any
  index: number
  duplicatedData: any[]
  anyDuplicateUsername: any[]
  anyDuplicateEmail: any[]
}

export const userImportValidation = (data: any[]) => {
  const emptyArray = data?.map(
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
  const anyWrongUsernameFormat = data?.map(({ username }) => notUsername(username))?.includes(false)
  const anyWrongEmailFormat = data
    ?.map(({ email }) => new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email))
    ?.includes(false)
  // FIND DUPLCATE USERNAME
  const arrUsername = data?.map(({ username }) => username)
  const anyDuplicateUsername = arrUsername?.filter((val, i) => arrUsername.includes(val, i + 1))
  // FIND DUPLCATE EMAIL
  const arrEmail = data?.map(({ email }) => email)
  const anyDuplicateEmail = arrEmail?.filter((val, i) => arrEmail.includes(val, i + 1))

  const isNotValid =
    compact(emptyArray)?.length > 0 ||
    anyWrongEmailFormat ||
    anyWrongUsernameFormat ||
    !data?.length ||
    anyDuplicateUsername?.length > 0 ||
    anyDuplicateEmail?.length > 0

  return {
    anyDuplicateUsername,
    anyDuplicateEmail,
    isNotValid,
  }
}

export const userImportHeaders = [
  { value: 'no', label: 'No', sort: false, className: 'text-center' },
  { value: 'first_name', label: 'Nama Depan', sort: false },
  { value: 'last_name', label: 'Nama Belakang', sort: false },
  { value: 'phone', label: 'No. Handphone', sort: false },
  { value: 'username', label: 'Username', sort: false },
  { value: 'email', label: 'Email', sort: false },
]

export const userImportMapper = ({
  val,
  original,
  index,
  duplicatedData,
  anyDuplicateUsername,
  anyDuplicateEmail,
}: importMapperTypes) => {
  const duplicateUsernamefromAPI = duplicatedData
    ?.map(({ username }) => username)
    ?.includes(original?.username)
  const duplicateEmailFromAPI = duplicatedData?.map(({ email }) => email)?.includes(original?.email)
  const duplicateUsernamefromData = anyDuplicateUsername?.includes(original?.username)
  const duplicateEmailfromData = anyDuplicateEmail?.includes(original?.email)
  const emptyUsername = !original?.username
  const emptyEmail = !original?.email
  const correctEmailFormat = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(
    original?.email
  )
  const correctUsernameFormat = notUsername(original?.username)
  const emptyFirstName = !original?.first_name
  const emptyLastName = !original?.last_name
  const emptyPhone = !original?.phone

  const isNotValidData =
    duplicateUsernamefromAPI ||
    duplicateEmailFromAPI ||
    emptyUsername ||
    emptyEmail ||
    emptyFirstName ||
    emptyLastName ||
    emptyPhone ||
    !correctEmailFormat ||
    !correctUsernameFormat ||
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
        <div className=''>{val}</div>
        {emptyUsername && (
          <i className='d-block mt-3px text-danger fs-11px'>username harus di isi</i>
        )}
        {duplicateUsernamefromData && (
          <i className='d-block mt-3px text-danger fs-11px'>username terdeteksi duplikat</i>
        )}
        {duplicateUsernamefromAPI && (
          <i className='d-block mt-3px text-danger fs-11px'>username sudah terdafar</i>
        )}
        {!correctUsernameFormat && (
          <i className='d-block mt-3px text-danger fs-11px'>
            Hanya boleh huruf kecil, (_), dan angka
          </i>
        )}
      </div>
    ),
    email: () => (
      <div className=''>
        <div className=''>{val}</div>
        {emptyEmail && <i className='d-block mt-3px text-danger fs-11px'>email harus di isi</i>}
        {duplicateEmailfromData && (
          <i className='d-block mt-3px text-danger fs-11px'>email terdeteksi duplikat</i>
        )}
        {duplicateEmailFromAPI && (
          <i className='d-block mt-3px text-danger fs-11px'>email sudah terdafar</i>
        )}
        {!correctEmailFormat && (
          <i className='d-block mt-3px text-danger fs-11px'>format email salah</i>
        )}
      </div>
    ),
    first_name: () => (
      <div className=''>
        <div className=''>{val}</div>
        {emptyFirstName && (
          <i className='d-block mt-3px text-danger fs-11px'>Nama Depan harus di isi</i>
        )}
      </div>
    ),
    last_name: () => (
      <div className=''>
        <div className=''>{val}</div>
        {emptyLastName && (
          <i className='d-block mt-3px text-danger fs-11px'>Nama Belakang harus di isi</i>
        )}
      </div>
    ),
    phone: () => (
      <div className=''>
        <div className=''>{val}</div>
        {emptyPhone && <i className='d-block mt-3px text-danger fs-11px'>No. Handphone</i>}
      </div>
    ),
  }
}
