import { DotFlash } from '@components/loader'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='d-flex flex-center gap-10px' style={{ height: '70vh' }}>
      <Image src='/logo/logo-circle.png' alt='Open Badge' width={125} height={25} priority />
      <DotFlash animation='falling' style={{ transform: 'scale(0.75)' }} />
    </div>
  )
}
