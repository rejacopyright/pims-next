import Link from 'next/link'

const ProjectDetailsCenter1 = () => {
  const features = [
    'Needs Assessment',
    'Solution Design',
    'Data Migration',
    'Change Management',
    'Testing & Quality',
    'Go Live & Support',
  ]
  return (
    <div className='service-details-area-all sp'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 m-auto'>
            <div className='service-details-post'>
              <article>
                <div className='details-post-area'>
                  <div className='image'>
                    <img src='/client/img/project-details-img1.png' alt='' />
                  </div>
                  <div className='space30'></div>
                  <div className='heading1'>
                    <h2>Streamline Your Business Operations with (ERP) Systems</h2>
                    <div className='space16'></div>
                    <p className='text-dark'>
                      Enterprise Resource Planning (ERP) systems are powerful tools designed to
                      integrate and streamline various business processes, from finance and human
                      resources to supply chain management and customer relationship management. At
                      [Company Name], we specialize in ERP implementation, helping businesses of all
                      sizes optimize their operations, improve efficiency, and drive growth.
                    </p>
                  </div>
                </div>
              </article>

              <div className='space50'></div>

              <article>
                <div className='details-post-area'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='heading1'>
                        <h5>Our (ERP) Implementation Process</h5>
                        <div className='space16'></div>
                        <div className='boxs-area'>
                          <ul className='row'>
                            {features.map((item: any, index: number) => (
                              <div key={index} className='col-lg-4'>
                                <li className='w-100' style={{ minWidth: 'unset' }}>
                                  <span className='check'>
                                    <i className='bi bi-check-lg'></i>
                                  </span>
                                  {item}
                                </li>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <div className='space50'></div>

              <article>
                <div className='details-post-area'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='heading1'>
                        <h5>Benefits of (ERP) Implementation</h5>
                        <div className='space16'></div>
                        <div className='row'>
                          {Array(4)
                            .fill('')
                            .map((_, index: number) => (
                              <div key={index} className='col-lg-6 col-md-6'>
                                <div className='project-details-box heading1 bg-white'>
                                  <h4>
                                    <Link href='/project/project-details'>Improved Efficiency</Link>
                                  </h4>
                                  <div className='space16'></div>
                                  <p>
                                    Streamline business processes and workflows, reducing manual
                                    effort and improving productivity.
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <div className='space50'></div>

              <div className='get-started-box'>
                <h3>Get Started with ERP Implementation Today</h3>
                <div className='space16'></div>
                <p>
                  Ready to take your business to the next level with ERP implementation? Contact us
                  today to learn more about our ERP services and how we can help you optimize your
                  business operations for success.
                </p>
                <div className='space30'></div>
                <a href='contact.html' className='get-started-btn'>
                  Call Now
                  <span>
                    <i className='bi bi-arrow-right'></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsCenter1
