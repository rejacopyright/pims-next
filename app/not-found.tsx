'use client'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

const Button: FC<any> = ({ home }) => {
  const router = useRouter()
  return (
    <div className=''>
      <button
        type='button'
        className='btn btn-flex btn-sm btn-color-primary bg-light-primary ps-3 mx-2'
        onClick={() => router.back()}>
        <i className='las la-angle-left fs-5' />
        Back
      </button>
      {Boolean(home) && (
        <button
          type='button'
          className='btn btn-flex btn-primary btn-sm ps-4 mx-2'
          onClick={() => router.push(home || '/')}>
          <i className='las la-home fs-5' />
          Home
        </button>
      )}
    </div>
  )
}

const Index: FC<any> = ({ home }) => {
  return (
    <div
      className='d-flex align-items-center justify-content-center w-100'
      style={{ height: '60vh' }}>
      <div className='w-100 text-center'>
        <img alt='img' src='/media/assets/404.png' className={`h-100px h-lg-150px mb-10`} />
        <div className='fs-6 mb-10'>The page you are looking for could not be found</div>
        <Button home={home} />
      </div>
    </div>
  )
}

export default Index
