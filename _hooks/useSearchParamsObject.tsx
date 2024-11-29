'use client'
import fromPairs from 'lodash/fromPairs'
import { useSearchParams } from 'next/navigation'

function useSearchParamsObject() {
  const params: any = useSearchParams()
  const paramsArray: any = params?.entries()?.toArray() || []
  const searchParams: any = fromPairs(paramsArray)
  return searchParams
}

export default useSearchParamsObject
