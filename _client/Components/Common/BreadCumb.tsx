import Link from 'next/link'

const BreadCumb = ({ Title }) => {
  return (
    <div
      className='common-hero'
      style={{
        height: '300px',
        minHeight: 'unset',
        background: '#fff url(/client/img/hero-bg7.jpg) center / cover no-repeat ',
      }}>
      <div className='container'>
        <div className='row align-items-center text-center'>
          <div className='col-lg-6 m-auto'>
            <div className='main-heading'>
              <h1 className='text-white'>{Title}</h1>
              <div className='space16'></div>
              <span className='span text-white'>
                <img src='/logo/logo.png' className='w-50px me-10px' alt='' />
                <Link className='text-white' href='/'>
                  Home
                </Link>
                <span className='arrow mx-10px'>
                  <i className='fas fa-chevron-right text-white' />
                </span>
                {Title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreadCumb
