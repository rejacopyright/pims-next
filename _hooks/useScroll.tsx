'use client'
import { throttle } from 'lodash'
import { useEffect } from 'react'

function useScroll(func: any, timeout: number) {
  useEffect(() => {
    const fireEventListener: any = throttle(func, timeout || 100)
    fireEventListener()
    window?.addEventListener('scroll', fireEventListener)
    return () => window?.removeEventListener('scroll', fireEventListener)
  }, [func, timeout])
}

export default useScroll
