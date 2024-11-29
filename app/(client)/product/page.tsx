import BreadCumb from '@client/Components/Common/BreadCumb'
import Cta1 from '@client/Components/Cta/Cta1'
import Service6 from '@client/Components/Services/Service6'
import { FC } from 'react'

const Index: FC<any> = () => {
  return (
    <div className='service-pages'>
      <BreadCumb Title='Our Products' />
      <Service6 />
      {/* <Vission1 /> */}
      <Cta1 />
    </div>
  )
}

export default Index
