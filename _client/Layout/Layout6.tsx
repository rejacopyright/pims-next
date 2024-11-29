import { Footer2 } from '../Components/Footer/Footer2'
import { HeaderStyle2 } from '../Components/Header/HeaderStyle2'

const Layout6 = ({ children }) => {
  return (
    <div className='comon-body tg-heading-subheading animation-style3'>
      <HeaderStyle2 />
      {children}
      <Footer2 />
    </div>
  )
}

export default Layout6
