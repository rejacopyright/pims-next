import data from '../../Data/team5.json'

const Team2 = () => {
  return (
    <div className='team3 sp bg-white pt-20px'>
      <div className='container'>
        <div className='row'>
          {data.map((item, i) => (
            <div key={i} className='col-lg-3 col-md-6 my-20px'>
              <div className='team-box' data-aos='zoom-in-up' data-aos-duration='1200'>
                <div className='image-area'>
                  <div className='image image-anime'>
                    <img src={item.img} alt='' />
                  </div>
                  <div className='icon-area'>
                    <ul>
                      <li>
                        <a href='#'>
                          <i className='bi bi-linkedin'></i>
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='bi bi-twitter'></i>
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='bi bi-youtube'></i>
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='bi bi-instagram'></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='space30'></div>
                <div className='heading3'>
                  <h4>
                    <a href='#'>{item.title}</a>
                  </h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Team2
