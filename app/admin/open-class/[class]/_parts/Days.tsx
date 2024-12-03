import { Sticky } from '@components/cards/Sticky'
import omit from 'lodash/omit'
import moment from 'moment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC } from 'react'
import Slider from 'react-slick'

const settings = {
  dots: false,
  infinite: false,
  speed: 0,
  slidesToShow: 12,
  slidesToScroll: 1,
  arrows: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 12,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 10,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

export const Days: FC<any> = () => {
  const router = useRouter()
  const pathname: any = usePathname()
  const searchParamsFn = useSearchParams()
  const searchParams = parse(searchParamsFn.toString() || '', { ignoreQueryPrefix: true })

  const { date = moment().format('YYYY-MM-DD') }: any = searchParams || {}

  // Functions

  const addOrEditParams = (key: string, value: any) => {
    if (searchParams?.page) {
      searchParams.page = '1'
    }
    const resParams = stringify({ ...searchParams, [key]: value }, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }

  const _omitParams = (key: string) => {
    if (searchParams?.page) {
      searchParams.page = '1'
    }
    const omittedParams: any = omit(searchParams, key)
    const resParams = stringify(omittedParams, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }
  const days = Array(30)
    .fill('')
    .map((_, index: number) => {
      return moment().add(index, 'days')
    })
  return (
    <Sticky className='pb-8px mb-5px bg-body mx-n5 px-5 mt-5 mt-lg-0'>
      <div className='page-filter pt-14px'>
        <div className='bg-white p-18px radius-10 shadow-xs'>
          {/* PART 1 */}
          <Slider {...settings}>
            {days?.map((item, index: number) => {
              const thisDate = item.format('YYYY-MM-DD')
              const isActive = date === thisDate
              return (
                <div
                  key={index}
                  className='cursor-pointer'
                  onClick={() => addOrEditParams('date', thisDate)}>
                  <div
                    className={`text-center border ${isActive ? 'border-primary' : ''} p-5px radius-10 mx-5px`}>
                    <div
                      className={`btn ${isActive ? 'btn-primary' : 'btn-light text-dark'} btn-flex flex-center w-100 h-50px`}>
                      {item.format('DD')}
                    </div>
                    <div className={`fw-bold fs-11px mt-3px ${isActive ? 'text-primary' : ''}`}>
                      {item.format('MMM')}
                    </div>
                    <div className={`fw-bold fs-11px ${isActive ? 'text-primary' : ''}`}>
                      {item.format('YYYY')}
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </Sticky>
  )
}
