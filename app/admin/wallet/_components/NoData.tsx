import { usePathname, useRouter } from 'next/navigation'

interface Props {
  isAnyParams: boolean
}

export default function Index({ isAnyParams }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className='d-flex flex-center w-100' style={{ height: '60vh' }}>
      <div className='text-center'>
        <div
          className='w-150px h-150px mx-auto'
          style={{
            background: 'url(/media/placeholder/badge-gray.png) center / cover no-repeat',
          }}
        />
        <div className='text-center mt-24px fw-600 fs-18px' style={{ color: '#919BA7' }}>
          보유한 배지가 없습니다.
        </div>
        {isAnyParams && (
          <div
            className='d-inline-flex flex-center mt-24px bg-white radius-100 border border-gray-300 gap-4px px-16px py-6px cursor-pointer'
            style={{ height: '36px' }}
            onClick={() => router.replace(pathname, { scroll: false })}>
            <i className='las la-redo-alt fs-18px mb-1px' />
            <div className='fs-14px fw-400 text-gray-500'>검색 설정 되돌리기</div>
          </div>
        )}
      </div>
    </div>
  )
}
