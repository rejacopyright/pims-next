'use client'
import { getBadges } from '@api/badge'
import { Sticky } from '@components/cards/Sticky'
import { valueKey } from '@components/filter/Category'
import { ProductLoader, TextLoader } from '@components/loader'
import { ToastMessage } from '@components/toast'
import { getJWTPayload, KTSVG } from '@helpers'
import { useDeepEffect, useLocation } from '@hooks'
import { CustomLogo, PageTitle } from '@metronic/layout/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { parse } from 'qs'
import { FC, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const CardBadge = dynamic(() => import('./_components/CardBadge'))
const NoData = dynamic(() => import('./_components/NoData'))
const Filters = dynamic(() => import('./_components/Filters'), {
  loading: () => (
    <div className='page-filter'>
      <div className='row my-3'>
        {Array(3)
          .fill('')
          .map((_, index: number) => (
            <div key={index} className='col'>
              <TextLoader count={1} />
            </div>
          ))}
      </div>
    </div>
  ),
})

const Index: FC<any> = () => {
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const queryClient = useQueryClient()
  const { params } = useLocation()

  const {
    startDate,
    endDate,
    sortBy = 'A',
    filterAchievement: encodedFilterAchievement = '',
  } = params || {}
  const { filterAchievement }: any = parse(atob(encodedFilterAchievement))

  const [, setFilterAchievement] = useState<any>([])
  const [reloadDataBadges, setReloadDataBadges] = useState<boolean>(false)

  const isAnyParams: boolean =
    (Array.isArray(filterAchievement) && filterAchievement?.length > 0) || startDate || endDate

  const getCachedCategory: any = queryClient.getQueryData([
    'getCategories',
    { user_id: user?.user_id },
  ])

  const dataBadgesQueryParams: any = {
    user_id: user?.user_id,
    achievement_type: filterAchievement?.length
      ? filterAchievement?.map((m: any) => m?.[valueKey])
      : undefined,
    // name: searchKey,
    reg_start_date: startDate,
    reg_end_date: endDate,
    sort: sortBy,
  }

  const dataBadgesQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getBadges', { ...dataBadgesQueryParams, reloadDataBadges }],
    queryFn: () => getBadges(dataBadgesQueryParams),
    select: ({ data }: any) => {
      let res: any = data?.message?.reason?.list || []
      res = res?.map((item: any) => {
        const { USER_ID: user_id, BADGE_FILE_NAME } = item || {}
        const badge_file_name: any = BADGE_FILE_NAME?.split('.')
          ?.slice(0, BADGE_FILE_NAME?.split('.')?.length - 1)
          ?.join('.')

        item.info = getJWTPayload(item.BADGE)
        const mappedResult: any = {
          ...(item?.info?.vc || {}),
          imgFile: { user_id, badge_file_name },
          jwt: item?.BADGE,
          ...item,
          USER_SUB_ID: item?.USER_SUB_ID,
          USER_BDG_ID: item?.USER_BDG_ID,
          expiration_date: item?.EXPIRATION_DATE,
        }
        return mappedResult
      })
      return res
    },
  })

  const dataBadges: any = dataBadgesQuery?.data || []
  const pageIsLoading: any = !dataBadgesQuery?.isFetched

  useDeepEffect(() => {
    if (dataBadgesQuery?.isError) {
      ToastMessage({
        type: 'error',
        message: dataBadgesQuery?.error?.response?.data?.message?.reason,
      })
    }
  }, [dataBadgesQuery?.error?.response?.data?.message?.reason, dataBadgesQuery?.isError])

  const _resetFilter: any = () => {
    setFilterAchievement([])
  }

  return (
    <>
      <PageTitle description='Blank'>나의 지갑</PageTitle>
      <CustomLogo>
        <div className='d-flex align-items-center gap-8px'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '30px', height: '30px', border: '1px solid #F7AE86' }}>
            <KTSVG path='/media/icons/custom/wallet.svg' svgClassName='w-18px h-18px' />
          </div>
          <div className='fs-18px fw-700 lh-1 ls-n1'>나의 지갑</div>
        </div>
      </CustomLogo>
      {/* Section One */}
      <div className='mt-50px d-none d-lg-block'>
        <div className='d-flex align-items-center gap-8px'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '36px', height: '36px', border: '1px solid #F7AE86' }}>
            <KTSVG path='/media/icons/custom/wallet.svg' svgClassName='w-18px h-18px' />
          </div>
          <div className='fs-22px fw-700 lh-1 ls-n1'>나의 지갑</div>
        </div>
        <div className='fs-16px fw-400 mt-8px'>내가 발급 받은 배지를 확인할 수 있습니다.</div>
      </div>
      <Sticky className='pb-8px mb-16px bg-body mx-n5 px-5 mt-5 mt-lg-0'>
        <Filters searchParams={params} />
      </Sticky>
      <div
        className='d-flex align-items-center fw-bolder gap-8px'
        style={{ marginBottom: '-10px', height: '36px' }}>
        <div className='text-dark fs-18px'>보유 배지</div>
        <div className='text-primary fs-22px mb-2px fw-700'>{dataBadges?.length}</div>
      </div>
      {pageIsLoading ? (
        <ProductLoader count={6} containerClass='row' itemClass='col-6 col-lg-3 mb-5' />
      ) : !dataBadges?.length ? (
        <NoData isAnyParams={isAnyParams} />
      ) : (
        <div className='row my-24px card-badge-row-xxx'>
          {dataBadges?.map((m: any, index: number) => {
            const achievementDetail: any = getCachedCategory?.data?.message?.reason?.find(
              (f: any) => f?.[valueKey] === m?.ACHIEVEMENT_TYPE
            )

            return (
              <div
                // className='col-12 col-md-4 col-lg-3 col-xl-3 mb-5 mb-xl-5 col-xxl-auto mb-xxl-0 px-0'
                className='col-10 offset-1 col-sm-6 offset-sm-3 offset-lg-0 col-lg-4 col-xl-3 mb-5 px-3'
                key={index}>
                <CardBadge
                  detail={m}
                  achievement={achievementDetail}
                  onDistributionChanged={() => setReloadDataBadges((prev: any) => !prev)}
                />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Index
