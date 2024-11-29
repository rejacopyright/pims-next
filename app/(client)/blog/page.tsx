'use client'

import Blog8 from '@client/Components/Blog/Blog8'
import BreadCumb from '@client/Components/Common/BreadCumb'
import { FC } from 'react'

const Index: FC<any> = () => {
  return (
    <div className='service-page'>
      <BreadCumb Title='Blogs' />
      <Blog8 />
    </div>
  )
}

export default Index
