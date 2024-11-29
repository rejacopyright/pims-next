'use client'
import { Sticky } from '@components/cards/Sticky'
import { FilterCategory } from '@components/filter/Category'
import { Searchbox } from '@components/form/InputSearch'
import { configClass, KTSVG } from '@helpers'
import { useSearchParamsObject } from '@hooks'
import { CustomLogo } from '@metronic/layout/core'
import clsx from 'clsx'
import last from 'lodash/last'
import omit from 'lodash/omit'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const Index: FC<any> = ({ children }) => {
  const searchParams: any = useSearchParamsObject()

  const router = useRouter()
  const pathname = usePathname()
  const { totalItems }: any = useSelector(({ gallery }: any) => gallery, shallowEqual)

  const [lastPath, setLastPath] = useState<any>('')

  const { filterAchievement: encodedFilterAchievement = '', q: searchKeyword } = searchParams || {}
  const { filterAchievement } = parse(atob(encodedFilterAchievement))

  const addOrEditParams = (key: string, value: any) => {
    const resParams = stringify({ ...searchParams, [key]: value }, { encode: false })
    router.replace(`${pathname}?${resParams}`, { scroll: false })
  }

  const omitParams = (key: string) => {
    const omittedParams: any = omit(searchParams, key)
    const resParams = stringify(omittedParams, { encode: false })
    router.replace(`${pathname}?${resParams}`, { scroll: false })
  }

  useEffect(() => {
    const arrayPath: any = pathname?.split('/') || []
    setLastPath(last(arrayPath))
  }, [pathname])

  return (
    <>
      <CustomLogo>
        <div className='d-flex align-items-center gap-8px'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '30px', height: '30px', border: '1px solid #F7AE86' }}>
            <KTSVG path='/media/icons/custom/card-badge.svg' svgClassName='w-18px h-18px' />
          </div>
          <div className='fs-18px fw-700 lh-1 ls-n1'>배지 갤러리</div>
        </div>
      </CustomLogo>
      <div className='mt-50px d-none d-lg-block'>
        <div className='d-flex align-items-center gap-8px'>
          <div
            className='d-flex flex-center bg-light-orange radius-5'
            style={{ width: '36px', height: '36px', border: '1px solid #F7AE86' }}>
            <KTSVG path='/media/icons/custom/card-badge.svg' svgClassName='w-20px h-20px' />
          </div>
          <div className='fs-22px fw-bolder lh-1 ls-n1'>배지 갤러리</div>
        </div>
        <div className='fs-16px mt-8px ls-n1'>
          발행 기관과 발행된 모든 뱃지들을 한 눈에 볼 수있습니다.
        </div>
      </div>
      <Sticky className='pb-8px pt-16px mt-16px mb-16px bg-body mx-n5 px-5'>
        <div className='d-flex'>
          <Link
            href='/gallery'
            scroll={false}
            className={clsx('btn h-44px px-24px', {
              'btn-primary': lastPath === 'gallery',
            })}
            style={{ borderRadius: '6px 6px 0px 0px' }}>
            발행된 모든 배지
          </Link>
          <Link
            href='/gallery/issuer'
            scroll={false}
            className={clsx('btn h-44px px-24px', {
              'btn-primary': lastPath === 'issuer',
            })}
            style={{ borderRadius: '6px 6px 0px 0px' }}>
            발행 기관
          </Link>
        </div>
        <div className='d-flex align-items-center fw-bolder my-16px gap-8px'>
          <div className='fs-18px'>발행된 배지</div>
          <div className='fs-22px text-primary'>{totalItems}</div>
          <div className='fs-18px'>개</div>
        </div>
        <div className='d-flex flex-wrap gap-16px'>
          <div className=''>
            <div className='fs-14px fw-bold mb-8px'>배지 구분</div>
            <FilterCategory
              filterCategory={filterAchievement}
              onFilterCategory={(e: any) => {
                const stringifiedParams: any = btoa(
                  stringify({ filterAchievement: e }, { encode: true })
                )

                stringifiedParams
                  ? addOrEditParams('filterAchievement', stringifiedParams)
                  : omitParams('filterAchievement')
              }}
            />
          </div>
          <div className='d-flex align-items-end w-350px gap-16px'>
            <div className='col'>
              <Searchbox
                controlled
                placeholder='발행 기관 이름으로 검색하세요.'
                className='radius-5'
                delay={1000}
                defaultValue={searchKeyword}
                onChange={(e: any) => (e ? addOrEditParams('q', e) : omitParams('q'))}
              />
            </div>
            <div className='col-auto'>
              <div
                className={configClass?.filterButton}
                onClick={() => router.replace(pathname, { scroll: false })}>
                <i className='las la-redo-alt fs-16px text-dark' />
                <div className='fw-bolder lh-1 text-nowrap'>초기화</div>
              </div>
            </div>
          </div>
        </div>
      </Sticky>
      {children}
    </>
  )
}

export default Index
