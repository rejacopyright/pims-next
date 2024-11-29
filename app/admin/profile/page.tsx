'use client'
import { getBadgeStats } from '@api/profile'
import { Sticky } from '@components/cards/Sticky'
import { CircleLoader, TextLoader } from '@components/loader'
import { APP_HOME_PATH, KTSVG } from '@helpers'
import { CustomLogo, PageTitle } from '@metronic/layout/core'
import { logout, setTmpEmail } from '@redux'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useMemo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const Index: FC<any> = () => {
  const navigate: any = useRouter()
  const pathname: any = usePathname()
  const isProfilePage: any = ['/profile'].includes(pathname)

  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const mails: any = useSelector(({ user: { data } }: any) => data?.mails || [], shallowEqual)

  const primaryMails = mails?.filter(({ user_eml_rprs }: any) => user_eml_rprs === 'Y')
  const secondaryMails = mails?.filter(({ user_eml_rprs }: any) => user_eml_rprs === 'N')

  // GET BADGE STATS
  const badgeStatsQuery = useQuery({
    // initialData: {data: []},
    enabled: !!user,
    queryKey: ['badgeStatsQuery', { user_id: user?.user_id }],
    queryFn: () => getBadgeStats(user?.user_id),
    select: ({ data }: any) => data?.message?.reason,
  })

  const badgeStats: any = badgeStatsQuery?.data || {}
  const { bdg_tnocs: badgesCount, sbmsn_tnocs: submittedBadges } = badgeStats
  const stateIsLoading: any = !badgeStatsQuery?.isFetched

  const cardsData: any = useMemo(
    () => [
      {
        label: '보유 배지',
        value: badgesCount,
        path: APP_HOME_PATH,
        iconPath: '/media/icons/custom/wallet.svg',
      },
      {
        label: '제출한 배지',
        value: submittedBadges,
        path: undefined,
        iconPath: '/media/icons/custom/wallet.svg',
      },
      {
        label: '발행한 배지',
        value: 0,
        path: undefined,
        iconPath: '/media/icons/custom/wallet.svg',
      },
    ],
    [badgesCount, submittedBadges]
  )

  return (
    <>
      <PageTitle description=''>마이페이지</PageTitle>
      {isProfilePage && (
        <CustomLogo>
          <div className='d-flex align-items-center gap-8px'>
            <div
              className='d-flex flex-center bg-light-orange radius-5'
              style={{ width: '30px', height: '30px', border: '1px solid #F7AE86' }}>
              <KTSVG path='/media/icons/custom/contact.svg' svgClassName='w-18px h-18px' />
            </div>
            <div className='fs-18px fw-700 lh-1 ls-n1'>마이페이지</div>
          </div>
        </CustomLogo>
      )}
      <div className='d-block d-lg-none mb-20px' />
      <Sticky className='d-none d-lg-flex align-items-center justify-content-between sticky-top-style py-24px bg-body'>
        <div
          onClick={() => navigate.back()}
          className='d-flex align-items-center gap-8px text-dark cursor-pointer'>
          <i className='fas fa-arrow-left text-dark fs-22px mb-3px' />
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '36px', height: '36px', border: '1px solid #f7ae86' }}>
            <i className='las la-address-book text-orange fs-25px' />
          </div>
          <div className='fs-22px fw-bolder'>마이페이지</div>
        </div>
      </Sticky>
      {stateIsLoading ? (
        <div className='row'>
          <div className='col-12 col-lg-auto mb-5'>
            <div className='d-flex flex-center w-200px h-200px border radius-25 mb-5'>
              <CircleLoader size={125} />
            </div>
            <TextLoader count={2} className='mb-4' />
          </div>
          <div className='col-12 col-lg mt-1'>
            {Array(2)
              .fill('')
              .map((_m, index: number) => (
                <div className='mb-20' key={index}>
                  <TextLoader count={2} height={35} className='mb-5' />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className='row mb-24px'>
            {cardsData?.map(({ label, value, path, iconPath }: any, index: number) => (
              <div className='col-6 col-sm-4 col-lg-3 col-xxl-2 mb-5 mb-lg-0' key={index}>
                <div
                  onClick={() => path && navigate.push(path)}
                  className={`d-flex flex-center border border-gray-300 radius-15 bg-white ${path ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{ height: '154px' }}>
                  <div className=''>
                    <div
                      className='d-flex flex-center bg-light-orange radius-5 mx-auto'
                      style={{ width: '36px', height: '36px', border: '1px solid #f7ae86' }}>
                      <KTSVG path={iconPath} svgClassName='w-18px h-18px' />
                    </div>
                    <div className='fw-bolder my-9px'>{label}</div>
                    <div
                      className='d-flex flex-center fs-24px text-orange fw-bolder'
                      style={{ height: '32px' }}>
                      {value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Email & Password Card */}
          <div className='row mb-24px'>
            <div className='col-12 fw-bolder fs-18px mb-16px'>회원 정보</div>
            <div className='col-12'>
              <div className='d-flex flex-wrap align-items-center gap-26px'>
                <div className='d-flex align-items-center gap-12px'>
                  <div
                    className='d-flex flex-center bg-primary radius-50'
                    style={{ width: '32px', height: '32px' }}>
                    <i className='las la-user text-white fs-20px' />
                  </div>
                  <div className='fs-14px fw-bold text-dark'>{primaryMails?.[0]?.user_eml}</div>
                </div>
                <div className='d-flex align-items-center gap-8px'>
                  <div
                    onClick={() => navigate.push('/profile/password/change', { scroll: false })}
                    className='btn btn-flex btn-white border border-gray-300 text-dark fw-bolder flex-center px-12px text-nowrap'
                    style={{ height: '36px' }}>
                    비밀번호 변경
                  </div>
                  <div
                    onClick={() =>
                      navigate.replace('/profile/change-default-email', { scroll: false })
                    }
                    className='btn btn-flex btn-white border border-gray-300 text-dark fw-bolder flex-center px-12px text-nowrap'
                    style={{ height: '36px' }}>
                    대표 이메일 변경
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Representative Email */}
          <div className='row mb-24px'>
            <div className='col-12 mb-16px'>
              <div className='d-flex align-items-center gap-8px'>
                <div className='fw-bolder fs-18px'>등록된 이메일</div>
                <div className='fw-bolder fs-22px text-primary'>{secondaryMails?.length}</div>
              </div>
            </div>
            {secondaryMails?.map((item: any, index: number) => (
              <div key={index} className='col-12'>
                <div className='d-flex align-items-center py-12px px-8px gap-10px border-bottom border-gray-300'>
                  <div className='fs-14px fw-bold'>{item?.user_eml}</div>
                  <div
                    className='btn btn-flex flex-center w-20px h-20px p-0'
                    onClick={() => {
                      setTmpEmail(item)
                      navigate.replace('/profile/delete-email', { scroll: false })
                    }}>
                    <i className='las la-times p-0 fs-20px text-dark mt-2px' />
                  </div>
                </div>
              </div>
            ))}
            <div className='col-12'>
              <div className='d-flex align-items-center py-12px px-8px gap-10px border-bottom border-gray-300'>
                <div
                  className='btn btn-flex flex-center h-20px p-0 gap-6px'
                  onClick={() => navigate.replace('/profile/add-email', { scroll: false })}>
                  <i className='fas fa-plus p-0 fs-14px text-primary' />
                  <div className='fs-14px fw-bolder text-primary'>이메일 추가하기</div>
                </div>
              </div>
            </div>
          </div>
          {/* Logout Action */}
          <div className='row'>
            <div className='col-12'>
              <div
                onClick={logout}
                className='btn btn-flex btn-white border border-gray-300 text-dark fw-bolder flex-center px-12px'
                style={{ height: '36px' }}>
                로그아웃
              </div>
            </div>
          </div>
        </>
      )}
      {/* 
      <ModalEditProfile
        user={user}
        isModalShow={showModalProfile}
        setModalProfile={setModalProfile}
      /> */}
    </>
  )
}

export default Index
