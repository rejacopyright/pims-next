import moment from 'moment'
import { FC } from 'react'

import ActionButtons from './ActionButtons'
import BadgeImage from './BadgeImage'

interface Props {
  detailBadge?: any
  badgePublicImage?: any
  isPublic: boolean
  shareIsLoading: boolean
}

const Index: FC<Props> = ({ detailBadge, badgePublicImage, isPublic, shareIsLoading }) => {
  const evidence: any = detailBadge?.evidence?.[0]?.ext || {}
  const achievement: any = detailBadge?.credentialSubject?.achievement || {}
  const issuanceDate: any = detailBadge?.issuanceDate
    ? moment(detailBadge?.issuanceDate).format('YYYY. MM. DD (DD MMMM, YYYY)')
    : '-'

  const tableInfoStyle: any = {
    key: {
      minWidth: '200px',
    },
    value: {
      minWidth: '200px',
    },
  }
  const tableInfoClass: any = {
    key: 'fs-14px py-4px text-gray-400 fw-400',
    value: 'fs-14px py-4px text-dark fw-400',
  }
  return (
    <div
      className={`row m-0 border border-gray-200 radius-15 p-5 pb-0 position-relative bg-white px-24px py-48px mb-16px ${isPublic ? 'mt-24px' : ''}`}>
      <div className='col-12 col-lg-auto p-0 d-flex justify-content-center align-items-center'>
        <BadgeImage publicImg={badgePublicImage} isPublic={isPublic} />
      </div>
      <div className='col p-0'>
        <div className='w-lg-450px mb-24px'>
          <div className='lh-30px fw-700 fs-22px mb-8px h-45px text-truncate'>
            {detailBadge?.name}
          </div>
          <div className='table-responsive'>
            <table className='table w-auto g-0 mb-0'>
              <tbody>
                <tr>
                  <td className={tableInfoClass?.key} style={tableInfoStyle?.key}>
                    성명 (Name)
                  </td>
                  <td className={tableInfoClass?.value} style={tableInfoStyle?.value}>
                    {evidence?.name || '-'}
                  </td>
                </tr>
                <tr>
                  <td className={tableInfoClass?.key} style={tableInfoStyle?.key}>
                    품단급 (Poom&Dan&Geub)
                  </td>
                  <td className={tableInfoClass?.value} style={tableInfoStyle?.value}>
                    {evidence?.poom_dan_geub || '-'}
                  </td>
                </tr>
                <tr>
                  <td className={tableInfoClass?.key} style={tableInfoStyle?.key}>
                    생년월일 (Date of Birth)
                  </td>
                  <td className={tableInfoClass?.value} style={tableInfoStyle?.value}>
                    {evidence?.date_of_birth || '-'}
                  </td>
                </tr>
                <tr>
                  <td className={tableInfoClass?.key} style={tableInfoStyle?.key}>
                    국적 (Nationality)
                  </td>
                  <td className={tableInfoClass?.value} style={tableInfoStyle?.value}>
                    {evidence?.nationality || '-'}
                  </td>
                </tr>
                <tr>
                  <td className={tableInfoClass?.key} style={tableInfoStyle?.key}>
                    발급일자 (Issue date)
                  </td>
                  <td className={tableInfoClass?.value} style={tableInfoStyle?.value}>
                    {issuanceDate || '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='fs-16px w-lg-450px fw-400' style={{ whiteSpace: 'pre-line' }}>
          {achievement?.criteria?.narrative?.split('\\n')?.join('\n') || ''}
        </div>
        {!isPublic && <ActionButtons detailBadge={detailBadge} shareIsLoading={shareIsLoading} />}
      </div>
    </div>
  )
}

export default Index
