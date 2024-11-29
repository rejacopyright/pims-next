import { DefaultTitle } from '@metronic/layout/components/header/page-title/DefaultTitle'
import { useLayout } from '@metronic/layout/core'
import clsx from 'clsx'
import { FC } from 'react'

const Toolbar: FC<any> = ({ sidebar }) => {
  const { classes, config } = useLayout()
  const toolbarIsShown = config?.toolbar?.display

  return (
    <div
      className={clsx('toolbar', { 'start-0': !sidebar, 'd-none': !toolbarIsShown })}
      id='kt_toolbar'>
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}>
        <DefaultTitle />

        <div id='toolbar_actions'></div>
      </div>
    </div>
  )
}

export { Toolbar }
