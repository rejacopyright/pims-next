const Cta4 = () => {
  return (
    <div className='cta7 my-50px'>
      <div className='container'>
        <div className='row bg bg-primary align-items-center'>
          <div className='col-lg-6'>
            <div className='heading5-w'>
              <h2>Schedule A Free Consultation</h2>
              <div className='space16'></div>
              <p>
                Feel free to customize this paragraph to better reflect the specific services
                offered by your IT solution & the unique value proposition of your company.
              </p>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='form-area'>
              <form action='#'>
                <input type='email' placeholder='Enter Email Address' />
                <div className='button'>
                  <button
                    className='theme-btn13 d-flex align-items-center justify-content-space-between h-50px pe-10px'
                    type='submit'>
                    <div className='text'>Subscribe</div>
                    <span className='arrows'>
                      <span className='arrow1'>
                        <i className='fas fa-arrow-right text-primary' />
                      </span>
                      {/* <span className='arrow2'>
                        <i className='bi bi-arrow-right'></i>
                      </span> */}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cta4
