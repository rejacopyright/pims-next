import { APP_NAME } from '@helpers'
import { FC } from 'react'

import { DotFlash } from './dots'

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
interface LogoLoaderProps {
  height?: number | 'auto'
  size?: IntRange<1, 100>
}
export const LogoLoader: FC<LogoLoaderProps> = ({ height = 'auto', size = 100 }) => {
  return (
    <div
      className='d-flex flex-center gap-10px w-100 mb-n3'
      style={{ height, transform: `scale(${size / 50})` }}>
      <div className='d-flex flex-center mb-5px'>
        {/* <img src='/logo/logo-circle.png' className='h-20px' alt='' /> */}
        <div className='text-primary fs-16px'>{APP_NAME}</div>
      </div>
      <DotFlash animation='flashing' style={{ transform: 'scale(1.25)' }} />
    </div>
  )
}
