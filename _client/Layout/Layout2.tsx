import { Footer2 } from '../Components/Footer/Footer2'
import { HeaderStyle2 } from '../Components/Header/HeaderStyle2'

const Layout2 = ({ children }) => {
  return (
    <div className='main-page-area2 body2'>
      <HeaderStyle2 />
      {children}
      <Footer2 />
    </div>
  )
}

export default Layout2
