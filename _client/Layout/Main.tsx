import { Footer1 } from '../Components/Footer/Footer1'
import { Header1 } from '../Components/Header/Header1'

const Main = ({ children }) => {
  return (
    <div className='main-page-area'>
      <Header1 />
      {children}
      <Footer1 />
    </div>
  )
}

export default Main
