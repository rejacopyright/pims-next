import { FC, ReactNode, useEffect, useState } from 'react'

interface CardBadgeProps {
  title?: ReactNode
}

export const CardTrophy: FC<CardBadgeProps> = ({ title }) => {
  const [dataTrophy, setDataTrophy] = useState<any>([])
  useEffect(() => {
    setDataTrophy([
      { category: '교육', name: '8살, 박포텐 마크초등학교 입학', icon: '🤓' },
      { category: '교육', name: '14살, 피아노 콩쿠르 2위', icon: '🏆' },
      { category: '교육', name: 'SKT 1기 해커톤 참여', icon: '🧑‍💻' },
      { category: '관광', name: 'SKT 1기 해커톤 포루투칼 해외 연수', icon: '🤓' },
    ])
  }, [])
  return (
    <div className='container content position-relative overflow-hidden'>
      <div className='d-flex flex-center' style={{ marginTop: '150px', marginBottom: '150px' }}>
        <div className='position-absolute' style={{ zIndex: 0 }}>
          <img alt='' src='/media/assets/graph.png' className='w-100' />
        </div>
        <div className='text-center' style={{ zIndex: 1 }}>
          <div className='text-center'>{title}</div>
          <div className='d-flex flex-center my-32px gap-32px'>
            {dataTrophy?.map((item: any, index: number) => (
              <div key={index} className='col-12 col-md-6 col-lg-3 mb-5 mb-lg-0'>
                <div
                  className='d-flex flex-center bg-white border shadow-xs radius-15 px-50px'
                  style={{ height: '178px' }}>
                  <div className='text-start w-100'>
                    <div className=''>
                      <div className='py-2px px-8px radius-5 bg-light-orange text-orange fw-bold fs-13px d-inline-block'>
                        {item?.category}
                      </div>
                    </div>
                    <div className='fs-28px'>{item?.icon}</div>
                    <div className='fw-bolder fs-16px'>
                      <div className='text-truncate-1'>{item?.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='d-flex flex-center gap-16px'>
            <div className='btn btn-flex flex-center p-0 btn-primary w-92px h-46px ls-n1 text-nowrap'>
              크리에이터
            </div>
            <div className='btn btn-flex flex-center p-0 btn-white border fw-bolder text-dark w-92px h-46px ls-n1 text-nowrap'>
              비즈니스
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
