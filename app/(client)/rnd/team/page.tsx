'use client'

import BreadCumb from '@client/Components/Common/BreadCumb'
import Team5 from '@client/Components/Team/Team5'
import { FC } from 'react'

const Index: FC<any> = () => {
  return (
    <div className='service-page'>
      <BreadCumb Title='Our Team' />
      <Team5 />
    </div>
  )
}

export default Index
