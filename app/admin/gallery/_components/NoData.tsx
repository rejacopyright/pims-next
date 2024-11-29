import { usePathname, useRouter } from 'next/navigation'

interface Props {
  isAnyParams: boolean
}

export default function Index({ isAnyParams }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchKeyword: any = ''
  return (
    <div className='d-flex flex-center w-100' style={{ height: '60vh' }}>
      <div className='text-center'>
        <div
          className='w-150px h-150px mx-auto'
          style={{
            background: 'url(/media/placeholder/badge-gray.png) center / cover no-repeat',
          }}
        />
        {isAnyParams ? (
          <div className='mt-5'>
            {searchKeyword && (
              <div className='text-center fw-bold fs-18px mb-5px' style={{ color: '#919BA7' }}>
                "{searchKeyword}"으로
              </div>
            )}
            <div className='text-center fw-bold fs-18px' style={{ color: '#919BA7' }}>
              검색 결과를 찾을 수 없습니다.
            </div>
            <div
              className='d-inline-flex flex-center mt-24px bg-white radius-100 border border-gray-300 gap-4px px-16px py-6px cursor-pointer'
              style={{ height: '36px' }}
              onClick={() => router.replace(pathname, { scroll: false })}>
              <i className='las la-redo-alt fs-18px' />
              <div className='fs-14px text-gray-500'>검색 설정 되돌리기</div>
            </div>
          </div>
        ) : (
          <div className='text-center mt-5 fw-bold fs-18px' style={{ color: '#919BA7' }}>
            발행된 배지가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
