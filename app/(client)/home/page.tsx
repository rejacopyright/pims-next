'use client'

import About4 from '@client/Components/About/About4'
import Blog5 from '@client/Components/Blog/Blog5'
import Brand1 from '@client/Components/Brand/Brand1'
import Cta4 from '@client/Components/Cta/Cta4'
import Faq2 from '@client/Components/Faq/Faq2'
import HeroBanner5 from '@client/Components/HeroBanner/HeroBanner5'
import HowWork3 from '@client/Components/HowWork/HowWork3'
import Services4 from '@client/Components/Services/Services4'
import Team3 from '@client/Components/Team/Team3'
import { FC } from 'react'

const Home: FC<any> = () => {
  return (
    <div className=''>
      <HeroBanner5
        subtitle='Our Integrated IT Solutions'
        title='Harness Technology Drive Growth with Our IT Solutions'
        content='Welcome to Your Company Techniq where innovative IT solutions meet your business needs head-on.'
        btnone='Free Consultation'
        btnoneurl='/service'
        btntwo='Discover More'
        btntwourl='/service'
        image1='/client/img/hero7-image.png'
        shape2='/client/img/hero7-shape1.png'
        shape3='/client/img/hero7-shape2.png'
        shape4='/client/img/hero7-shape3.png'
        shape5='/client/img/hero7-shape7.png'
      />
      <About4
        image1='/client/img/about4-img1.png'
        image2='/client/img/hero7-image.png'
        image3='/client/img/about4-img3.png'
        shape1='/client/img/about3-shape1.png'
        subTitle='About Us 👋'
        Title='Innovative IT Solutions For Modern Businesses'
        content='Our journey began with a vision to empower businesses of all sizes with cutting-edge technology solutions tailored to their unique needs. Our team of experienced professionals brings together a diverse range'
        expNum='25'
        expCon='Years Experience'
        featurelist={['Tech Solution', 'It Consulting', 'Cyber Security']}
        btnName='Read More'
        btnUrl='/about'
      />
      <Services4 />
      <HowWork3 />
      <Team3 />
      <Faq2 />
      <Brand1 />
      <Blog5 />
      <Cta4 />
    </div>
  )
}

export default Home
