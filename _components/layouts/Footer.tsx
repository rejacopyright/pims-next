import { APP_EMAIL } from '@helpers'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const Footer: FC<any> = () => {
  return (
    <div className='d-flex align-items-center justify-content-center justify-content-lg-start bg-white px-65px py-20px text-center text-lg-start border-top'>
      <div className=''>
        <div className='d-flex align-items-center justify-content-center justify-content-lg-start mb-5px gap-8px'>
          <Link href='/' className='mb-5px'>
            <Image src='/logo/logo-circle.png' alt='pims-logo' width={25} height={25} priority />
          </Link>
          <Link href='/policy' scroll={false} className='fs-14px fw-bolder text-dark'>
            Policy
          </Link>
          <div className='fs-10px fw-bolder text-gray-400'>|</div>
          <Link href='/terms' scroll={false} className='fs-14px fw-bolder text-dark'>
            Terms
          </Link>
        </div>
        <div className='fs-13px'>
          <div className=''>Lokasi kantor:</div>
          <div className=''>
            Jl. Ganesa No.15E, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132
          </div>
          <div className='fw-bolder fs-12px'>
            <span className=''>Email : {APP_EMAIL}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
