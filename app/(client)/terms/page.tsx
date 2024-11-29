import './static/styleguide.css'
import './static/style.css'
import './static/globals.scss'

import BreadCumb from '@client/Components/Common/BreadCumb'
import { PageTitle } from '@metronic/layout/core'
import { FC } from 'react'

import __html from './static'

const Index: FC<any> = () => {
  return (
    <>
      <PageTitle description='Digital Assessment Designer'>Terms</PageTitle>
      <BreadCumb Title='Our Terms' />
      <div className='mb-24px' dangerouslySetInnerHTML={{ __html }} />
    </>
  )
}

export default Index
