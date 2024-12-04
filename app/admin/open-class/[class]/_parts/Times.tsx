import { getOpenClass } from '@api/class'
import Tooltip from '@components/tooltip'
import { useQuery } from '@tanstack/react-query'
import moment, { Moment } from 'moment'
import { useParams, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useState } from 'react'

import ModalCreate from './ModalCreate'
import ModalDelete from './ModalDelete'
import ModalView from './ModalView'

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
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [tmpDetail, setTmpDetail] = useState<any>()

  const dataClassQueryParams: any = {
    service_id: classType,
    date,
  }

  const dataOpenClassQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getOpenClass', { dataClassQueryParams }],
    queryFn: () => getOpenClass(classType, dataClassQueryParams),
    select: ({ data }: any) => {
      const res: any = (data?.data || []).map((item) => {
        const newItem = item
        newItem.start_date = moment(item?.start_date).format('YYYY-MM-DD HH:mm')
        newItem.end_date = moment(item?.end_date).format('YYYY-MM-DD HH:mm')
        return newItem
      })
      return res
    },
  })
  const dataOpenClass: any = dataOpenClassQuery?.data || []
  console.log(dataOpenClass)

  return (
    <>
      <div className='bg-white p-15px radius-10 shadow-xs d-flex'>
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
                <button type='button' disabled={isPastTime} className='h-100 btn m-0 p-0 w-100'>
                  <div className={`h-100 mx-5px ${hasClass ? 'p-10px border radius-15' : ''}`}>
                    <div
                      className={`position-relative text-center border ${!hasClass ? 'h-100' : ''} ${hasClass && !isPastTime ? 'border-primary' : 'border-gray-300'} p-5px radius-10`}>
                      <div
                        className={`btn ${hasClass && !isPastTime ? 'btn-primary' : 'btn-light text-dark'} btn-flex flex-center w-100`}>
                        {item.format('HH:mm')}
                      </div>
                      {!hasClass && !isPastTime && (
                        <div
                          className='d-flex flex-center position-asolute w-100 top-0 bottom-0 py-10px'
                          style={{ height: 'calc(100% - 40px)' }}>
                          <div
                            className='btn btn-light-primary btn-flex flex-center w-40px h-40px radius-50 border border-primary border-dashed p-0 m-0'
                            onClick={() => {
                              setSelectedTime(thisTime)
                              setIsEdit(false)
                              setTmpDetail(undefined)
                              setShowModalCreate(true)
                            }}>
                            <div className='fas fa-plus' />
                          </div>
                        </div>
                      )}
                    </div>
                    {hasClass && (
                      <div className='h-100 pt-5px'>
                        <div className='fs-11px text-truncate-2'>{hasClass?.class?.name}</div>
                        {!isPastTime && (
                          <div className='d-flex flex-center gap-10px mt-10px'>
                            <Tooltip placement='top' title='Lihat kelas'>
                              <div
                                className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setTmpDetail(hasClass)
                                  setShowModalView(true)
                                }}>
                                <div className='fas fa-eye' />
                              </div>
                            </Tooltip>
                            <Tooltip placement='top' title='Edit kelas'>
                              <div
                                className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedTime(thisTime)
                                  setIsEdit(true)
                                  setTmpDetail(hasClass)
                                  setShowModalCreate(true)
                                }}>
                                <div className='fas fa-pen-alt' />
                              </div>
                            </Tooltip>
                            <Tooltip placement='auto' title='Hapus kelas'>
                              <div
                                className='btn btn-light-danger btn-flex flex-center p-0 w-30px h-30px radius-50'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setTmpDetail(hasClass)
                                  setShowModalDelete(true)
                                }}>
                                <div className='fas fa-trash-alt' />
                              </div>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <ModalCreate
        show={showModalCreate}
        setShow={(e) => {
          setShowModalCreate(e)
          if (!e) {
            setIsEdit(false)
            setTmpDetail(undefined)
          }
        }}
        selectedTime={selectedTime}
        isEdit={isEdit}
        detail={tmpDetail}
        queryKey={['getOpenClass', { dataClassQueryParams }]}
      />
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getOpenClass', { dataClassQueryParams }]}
      />
    </>
  )
}
