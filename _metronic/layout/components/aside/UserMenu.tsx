import { APP_USER_PATH, translate } from '@helpers'
import { FC } from 'react'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'

const Index: FC<any> = () => {
  return (
    <>
      <AsideMenuItem
        to={`${APP_USER_PATH}/dashboard`}
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
      <AsideMenuItemWithSub
        to={`${APP_USER_PATH}/wallet`}
        title={translate('MENU.WALLET')}
        fontIcon='bi-chat-left'
        icon='/media/icons/general/gen026.svg'>
        <AsideMenuItem
          to={`${APP_USER_PATH}/wallet/chainverse`}
          title={translate('MENU.CHAINVERSE')}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to={`${APP_USER_PATH}/verification`}
        icon='/media/icons/general/gen043.svg'
        title={translate('MENU.VERIFICATION')}
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export default Index
