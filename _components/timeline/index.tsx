import { KTSVG } from '@helpers'
import { FC } from 'react'

const Index: FC<any> = ({ icon = undefined }) => {
  return (
    <div className='timeline-item'>
      <div className='timeline-line w-40px'></div>

      <div className='timeline-icon symbol symbol-circle symbol-40px me-4'>
        <div className='symbol-label bg-light'>
          {Boolean(icon) && (
            <KTSVG
              path='/media/icons/duotune/communication/com003.svg'
              className='svg-icon-2 svg-icon-gray-500'
            />
          )}
        </div>
      </div>

      <div className='timeline-content mb-10'>
        <div className='pe-3 mb-5'>
          <div className='fs-5 fw-bold'>
            There are 2 new tasks for you in “AirPlus Mobile APp” project:
          </div>
          <div className='d-flex align-items-center mt-1 fs-6'>
            <div className='text-muted me-2 fs-7'>Added at 4:23 PM by</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
