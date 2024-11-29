import Link from 'next/link'

import data from '../../Data/servicePage.json'

const Service6 = () => {
  return (
    <div className='servcie2 service-page-sec bg-white'>
      <div className='space50' />
      <div className='container'>
        <div className='row'>
          {data.map((item, i) => (
            <div key={i} className='col-lg-6 col-md-6'>
              <Link className='' href={item?.btnLink || '/'}>
                <div className='servcie2-box'>
                  <div className='icon'>
                    <img src={item.icon} alt='' />
                  </div>
                  <div className='arrow'>
                    <i className='fas fa-arrow-right text-primary' />
                  </div>
                  <div className='heading1'>
                    <div className='fw-bolder fs-18px'>{item.title}</div>
                    <div className='space10'></div>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='space100' />
    </div>
  )
}

export default Service6
