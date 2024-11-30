import { DotFlash } from '@components/loader'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='d-flex flex-center gap-10px' style={{ height: '70vh' }}>
      <Image src='/logo/logo-circle.png' alt='' width={50} height={50} priority />
      <DotFlash animation='falling' style={{ transform: 'scale(0.75)' }} />
    </div>
  )
}
