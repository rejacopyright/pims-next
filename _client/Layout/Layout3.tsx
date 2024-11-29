import { Footer3 } from '../Components/Footer/Footer3'
import { HeaderStyle3 } from '../Components/Header/HeaderStyle3'

const Layout3 = ({ children }) => {
  return (
    <div className='main-page-area3'>
      <HeaderStyle3 />
      {children}
      <Footer3 />
    </div>
  )
}

export default Layout3
