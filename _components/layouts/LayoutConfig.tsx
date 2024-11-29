import AdminMenu from '@metronic/layout/components/aside/AdminMenu'
import TrainerMenu from '@metronic/layout/components/aside/TrainerMenu'
import { AdminHeader } from '@metronic/layout/components/header/AdminHeader'
import { MenuHeader } from '@metronic/layout/components/header/MenuHeader'
import AdminNavbar from '@metronic/layout/navbar/AdminNavbar'
import TrainerNavbar from '@metronic/layout/navbar/TrainerNavbar'
import UserNavbar from '@metronic/layout/navbar/UserNavbar'

export interface DataTypes {
  role?: 'admin' | 'user' | 'trainer'
}
interface RoleProps extends DataTypes {
  sidebar?: any
  navbar?: any
  header?: any
}

export const defineRole: RoleProps[] = [
  { role: 'user', sidebar: false, navbar: UserNavbar, header: MenuHeader },
  { role: 'trainer', sidebar: TrainerMenu, navbar: TrainerNavbar },
  { role: 'admin', sidebar: AdminMenu, navbar: AdminNavbar, header: AdminHeader },
]
