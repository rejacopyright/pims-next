'use client'

import BreadCumb from '@client/Components/Common/BreadCumb'
import { FC } from 'react'
import Blog5 from '@client/Components/Blog/Blog5'
import Blog8 from '@client/Components/Blog/Blog8'

const Index: FC<any> = () => {
  return (
    <div className='service-page'>
      <BreadCumb Title='Blogs' />
      <Blog8 />
    </div>
  )
}

export default Index
