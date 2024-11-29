'use client'
import { useSize } from '@hooks'
import { CSSProperties, FC, useEffect, useState } from 'react'

type Kebab<T extends string, A extends string = ''> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
  : A
type KebabKeys<T> = { [K in keyof T as K extends string ? Kebab<K> : K]: T[K] }

// export const getContentProperty = (property: keyof CSSProperties) => {
export const getContentProperty = (property: keyof KebabKeys<CSSProperties>) => {
  const thisEl: any = document.getElementById('kt_content')
  const res: any = thisEl
    ? window?.getComputedStyle(thisEl, null)?.getPropertyValue(property)
    : undefined

  return res
}

export const elementProperty: any = () => {
  const headerEl: any = document.getElementById('kt_header')
  const toolBarEl: any = document.getElementById('kt_toolbar')
  const headerHeight: any = headerEl
    ? parseInt(window?.getComputedStyle(headerEl, null)?.getPropertyValue('height'))
    : 55
  const toolBarHeight: any = toolBarEl
    ? parseInt(window?.getComputedStyle(toolBarEl, null)?.getPropertyValue('height'))
    : 0
  const toolBarIsHidden: any = toolBarEl
    ? window?.getComputedStyle(toolBarEl, null)?.getPropertyValue('display')?.match('none')
    : true

  return { headerHeight, toolBarHeight, toolBarIsHidden }
}

export const Sticky: FC<any> = ({ children, className = '', style = {} }) => {
  const { headerHeight, toolBarHeight, toolBarIsHidden }: any = elementProperty() || {}
  const [top, setTop] = useState<any>(0)

  const wrapper: any = document.getElementById('kt_wrapper')
  const getHeight: any = (headerHeight || 0) + (!toolBarIsHidden ? toolBarHeight || 0 : 0)

  useSize(() => {
    setTop(getHeight)
    try {
      wrapper.style.paddingTop = getHeight + 'px'
    } catch {
      undefined
    }
  }, 100)

  useEffect(() => {
    return () => {
      const wrapper: any = document.getElementById('kt_wrapper')
      try {
        wrapper.style.paddingTop = headerHeight + (toolBarHeight || 0) + 'px'
      } catch {
        undefined
      }
    }
  }, [headerHeight, toolBarHeight])

  return (
    <div className='position-sticky w-100' style={{ zIndex: 99, top }}>
      {className ? (
        <div className={className} style={style}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}
