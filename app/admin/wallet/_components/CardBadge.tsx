import { badgeImage } from '@api/badge'
import { DotFlash } from '@components/loader'
import Tooltip from '@components/tooltip'
import { blobToBase64, detectMobileScreen } from '@helpers'
import { useSize } from '@hooks'
import { setWalletDetail } from '@redux'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

const CardBadge: FC<{ detail: any; onDistributionChanged: () => void; achievement: any }> = ({
  detail,
  achievement,
}) => {
  const router = useRouter()
  const { jwt, name, issuer, imgFile, ACHIEVEMENT_TYPE_KR } = detail || {}

  const [isMobile, setIsMobile] = useState<boolean>(false)

  const badgeImageQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['badgeImage', imgFile],
    queryFn: async () => {
      const api: any = await badgeImage(imgFile)
      const responseData: any = api?.data
      const base64 = await blobToBase64(responseData)
      if (responseData) {
        return { base64, blob: responseData }
      } else {
        return undefined
      }
    },
  })

  const imageIsLoading: boolean = !badgeImageQuery?.isFetched

  // const badgeImageData: any = '/media/placeholder/badge.png'
  const badgeImageData: any = badgeImageQuery?.data?.base64 || '/media/placeholder/badge.png'

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  return (
    <div
      className='d-flex flex-column card-2 bg-white radius-15 cursor-default card-badge-xxx p-24px'
      onClick={async () => {
        await setWalletDetail({ img: badgeImageData, jwt, ...detail })
        router.push(`/wallet/detail/${detail?.USER_ID}?id=${jwt}`, {
          scroll: false,
          // state: { img: badgeImageData, imgBlob: badgeImageBlob, jwt, ...detail },
        })
      }}>
      <div className='text-center'>
        <div
          className='fw-bold fs-13px d-inline-block px-8px py-2px radius-5'
          style={{
            background: `#${achievement?.color_label || 'efeff1'}`,
            color: `#${achievement?.color_text || '000'}`,
          }}>
          {ACHIEVEMENT_TYPE_KR}
        </div>
      </div>
      <div
        className='radius-10 d-flex mx-auto my-20px position-relative'
        style={{
          background: imageIsLoading ? '#fff' : `url(${badgeImageData}) center / contain no-repeat`,
          height: `${isMobile ? '100px' : '150px'}`,
          width: `${isMobile ? '100px' : '150px'}`,
        }}>
        {imageIsLoading && (
          <div className='d-flex flex-center w-100' style={{ opacity: '0.75' }}>
            <Image src='/logo/logo-circle.png' alt='Open Badge' width={75} height={15} priority />
            <DotFlash animation='falling' style={{ transform: 'scale(0.5)', marginTop: '5px' }} />
          </div>
        )}
        {detail?.TXID === '0x3c96f038be04e06e69067dd8311c9737ff95983f642a995a8eb4740aec2d211c' && (
          <div className='position-absolute' style={{ bottom: '10px', right: '10px' }}>
            <Tooltip
              placement='bottom'
              active={true}
              tooltipClass='w-tooltip'
              title='발행 기관에서 폐기한 배지입니다.'>
              <div
                className='bg-danger radius-50 d-flex flex-center'
                style={{ width: '42px', height: '42px' }}>
                <i className='las la-info-circle text-white fs-28px' />
              </div>
            </Tooltip>
          </div>
        )}
      </div>
      <div
        className='fw-bolder text-center d-flex flex-center fs-16px mb-20px'
        style={{ height: '48px' }}>
        {name}
      </div>
      <div className='d-flex flex-center fs-14px gap-5px'>
        <div className='text-gray-500 fw-400 text-nowrap'>발행 기관</div>
        <div className='fw-500 align-self-end text-truncate-1'>{issuer?.name}</div>
      </div>
    </div>
  )
}

export default CardBadge
