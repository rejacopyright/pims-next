'use client'

import BreadCumb from '@client/Components/Common/BreadCumb'
import ProjectDetailsCenter1 from '@client/Components/ProjectDetails/ProjectDetailsCenter1'
import data from '@client/Data/servicePage.json'
import { useParams } from 'next/navigation'
import { FC } from 'react'

const Index: FC<any> = () => {
  const params = useParams()?.product?.[0]
  const detail = data?.find(({ name }: any) => name === params)
  return (
    <div className='service-page'>
      <BreadCumb Title={detail?.title} />
      <ProjectDetailsCenter1 />
    </div>
  )
}

export default Index
