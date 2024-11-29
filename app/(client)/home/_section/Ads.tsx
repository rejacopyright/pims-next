import { FC } from 'react'

export const HomepageAds: FC<any> = () => {
  return (
    <div className='container content'>
      <div
        className='d-flex flex-center position-relative'
        style={{ marginTop: '150px', marginBottom: '150px' }}>
        <div className='position-absolute' style={{ zIndex: 0 }}>
          <img alt='' src='/media/assets/winner.png' className='w-100' />
        </div>
        <div className='text-center' style={{ zIndex: 1 }}>
          <div className='fs-28px fw-bolder'>경험을 멈추지 마세요.</div>
          <div className='d-flex flex-between flex-wrap my-32px gap-32px'>
            <div
              className='d-flex flex-center gap-5px border border-gray-300 radius-15 fw-bolder bg-white'
              style={{ height: '123px', width: '242px' }}>
              <div className=''>
                <div className='mb-8px fs-28px'>🤠</div>
                <div className='d-flex gap-3px fs-18px'>
                  <div className='text-primary'>탐험가</div>
                  <div className=''>가되고</div>
                </div>
              </div>
            </div>
            <div
              className='d-flex flex-center gap-5px border border-gray-300 radius-15 fw-bolder bg-white'
              style={{ height: '123px', width: '242px' }}>
              <div className=''>
                <div className='mb-8px fs-28px'>⛷️</div>
                <div className='d-flex gap-3px fs-18px'>
                  <div className='text-primary'>크리에이터</div>
                  <div className=''>가 되고</div>
                </div>
              </div>
            </div>
            <div
              className='d-flex flex-center gap-5px border border-gray-300 radius-15 fw-bolder bg-white'
              style={{ height: '123px', width: '242px' }}>
              <div className=''>
                <div className='mb-8px fs-28px'>😆</div>
                <div className='d-flex gap-3px fs-18px'>
                  <div className='text-primary'>컬렉터</div>
                  <div className=''>가 되는 곳</div>
                </div>
              </div>
            </div>
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
