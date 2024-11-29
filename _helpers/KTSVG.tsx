import { FC } from 'react'
import SVG from 'react-inlinesvg'

type Props = {
  className?: string
  path: string
  svgClassName?: string
  width?: number
  height?: number
  style?: any
  alt?: any
}

const KTSVG: FC<Props> = ({ className = '', path, svgClassName = '', width, height, style }) => {
  return (
    <div suppressHydrationWarning className={`svg-icon ${className}`}>
      <SVG
        suppressHydrationWarning
        src={path}
        className={svgClassName || (!width && !height ? 'mh-50px' : 'w-auto h-auto')}
        width={width}
        height={height}
        style={style}
      />
    </div>
  )
}
const IMG: FC<Props> = ({ className = '', path, width, height, style, alt = '' }) => {
  return (
    <img
      src={path}
      className={className}
      alt={alt}
      width={width || 'auto'}
      height={height || 'auto'}
      style={style}
    />
  )
}

export { IMG, KTSVG }
