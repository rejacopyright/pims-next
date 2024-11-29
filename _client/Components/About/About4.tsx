import Link from 'next/link'
import { FC } from 'react'

const About4: FC<any> = ({
  _image1,
  image2,
  _image3,
  _shape1,
  subTitle,
  Title,
  content,
  expNum,
  expCon,
  featurelist,
  btnName,
  btnUrl,
}) => {
  return (
    <div className='about4 sp'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='images'>
              <div className='img1 shape-animaiton4'>
                <img src={'/client/img/about3-bg.png'} alt='' />
              </div>
              {/* <div className='img2' data-aos='zoom-out' data-aos-duration='800'>
                <img src={image1} alt='' />
              </div> */}
              <div className='img3' data-aos='zoom-out' data-aos-duration='1000'>
                <img src={image2} alt='' />
              </div>
              {/* <div className='img4' data-aos='zoom-out' data-aos-duration='1200'>
                <img src={image3} alt='' />
              </div> */}
              {/* <div className='img5' data-aos='flip-left' data-aos-duration='800'>
                <img src={shape1} alt='' />
              </div> */}
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='heading4'>
              <span className='span' data-aos='zoom-in-left' data-aos-duration='700'>
                {subTitle}
              </span>
              <h2 className='title tg-element-title'>{Title}</h2>
              <div className='space16'></div>
              <p data-aos='fade-left' data-aos-duration='700'>
                {content}
              </p>

              <div className='space30'></div>
              <div className='row align-items-center'>
                <div className='col-md-4'>
                  <div className='counter-box' data-aos='fade-left' data-aos-duration='900'>
                    <h3>{expNum}</h3>
                    <p>{expCon}</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <ul className='list' data-aos='fade-left' data-aos-duration='800'>
                    {featurelist?.map((item, index) => (
                      <li key={index} className='d-flex w-200px gap-10px my-10px'>
                        <span className='m-0 h-20px w-20px bg-primary'>
                          <i className='bi bi-check-lg text-white' />
                        </span>
                        <div className='text-nowrap'>{item}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='space30'></div>
              <div className='' data-aos='fade-left' data-aos-duration='1100'>
                <Link className='theme-btn5' href={btnUrl}>
                  {btnName}
                  <span>
                    <i className='fas fa-arrow-right text-primary' />
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

export default About4
