'use client'
import { listBadges as dummyBadges } from '@api/__MOCK/badge'
import { getBusinessBadgeLogo, getGalleryBadges } from '@api/gallery'
import { ProductLoader } from '@components/loader'
import { ToastMessage } from '@components/toast'
import { APP_MODE, blobToBase64 } from '@helpers'
import { useDeepEffect } from '@hooks'
import { PageTitle } from '@metronic/layout/core'
import { setGalleryTotalItems } from '@redux'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import NoData from './_components/NoData'

const CardBadge = dynamic(() => import('./_components/CardBadge'))

const Index: FC<any> = () => {
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  // const isAnyParams: boolean = dataCategory?.length > 0 || Boolean(searchKeyword)
  const isAnyParams: boolean = true

  const params: any = {
    user_id: user?.user_id,
    // name: searchKeyword,
    // achievement_type:
    //   dataCategory?.length > 0 ? dataCategory?.map(({ value }: any) => value) : undefined,
  }

  const dataBadgesQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getGalleryBadge', params],
    queryFn: async () => {
      const res: any = await getGalleryBadges(params)
      const data: any = res?.data?.message?.reason?.list?.slice(0, 3) || []

      setGalleryTotalItems(data?.length)
      const GalleryBadgeData = await Promise.all(
        data?.map(async (item: any) => {
          try {
            const imageRes = await getBusinessBadgeLogo({
              user_id: user?.user_id,
              img_file_name: item?.IMG_FILE_NAME,
            })

            const image = await blobToBase64(imageRes.data)
            return { img: image, ...item }
          } catch {
            return { img: undefined, ...item }
          }
        })
      )
      return GalleryBadgeData
    },
  })

  const dataBadges: any = APP_MODE !== 'test' ? dataBadgesQuery?.data || [] : dummyBadges
  const pageIsLoading: any = !dataBadgesQuery?.isFetched

  useDeepEffect(() => {
    if (dataBadgesQuery?.isError) {
      ToastMessage({
        type: 'error',
        message: dataBadgesQuery?.error?.response?.data?.message?.reason,
      })
    }
  }, [dataBadgesQuery?.error?.response?.data?.message?.reason, dataBadgesQuery?.isError])

  return (
    <>
      <PageTitle description='Blank'>나의 지갑 | 발행된 모든 배지</PageTitle>
      {pageIsLoading ? (
        <ProductLoader count={6} containerClass='row' itemClass='col-6 col-lg-3 mb-5' />
      ) : !dataBadges?.length ? (
        <NoData isAnyParams={isAnyParams} />
      ) : (
        <div className='row'>
          {dataBadges?.map((m: any, index: number) => (
            <div
              className='col-12 col-lg-4 col-xl-3 mb-5 px-3'
              style={{ paddingLeft: 70, paddingRight: 70 }}
              key={index}>
              <CardBadge detail={m} />
            </div>
          ))}
        </div>
      )}
      {/* <ModalBadgeDetail
        show={showModalBadgeDetail}
        setShow={setShowModalBadgeDetail}
        detail={tmpDetail}
        user={user}
      /> */}
    </>
  )
}

export default Index
