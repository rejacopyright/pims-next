import { Footer5 } from '../Components/Footer/Footer5'
import { Header5 } from '../Components/Header/HeaderStyle5'

const Layout5 = ({ children }) => {
  return (
    <div>
      <Header5 />
      {children}
      <Footer5 />
    </div>
  )
}

export default Layout5
