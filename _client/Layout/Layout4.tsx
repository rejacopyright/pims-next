import { Footer4 } from '../Components/Footer/Footer4'
import { Header4 } from '../Components/Header/HeaderStyle4'

const Layout4 = ({ children }) => {
  return (
    <div className='home-page4'>
      <Header4 />
      {children}
      <Footer4 />
    </div>
  )
}

export default Layout4
