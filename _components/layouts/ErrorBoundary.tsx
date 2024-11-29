import { APP_HOME_PATH, errorFromAxios, IMG } from '@helpers'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

const Button: FC<any> = () => {
  const navigate = useRouter()
  return (
    <div className=''>
      <button
        type='button'
        className='btn btn-flex btn-sm btn-color-primary bg-light-primary ps-3 mx-2'
        onClick={() => navigate.back()}>
        <i className='las la-angle-left fs-5' />
        Back
      </button>
      <button
        type='button'
        className='btn btn-flex btn-primary btn-sm ps-4 mx-2'
        onClick={() => navigate.push(APP_HOME_PATH)}>
        <i className='las la-home fs-5' />
        Home
      </button>
    </div>
  )
}

const ErrorBoundaryPage: FC<any> = ({ error, reset }) => {
  const goBack: any = () => {
    window.history.back()
    setTimeout(() => reset(), 300)
  }

  const reload: any = () => {
    window.location.reload()
  }

  const goToHome: any = () => {
    window.location.href = '/'
  }

  return (
    <div className='d-flex align-items-center justify-content-center h-100'>
      <div className='text-center'>
        <IMG path={'/media/svg/others/nodata.svg'} className='h-250px' style={{ opacity: 0.25 }} />
        {error?.message && (
          <div
            className='rounded bg-light-danger text-danger p-3 fw-bold mx-auto mb-5'
            style={{ maxWidth: '75vw' }}>
            <p className='m-0 text-truncate-3'>{error?.message}</p>
          </div>
        )}
        <div className='fs-3s fw-lighter mb-7'>
          <span className='fw-bolder'>Sorry!!, </span> The page you are looking for could not be
          found or under mantenance.
        </div>
        <div className='text-center'>
          <div className='btn btn-sm btn-light btn-flex text-dark me-3' onClick={goBack}>
            <i className='las la-angle-left' /> Back
          </div>
          <div className='btn btn-sm btn-light btn-flex text-dark me-3' onClick={reload}>
            <i className='las la-sync' /> Reload
          </div>
          <div className='btn btn-sm btn-primary btn-flex' onClick={goToHome}>
            <i className='las la-home' />
            Home
          </div>
        </div>
      </div>
    </div>
  )
}

const AxiosErrorBoudary: FC<any> = ({ errors }) => {
  const [arrayErrors, setArrayErrors] = useState<any>([])
  const [errorURL, setErrorURL] = useState<any>()
  const [errorCode, setErrorCode] = useState<any>()
  const [method, setMethod] = useState<any>([])
  useEffect(() => {
    setErrorCode(errors?.response?.status)
    setMethod(errors?.config?.method)
    setErrorURL(errors?.response?.request?.responseURL)
    setArrayErrors(errorFromAxios(errors))
  }, [errors])
  return (
    <div
      className='d-flex align-items-center justify-content-center w-100'
      style={{ height: '60vh' }}>
      <div className='text-center'>
        <img alt='img' src={'/media/svg/illustrations/9.png'} className='h-250px mb-5 opacity-50' />
        {errorCode && <div className='fs-2x mb-3 fw-bolder text-danger'>ERROR {errorCode}</div>}
        {errorURL && (
          <div className='mb-4'>
            {method && <span className='fw-bolder text-uppercase fs-6 me-1'>{method} :</span>}
            <code>{errorURL}</code>
          </div>
        )}
        {arrayErrors?.length > 0 && (
          <div className='bg-light-danger radius-5 px-3 pt-3 pb-1 mb-10'>
            <div className='row'>
              {arrayErrors?.map((message: any, index: number) => (
                <div key={index} className='col-12 text-start text-danger fw-bold mb-2'>
                  <div className='d-flex'>
                    <span className='me-2'>{index + 1}.</span>
                    {message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <Button />
      </div>
    </div>
  )
}

export { AxiosErrorBoudary, ErrorBoundaryPage }
