'use client'
import { badgeImage } from '@api/badge'
import { blobToBase64, downloadBlobFile, KTSVG } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { FC, useRef, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

interface Props {
  publicImg?: string
  isPublic: boolean
}

const Index: FC<Props> = ({ publicImg = '/media/placeholder/badge.png', isPublic }) => {
  const rectangleRef: any = useRef()
  const [downloadBtnIsLoading, setDownloadBtnIsLoading] = useState<boolean>(false)

  const walletDetail: any = useSelector(({ wallet }: any) => wallet?.detail, shallowEqual)
  const imgFile: any = walletDetail?.imgFile

  const badgeImageQuery: any = useQuery({
    // initialData: {data: []},
    enabled: !isPublic,
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
  const badgeImageData: any = badgeImageQuery?.data || {}
  const imgBlob: any = badgeImageData?.blob || undefined
  const imgUrl: any = !isPublic ? badgeImageData?.base64 : publicImg

  const downloadImage = async () => {
    if (imgBlob) {
      setDownloadBtnIsLoading(true)
      const fileName: any = `${walletDetail?.NAME?.toString().replace(' ', '-')}_${moment().format('YMMDDx')}`
      await downloadBlobFile({ blob: imgBlob, fileName })
      setDownloadBtnIsLoading(false)
    }
  }

  return (
    <div className='badge-img-detail mb-lg-7 mb-10 align-items-center d-flex'>
      <div
        className='h-100 w-100 position-relative m-auto radius-15'
        onMouseEnter={() => {
          const classes: any = rectangleRef?.current?.classList
          classes?.remove('opacity-0')
          classes?.add('opacity-100')
        }}
        onMouseLeave={() => {
          const classes: any = rectangleRef?.current?.classList
          classes?.remove('opacity-100')
          classes?.add('opacity-0')
        }}
        style={{
          background: `url(${imgUrl}) center / contain no-repeat`,
        }}>
        <div
          ref={rectangleRef}
          className={`${!isPublic && imgBlob ? 'd-flex' : 'd-none'} opacity-0 flex-center h-100 w-100 radius-15`}
          style={{ background: 'rgba(0,0,0,0.25)', transition: 'all 250ms' }}>
          <button
            type='button'
            disabled={downloadBtnIsLoading}
            onClick={downloadImage}
            className='btn btn-white opacity-100 btn-flex flex-center border radius-5 p-0'
            style={{ width: '36px', height: '36px' }}>
            {downloadBtnIsLoading ? (
              <span className='indicator-progress d-block'>
                <span className='spinner-border spinner-border-sm align-middle text-gray-400 w-20px h-20px mb-3px' />
              </span>
            ) : (
              <KTSVG
                path='/media/icons/custom/download.svg'
                width={15}
                height={15}
                className='m-0 mb-3px'
              />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Index
