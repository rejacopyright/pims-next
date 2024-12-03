import { getOpenClass } from '@api/class'
import { useQuery } from '@tanstack/react-query'
import moment, { Moment } from 'moment'
import { useParams, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'

import ModalCreate from './ModalCreate'

export const Times: FC<any> = () => {
  const params = useParams()
  const classType: any = params?.class
  const searchParamsFn = useSearchParams()
  const searchParams = parse(searchParamsFn.toString() || '', { ignoreQueryPrefix: true })

  const { date = moment().format('YYYY-MM-DD') }: any = searchParams || {}

  const openHours = moment(date).set({ hours: 6, minutes: 0, seconds: 0 })
  const times = Array(32)
    .fill('')
    .map((_, index: number) => {
      return moment(openHours).add(30 * index, 'minutes')
    })

  const [selectedTime, setSelectedTime] = useState<Moment | undefined>()
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false)

  const dataClassQueryParams: any = {
    service_id: classType,
    date,
  }

  const dataOpenClassQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getOpenClass', { dataClassQueryParams }],
    queryFn: () => getOpenClass(classType, dataClassQueryParams),
    select: ({ data }: any) => {
      const res: any = (data || []).map((item) => {
        const newItem = item
        newItem.start_date = moment(item?.start_date).format('YYYY-MM-DD HH:mm')
        newItem.end_date = moment(item?.end_date).format('YYYY-MM-DD HH:mm')
        return newItem
      })
      return res
    },
  })
  const dataOpenClass: any = dataOpenClassQuery?.data || []
  console.log(dataOpenClass?.[0])

  return (
    <>
      <div className='bg-white p-15px radius-10 shadow-xs'>
        {/* PART 1 */}
        <div className='row'>
          {times?.map((item, index: number) => {
            const thisTime = item.set({ seconds: 0 })
            const isPastTime = moment(new Date()).isAfter(thisTime)

            const hasClass = dataOpenClass?.find(
              ({ start_date }) => start_date === thisTime.format('YYYY-MM-DD HH:mm')
            )

            return (
              <div key={index} className='col-6 col-sm-3 col-xl-2 my-7px'>
                <button
                  type='button'
                  disabled={isPastTime}
                  className='btn m-0 p-0 w-100'
                  onClick={() => {
                    setSelectedTime(thisTime)
                    setShowModalCreate(true)
                  }}>
                  <div
                    className={`text-center border ${hasClass && !isPastTime ? 'border-primary' : 'border-gray-300'} p-5px radius-10 mx-5px`}>
                    <div
                      className={`btn ${hasClass && !isPastTime ? 'btn-primary' : 'btn-light text-dark'} btn-flex flex-center w-100`}>
                      {item.format('HH:mm')}
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <ModalCreate
        show={showModalCreate}
        setShow={setShowModalCreate}
        selectedTime={selectedTime}
        queryKey={['getOpenClass', { dataClassQueryParams }]}
      />
    </>
  )
}
