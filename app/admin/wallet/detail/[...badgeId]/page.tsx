import { Sticky } from '@components/cards/Sticky'
import { APP_HOME_PATH, KTSVG } from '@helpers'
import { CustomLogo, PageTitle } from '@metronic/layout/core'
import Link from 'next/link'
import { FC } from 'react'

import { getDataBadgeQuery, preload } from '../_libs/getDataBadge'
import ExtraCards from '../_section/ExtraCards'
import InfoCard from '../_section/InfoCard'

export async function generateMetadata({ params, searchParams }) {
  const getData: any = await getDataBadgeQuery(params, searchParams?.id)
  const { achievement }: any = getData || {}
  return {
    title: achievement?.name,
    description: achievement?.description,
  }
}

const Index: FC<any> = async ({ params, searchParams }) => {
  const { id } = searchParams || {}

  preload()

  const getData = await getDataBadgeQuery(params, id)
  const { USER_ID, isPublic, badgePublicImage, detail } = getData || {}

  if (!USER_ID && !isPublic) {
    return (
      <div className='d-flex flex-center' style={{ height: '75vh' }}>
        <div className='text-center'>
          <div
            className='w-150px h-150px mx-auto'
            style={{
              background: 'url(/media/placeholder/badge-gray.png) center / cover no-repeat',
            }}
          />
          <div className='text-center my-24px fw-600 fs-18px' style={{ color: '#919BA7' }}>
            이미 삭제된 배지이거나, 존재하지 않는 배지입니다.
          </div>
          <Link
            href={APP_HOME_PATH}
            className='btn btn-primary btn-flex flex-center h-46px fs-15px'
            style={{ width: '172px' }}>
            홈으로
          </Link>
        </div>
      </div>
    )
  }
  return (
    <>
      {!isPublic && (
        <>
          <PageTitle>{getData?.achievement?.name}</PageTitle>
          <CustomLogo>
            <Link href={APP_HOME_PATH} className='d-flex align-items-center gap-8px text-dark'>
              <div
                className='d-flex flex-center bg-light-orange radius-5'
                style={{ width: '30px', height: '30px', border: '1px solid #F7AE86' }}>
                <i className='fas fa-arrow-left text-orange' />
              </div>
              <div className='fs-18px fw-700 lh-1 ls-n1'>나의 배지 상세</div>
            </Link>
          </CustomLogo>
          <div className='d-block d-lg-none mb-20px' />
          <Sticky className='d-none d-lg-flex align-items-center justify-content-between mt-34px py-16px bg-body'>
            <Link href={APP_HOME_PATH} className='d-flex align-items-center gap-12px text-dark'>
              <i className='fas fa-arrow-left text-dark fs-22px mb-2px' />
              <div className='fs-22px fw-700 text-dark'>배지 상세</div>
            </Link>
            <div className='d-flex align-items-center gap-8px text-dark'>
              <KTSVG path='/media/icons/custom/home.svg' width={16} height={16} />
              <i className='las la-angle-right text-dark fs-16px text-gray-300' />
              <Link href={APP_HOME_PATH} className='fs-14px fw-500 text-gray-800'>
                나의 지갑
              </Link>
              <i className='las la-angle-right text-dark fs-16px text-gray-300' />
              <div className='fs-14px fw-500 text-primary'>배지 상세</div>
            </div>
          </Sticky>
        </>
      )}
      <InfoCard
        detailBadge={detail}
        badgePublicImage={badgePublicImage}
        isPublic={isPublic}
        shareIsLoading={false}
      />
      <ExtraCards detailBadge={detail} />
      {/* <div className='d-none xxx justify-content-end gap-2 py-50px'>
            <div
              className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3 gap-lg-0 btn btn-sm btn-light-danger border border-danger'
              onClick={() => setShowModalDelete(true)}>
              <i className='las la-trash fs-1 mt-2 mt-lg-0' />
              <span className='fs-5'>Delete</span>
            </div>
          </div>
          <ModalDelete
            show={showModalDelete}
            setShow={setShowModalDelete}
            detail={{ name: detailBadge?.name }}
          /> */}
    </>
  )
}

export default Index
