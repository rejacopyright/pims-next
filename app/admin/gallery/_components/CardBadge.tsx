import { FC } from 'react'

const CardBadge: FC<{ detail: any; onClick?: () => void }> = ({ detail, onClick = () => '' }) => {
  const { NAME, BIZ_NM, ACHIEVEMENT_TYPE } = detail || {}
  const img = detail?.img || '/media/placeholder/badge.png'

  return (
    <div
      className='card-2 d-flex flex-column position-relative bg-white radius-15 p-24px cursor-pointer justify-content-center'
      onClick={onClick}
      style={{ height: '35vh' }}>
      <div className='text-center'>
        <div className='py-2px px-8px radius-5 bg-light-orange text-orange fw-400 fs-13px d-inline-block'>
          {ACHIEVEMENT_TYPE}
        </div>
      </div>
      <div
        className='radius-10 d-flex mx-auto badge-img my-20px'
        style={{ background: `url(${img}) center / contain no-repeat` }}
      />
      <div className='d-flex flex-center h-48px fw-bolder fs-16px mb-20px'>
        <div className='text-truncate-2'>{NAME}</div>
      </div>
      <div className='d-flex flex-center fs-14px gap-5px'>
        <div className='text-nowrap text-gray-400 ls-n1'>발행 기관</div>
        <div className='ls-n1 fw-bold text-truncate-1'>{BIZ_NM}</div>
      </div>
    </div>
  )
}

export default CardBadge
