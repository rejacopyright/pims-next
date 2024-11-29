import Link from 'next/link'

import SectionTitle from '../Common/SectionTitle'

const Blog8 = () => {
  return (
    <div className='blog sp pt-50px'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='blog-box' data-aos='zoom-in-up' data-aos-duration='1100'>
              <div className='image image-anime'>
                <img src='/client/img/blog8.png' alt='' />
              </div>
              <div className='heading'>
                <div className='tags'>
                  <a href='#'>
                    <img src='/client/icons/blog-icon1.png' alt='' /> John William
                  </a>
                  <a href='#'>
                    <img src='/client/icons/blog-icon2.png' alt='' /> Feb 25, 24
                  </a>
                </div>
                <h4>
                  <Link href='/blog/blog-details'>
                    Demystifying Blockchain: How It is Revolutionising Industries.
                  </Link>
                </h4>
                <Link href='/blog/blog-details' className='learn'>
                  Learn More
                  <span>
                    <i className='fa fa-long-arrow-right' aria-hidden='true'></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className='blog-box' data-aos='zoom-in-up' data-aos-duration='900'>
              <div className='image image-anime'>
                <img src='/client/img/blog2.png' alt='' />
              </div>
              <div className='heading'>
                <div className='tags'>
                  <a href='#'>
                    <img src='/client/icons/blog-icon1.png' alt='' /> John William
                  </a>
                  <a href='#'>
                    <img src='/client/icons/blog-icon2.png' alt='' /> Feb 25, 24
                  </a>
                </div>
                <h4>
                  <Link href='/blog/blog-details'>
                    Cybersecurity Essentials: Protecting Your Business
                  </Link>
                </h4>
                <Link href='/blog/blog-details' className='learn'>
                  Learn More
                  <span>
                    <i className='fa fa-long-arrow-right' aria-hidden='true'></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className='blog-box' data-aos='zoom-in-up' data-aos-duration='700'>
              <div className='image image-anime'>
                <img src='/client/img/blog3.png' alt='' />
              </div>
              <div className='heading'>
                <div className='tags'>
                  <a href='#'>
                    <img src='/client/icons/blog-icon1.png' alt='' /> John William
                  </a>
                  <a href='#'>
                    <img src='/client/icons/blog-icon2.png' alt='' /> Feb 25, 24
                  </a>
                </div>
                <h4>
                  <Link href='/blog/blog-details'>
                    The Future of Work: Embracing Remote Collaboration Tools
                  </Link>
                </h4>
                <Link href='/blog/blog-details' className='learn'>
                  Learn More
                  <span>
                    <i className='fa fa-long-arrow-right' aria-hidden='true'></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog8
