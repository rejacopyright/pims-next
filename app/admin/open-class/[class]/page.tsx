'use client'
import { isDev, toCapitalize } from '@helpers'
import { useQueryClient } from '@tanstack/react-query'
import { FC, use } from 'react'

import { Days } from './_parts/Days'
import { Times } from './_parts/Times'

const Index: FC<any> = ({ params }) => {
  const thisParams: any = use(params)
  const queryClient = useQueryClient()
  const classType = thisParams?.class

  return (
    <div className='content'>
      <title>{`Buka Kelas ${toCapitalize(classType === 'studio' ? 'Studio' : classType === 'functional' ? 'Fungsional' : 'Studio')}`}</title>
      <Days />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['openClass'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <Times />
      <div className='bg-white shadow-xs mb-50px'></div>
    </div>
  )
}

export default Index
