import { FC, ReactNode, useEffect, useState } from 'react'

interface CardBadgeProps {
  title?: ReactNode
}

export const CardBadge: FC<CardBadgeProps> = ({ title }) => {
  const [dataBadges, setDataBadges] = useState<any>([])
  useEffect(() => {
    setDataBadges([
      { category: '공공교육', name: '1학년 1학기 성적증명서', issuer: '마크초등학교' },
      { category: '스포츠', name: '1학년 2학기 성적증명서', issuer: '마크초등학교' },
      {
        category: '관광',
        name: 'Badge names can be up to 20 characters long.',
        issuer: '마크애니 체인버스',
      },
    ])
  }, [])
  return (
    <div className='container content' style={{ marginTop: '100px', marginBottom: '100px' }}>
      <div className='text-center'>{title}</div>
      <div className='row'>
        {dataBadges?.map((item: any, index: number) => (
          <div key={index} className='col-12 col-md-6 col-lg-3 mb-5 mb-lg-0'>
            <div
              className='d-flex flex-center bg-white border shadow-xs radius-15 px-50px'
              style={{ height: '360px' }}>
              <div className='text-center'>
                <div className=''>
                  <div className='py-2px px-8px radius-5 bg-light-orange text-orange fw-bold fs-13px d-inline-block'>
                    {item?.category}
                  </div>
                </div>
                <img
                  alt=''
                  src='/media/placeholder/badge.png'
                  className='my-20px'
                  style={{ width: '150px', height: '150px' }}
                />
                <div className='d-flex flex-center h-48px fw-bolder fs-16px mb-20px'>
                  <div className='text-truncate-2'>{item?.name}</div>
                </div>
                <div className='d-flex flex-center fs-14px gap-5px'>
                  <div className='text-nowrap ls-n1'>발행 기관</div>
                  <div className='ls-n1 text-truncate-1'>{item?.issuer}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
