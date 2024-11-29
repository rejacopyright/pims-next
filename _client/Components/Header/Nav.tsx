import Link from 'next/link'

import DropDown from './DropDown'

export default function Nav({ setMobileToggle }) {
  return (
    <ul className='cs_nav_list fw-medium'>
      <li className='menu-item-single'>
        <Link href='/'>Home</Link>
      </li>
      <li className='menu-item-has-children'>
        <Link href='/product' onClick={() => setMobileToggle(false)}>
          Product
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href='/product/ransomware' onClick={() => setMobileToggle(false)}>
                Ransomware
              </Link>
            </li>
            <li>
              <Link href='/product/ecert' onClick={() => setMobileToggle(false)}>
                E-Certificate
              </Link>
            </li>
            <li>
              <Link href='/product/data-protection' onClick={() => setMobileToggle(false)}>
                Data Protection
              </Link>
            </li>
            <li>
              <Link href='/product/smart-security' onClick={() => setMobileToggle(false)}>
                Smart Security
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>

      <li className='menu-item-has-children'>
        <div onClick={() => setMobileToggle(false)}>R & D</div>
        <DropDown>
          <ul>
            <li>
              <Link href='/rnd/team' onClick={() => setMobileToggle(false)}>
                Team
              </Link>
            </li>
            <li>
              <Link href='/blog' onClick={() => setMobileToggle(false)}>
                Blog
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      <li className='menu-item-single'>
        <Link href='/about'>About Us</Link>
      </li>
    </ul>
  )
}
