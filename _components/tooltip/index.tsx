import './style.scss'

import { FC } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

interface Props {
  children: any
  placement?:
    | 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start'
  title?: string
  trigger?: 'hover' | 'click' | 'focus' | Array<'hover' | 'click' | 'focus'>
  active?: boolean
  tooltipClass?: string
}

const Index: FC<Props> = ({
  children = '',
  placement = 'auto', // 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
  title = 'Title',
  trigger = ['hover', 'focus'], // 'hover' | 'click' |'focus' | ['hover', 'click', 'focus']
  active = true,
  tooltipClass = '',
}) => {
  const renderTooltip = (props: any) => (
    <Tooltip {...props} className={tooltipClass}>
      {title}
    </Tooltip>
  )
  return (
    <OverlayTrigger
      overlay={renderTooltip}
      placement={placement}
      trigger={trigger}
      show={active ? undefined : false}>
      {children}
    </OverlayTrigger>
  )
}

export default Index
