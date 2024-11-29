'use client'

import BreadCumb from '@client/Components/Common/BreadCumb'
import { FC } from 'react'
import Vission1 from '@client/Components/Mission/Vission1'
import ContactInfo1 from '@client/Components/ContactInfo/ContactInfo1'
import Cta4 from '@client/Components/Cta/Cta4'

const Index: FC<any> = () => {
  return (
    <div className='service-page'>
      <BreadCumb Title='About Us' />
      <Vission1 />
      <ContactInfo1 />
      <Cta4 />
    </div>
  )
}

export default Index
