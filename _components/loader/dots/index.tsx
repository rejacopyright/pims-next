import './style.scss'

import { CSSProperties, FC } from 'react'

interface Props {
  animation?: 'flashing' | 'falling' | 'pulse'
  style?: CSSProperties
}

export const DotFlash: FC<Props> = ({ animation = 'flashing', style }) => (
  <div className='d-inline-flex flex-center ms-4 mb-0' style={style}>
    <i className={`dot-${animation}`} />
  </div>
)
