import Link from 'next/link'

const Blog4 = () => {
  return (
    <div className='blog4 sp'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 m-auto text-center'>
            <div className='heading4'>
              <span className='span' data-aos='zoom-in-left' data-aos-duration='700'>
                Blog & News 👋
              </span>
              <h2 className='title tg-element-title'>See Our Latest Blog & News</h2>
            </div>
          </div>
        </div>

        <div className='space30'></div>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='blog4-box' data-aos='zoom-in-up' data-aos-duration='900'>
              <div className='image image-anime'>
                <img src='/client/img/blog1.png' alt='' />
              </div>
              <div className='heading4'>
                <div className='tags'>
                  <a href='#' className='date'>
                    <img src='/client/icons/date3.png' alt='' /> Feb 24, 24
                  </a>
                  <a href='#' className='date outhor'>
                    <img src='/client/icons/blog-icon1.png' alt='' /> M.Rahman
                  </a>
                </div>
                <h3>
                  <Link href='/blog/blog-details'>The Importance of Cybersecurity</Link>
                </h3>
                <div className='space16'></div>
                <p>
                  We explore the growing trend of remote work and its implications for
                  cybersecurity.
                </p>
                <div className='space16'></div>
                <Link href='/blog/blog-details' className='learn'>
                  Read More{' '}
                  <span>
                    <i className='bi bi-arrow-right'></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='blog4-box' data-aos='zoom-in-up' data-aos-duration='700'>
              <div className='image image-anime'>
                <img src='/client/img/blog2.png' alt='' />
              </div>
              <div className='heading4'>
                <div className='tags'>
                  <a href='#' className='date'>
                    <img src='/client/icons/date3.png' alt='' /> Feb 24, 24
                  </a>
                  <a href='#' className='date outhor'>
                    <img src='/client/icons/blog-icon1.png' alt='' /> M.Rahman
                  </a>
                </div>
                <h3>
                  <Link href='/blog/blog-details'>The Future of Cloud Computing</Link>
                </h3>
                <div className='space16'></div>
                <p>
                  We take a deep dive into the future of cloud computing and discuss emerging trends
                  and predictions that the industry.
                </p>
                <div className='space16'></div>
                <Link href='/blog/blog-details' className='learn'>
                  Read More{' '}
                  <span>
                    <i className='bi bi-arrow-right'></i>
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

export default Blog4
