import { APP_TRAINER_PATH, translate } from '@helpers'
import { FC } from 'react'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'

const Index: FC<any> = () => {
  // const intl = useIntl()

  return (
    <>
      <AsideMenuItemWithSub
        to={`${APP_TRAINER_PATH}/issuer`}
        title='Issuer'
        fontIcon='bi-chat-left'
        icon='/media/icons/custom/issuer-icon.svg'>
        <AsideMenuItem
          to={`${APP_TRAINER_PATH}/issuer/badge`}
          title={translate('MENU.ISSUER.OPENBADGE_MANAGEMENT')}
          hasBullet={true}
        />
        <AsideMenuItem
          to={`${APP_TRAINER_PATH}/issuer/recepient/`}
          title={translate('MENU.ISSUER.GRANTEE_MANAGEMENT')}
          hasBullet={true}
        />
        <AsideMenuItem
          to={`${APP_TRAINER_PATH}/issuer/tag/`}
          title={translate('MENU.ISSUER.TAG_MANAGEMENT')}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`${APP_TRAINER_PATH}/verifier`}
        title='Verifier'
        fontIcon='bi-chat-left'
        icon='/media/icons/custom/carbon-white-paper.svg'>
        <AsideMenuItem
          to={`${APP_TRAINER_PATH}/verifier/request-management`}
          title={translate('MENU.VERIFIER.REQUEST_MANAGEMENT')}
          hasBullet={true}
        />
        <AsideMenuItem
          to={`${APP_TRAINER_PATH}/verifier/group`}
          title={translate('MENU.VERIFIER.REQUEST_GROUP')}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
    </>
  )
}

export default Index
