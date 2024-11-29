import { getCategories } from '@api/badge'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC, useEffect, useMemo, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export const valueKey = 'achievement_type'
export const labelKey = 'achievement_type_kr'

export const FilterCategory: FC<any> = ({ filterCategory, onFilterCategory = () => '' }) => {
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)

  const [menuCardIsShown, setMenuCardIsShown] = useState<boolean>(false)
  const [checkedItem, setCheckedItem] = useState<any>([])

  const badgesCategoriesQuery: any = useQuery({
    initialData: { data: [] },
    queryKey: ['getCategories', { user_id: user?.user_id }],
    queryFn: () => getCategories({ user_id: user?.user_id }),
    select: ({ data }: any) => {
      const res: any = data?.message?.reason || []
      // setCheckedItem(res)
      return res
    },
  })

  const badgesCategories: any = badgesCategoriesQuery?.data || []
  const pageIsLoading: any = !badgesCategoriesQuery?.isFetched

  const allIsChecked: any = useMemo(() => {
    return checkedItem?.length >= badgesCategories?.length
  }, [badgesCategories?.length, checkedItem?.length])

  useEffect(() => {
    if (badgesCategoriesQuery?.isFetchedAfterMount) {
      setCheckedItem(badgesCategories)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgesCategoriesQuery?.isFetchedAfterMount])

  useEffect(() => {
    if ((Array.isArray(filterCategory) && filterCategory?.length === 0) || !filterCategory) {
      setCheckedItem(badgesCategories)
    } else if (Array.isArray(filterCategory)) {
      setTimeout(() => {
        setCheckedItem(filterCategory)
      }, 150)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory])

  return (
    <div className='position-relative'>
      {menuCardIsShown && (
        <div
          className='modal-backdrop show opacity-0'
          style={{ zIndex: '1' }}
          onClick={() => setMenuCardIsShown(false)}
        />
      )}
      <div
        className='d-flex align-items-center justify-content-between gap-5 w-category-filter h-40px radius-5 border border-gray-300 p-9px bg-white shadow-xs cursor-pointer'
        onClick={() => setMenuCardIsShown((prev: boolean) => !prev)}>
        {allIsChecked || !checkedItem?.length ? (
          <div
            className='bg-gray-100 text-dark py-2px px-8px fw-400 d-flex align-items-center radius-5 lh-20px'
            style={{ height: '22px' }}>
            <div className=''>전체</div>
            {/* <i className='fas fa-times text-orange ms-7px lh-5px' /> */}
          </div>
        ) : (
          <div
            className='bg-light-primary text-primary py-2px px-8px fw-500 d-flex align-items-center radius-5 lh-20px'
            style={{ height: '22px' }}>
            <div className='text-truncate' style={{ maxWidth: '90px' }}>
              {checkedItem?.[0]?.[labelKey] || '전체'}
            </div>
            {Boolean(checkedItem?.length - 1) && (
              <div className='ms-2px'>+{checkedItem?.length - 1}</div>
            )}
            <i
              className='fas fa-times text-orange ms-7px lh-5px'
              style={{ cursor: 'default' }}
              onClick={() => setCheckedItem(badgesCategories)}
            />
          </div>
        )}
        <i className='las la-filter fs-20px text-primary' style={{ transform: 'scaleX(-1)' }} />
      </div>
      <div className='position-absolute mt-4px'>
        <div
          className={clsx('bg-white shadow-sm radius-5 menu-sub-dropdown menu position-relative', {
            show: menuCardIsShown,
          })}
          style={{ width: '294px', border: '1px solid #dae0e6' }}>
          <div className='w-100'>
            <div className='py-3' style={{ height: '338px', overflowY: 'auto' }}>
              {pageIsLoading ? (
                <div className='d-flex flex-center h-100'>
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    <span className='spinner-border spinner-border-sm align-middle w-25px h-25px text-gray-400' />
                  </span>
                </div>
              ) : (
                <div className=''>
                  <label
                    className='d-flex align-items-center h-40px px-16px'
                    onMouseEnter={(e: any) => e?.target?.classList?.add('bg-gray-100')}
                    onMouseLeave={(e: any) => e?.target?.classList?.remove('bg-gray-100')}>
                    <div className='form-check'>
                      <input
                        className='form-check-input me-0'
                        name='name'
                        autoComplete='all'
                        type='checkbox'
                        checked={allIsChecked}
                        onChange={(e: any) => {
                          const isChecked: boolean = e?.target?.checked
                          setCheckedItem(isChecked ? badgesCategories : [])
                        }}
                      />
                      <div className='fw-400 fs-14px ms-6px lh-20px text-dark'>전체</div>
                    </div>
                  </label>
                  {badgesCategories?.map((item: any, index: number) => {
                    return (
                      <label
                        key={index}
                        className='d-flex align-items-center h-40px px-16px'
                        onMouseEnter={(e: any) => e?.target?.classList?.add('bg-gray-100')}
                        onMouseLeave={(e: any) => e?.target?.classList?.remove('bg-gray-100')}>
                        <div className='form-check'>
                          <input
                            className='form-check-input me-0'
                            name='name'
                            autoComplete={item?.[valueKey]}
                            type='checkbox'
                            checked={Boolean(
                              checkedItem?.find((f: any) => f?.[valueKey] === item?.[valueKey])?.[
                                valueKey
                              ]
                            )}
                            onChange={(e: any) => {
                              const isChecked: boolean = e?.target?.checked
                              const includedItem: any = [...checkedItem, item]
                              const excludedItem: any = checkedItem?.filter(
                                (f: any) => f?.[valueKey] !== item?.[valueKey]
                              )
                              setCheckedItem(isChecked ? includedItem : excludedItem)
                            }}
                          />
                          <div
                            className='fw-500 fs-13px ms-6px lh-18px py-2px px-8px radius-5'
                            style={{
                              background: `#${item?.color_label}`,
                              color: `#${item?.color_text}`,
                            }}>
                            {item?.[labelKey]}
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
            <div className='p-8px' style={{ height: '54px' }}>
              <div className='row m-0 gap-8px'>
                <div className='col p-0' onClick={() => setMenuCardIsShown(false)}>
                  <div
                    className='btn btn-flex flex-center p-0 w-100 border border-gray-300 fs-14px fw-600'
                    style={{ height: '36px' }}>
                    닫기
                  </div>
                </div>
                <div className='col p-0'>
                  <div
                    className='btn btn-flex flex-center p-0 btn-primary w-100 fs-14px fw-600'
                    style={{ height: '36px' }}
                    onClick={() => {
                      onFilterCategory(checkedItem)
                      setMenuCardIsShown(false)
                    }}>
                    적용
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
