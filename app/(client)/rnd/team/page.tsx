'use client'

import BreadCumb from '@client/Components/Common/BreadCumb'
import { FC } from 'react'
import Team5 from '@client/Components/Team/Team5'

const Index: FC<any> = () => {
  return (
    <div className='service-page'>
      <BreadCumb Title='Our Team' />
      <Team5 />
    </div>
  )
}

export default Index
