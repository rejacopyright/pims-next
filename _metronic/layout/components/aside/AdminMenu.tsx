import { APP_ADMIN_PATH, translate } from '@helpers'
import { FC } from 'react'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'

const Index: FC<any> = () => {
  return (
    <>
      <AsideMenuItem
        to={`${APP_ADMIN_PATH}/dashboard`}
        icon='/media/icons/art/art002.svg'
        // title={translate('MENU.DASHBOARD')}
        title='Dashboard'
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {translate('MENU.MAIN')}
          </span>
        </div>
      </div>
      <AsideMenuItem
        to={`${APP_ADMIN_PATH}/other`}
        icon='/media/icons/general/gen043.svg'
        title='Other'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItemWithSub
        to={`${APP_ADMIN_PATH}/class`}
        title='Kelas'
        fontIcon='bi-chat-left'
        icon='/media/icons/abstract/abs046.svg'>
        <AsideMenuItem
          to={`${APP_ADMIN_PATH}/class/studio`}
          title='Kelas Studio'
          hasBullet={true}
        />
        <AsideMenuItem
          to={`${APP_ADMIN_PATH}/class/functional`}
          title='Kelas Fungsional'
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
    </>
  )
}

export default Index
