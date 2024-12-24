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
      {/* <AsideMenuItem
        to={`${APP_ADMIN_PATH}/other`}
        icon='/media/icons/general/gen043.svg'
        title='Other'
        fontIcon='bi-app-indicator'
      /> */}
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
      <AsideMenuItemWithSub
        to={`${APP_ADMIN_PATH}/open-class`}
        title='Buka Kelas'
        fontIcon='bi-user'
        icon='/media/icons/abstract/abs038.svg'>
        <AsideMenuItem
          to={`${APP_ADMIN_PATH}/open-class/studio`}
          title='Kelas Studio'
          hasBullet={true}
        />
        <AsideMenuItem
          to={`${APP_ADMIN_PATH}/open-class/functional`}
          title='Kelas Fungsional'
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`${APP_ADMIN_PATH}/member`}
        title='Member'
        fontIcon='bi-user'
        icon='/media/icons/general/gen026.svg'>
        <AsideMenuItem to={`${APP_ADMIN_PATH}/member/package`} title='Paket' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`${APP_ADMIN_PATH}/user`}
        title='User'
        fontIcon='bi-user'
        icon='/media/icons/communication/com013.svg'>
        <AsideMenuItem
          to={`${APP_ADMIN_PATH}/user/regular`}
          title='User Reguler'
          hasBullet={true}
        />
        <AsideMenuItem to={`${APP_ADMIN_PATH}/user/member`} title='Member' hasBullet={true} />
        <AsideMenuItem to={`${APP_ADMIN_PATH}/user/trainer`} title='Trainer' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}

export default Index
