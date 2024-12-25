'use client'
import { getUserMember } from '@api/users'
import Table from '@components/table'
import Tooltip from '@components/tooltip'
import { isDev } from '@helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useRef, useState } from 'react'
import * as xlsx from 'xlsx'

import { Filter } from './_parts/Filter'
import ModalAddItem from './_parts/ModalAdd'
import ModalDelete from './_parts/ModalDelete'
import ModalImport from './_parts/ModalImport'
import ModalSwitchToRegular from './_parts/ModalSwitchToRegular'
import ModalView from './_parts/ModalView'

const Index: FC<any> = () => {
  const fileImportRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { page = '1', limit = '5' } = queryParams

  const [tmpDetail, setTmpDetail] = useState<any>()
  // MODALS
  const [showModalView, setShowModalView] = useState<boolean>(false)
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false)
  const [dataImport, setDataImport] = useState<any[]>([])
  const [showModalImport, setShowModalImport] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
  const [showModalSwitchToRegular, setShowModalSwitchToRegular] = useState<boolean>(false)

  const dataUserMemberQueryParams: any = {
    q: queryParams?.q || '',
    page,
    limit,
  }

  const dataUserMemberQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getUserMember', dataUserMemberQueryParams],
    queryFn: () => getUserMember(dataUserMemberQueryParams),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataUserMember: any = dataUserMemberQuery?.data?.data || []
  const dataUserMemberTotal = dataUserMemberQuery?.data?.total || 0
  const pageIsLoading: any = !dataUserMemberQuery?.isFetched

  return (
    <div className='content'>
      <title>UserMember</title>
      <Filter
        onClickAdd={() => {
          setTmpDetail(undefined)
          setShowModalAdd(true)
        }}
        onClickImport={() => {
          fileImportRef.current?.click()
        }}
      />
      <input
        ref={fileImportRef}
        type='file'
        multiple={false}
        accept='.csv, .xls, .xlsx, application/sheet, application/ms-excel, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e?.target?.files?.length) {
            const reader = new FileReader()
            reader.onloadend = async (e) => {
              const data = e?.target?.result
              const workbook = xlsx.read(data, { type: 'array' })
              const sheetName = workbook.SheetNames[0]
              const worksheet = workbook.Sheets[sheetName]
              const jsonArr = xlsx.utils.sheet_to_json(worksheet)
              const result = jsonArr?.map((item: any) => {
                const newItem: any = item
                newItem.role_id = 2
                newItem.ref = 3
                newItem.first_name = item?.first_name?.toString()
                newItem.last_name = item?.last_name?.toString()
                newItem.username = item?.username?.toString()
                newItem.phone = item?.phone?.toString()
                newItem.password = (item?.password || 1234)?.toString()
                return newItem
              })
              await setDataImport(result)
              setShowModalImport(true)
            }
            reader.readAsArrayBuffer(e.target.files[0])
          }
          if (fileImportRef.current) {
            fileImportRef.current.value = ''
          }
        }}
      />
      <div className='d-flex align-items-center gap-8px fs-16px fw-500 my-10px'>
        <div className='fs-12px'>Total</div>
        <div className='fs-12px'>:</div>
        <div className='fw-700 text-primary'>{dataUserMemberTotal}</div>
        {isDev && (
          <div
            className='btn btn-sm btn-dark m-0 py-1 px-3 ms-auto'
            onClick={() => {
              queryClient.resetQueries({ queryKey: ['getUserMember'] })
            }}>
            Clear Cache
          </div>
        )}
      </div>
      <div className='bg-white shadow-xs mb-50px'>
        <Table
          loading={pageIsLoading}
          stickyHeader
          data={dataUserMember}
          pagination
          total={dataUserMemberTotal}
          columnClasses={{ image: 'text-center' }}
          headers={[
            { value: 'image', label: '#', className: 'text-center', width: 0, sort: false },
            { value: 'name', label: 'User', className: 'text-start', sort: false },
            { value: 'member', label: 'Member', className: 'text-start', sort: false },
            { value: 'actions', label: '', className: 'text-center', width: 0, sort: false },
          ]}
          tdClass='px-20px py-10px fs-13px'
          render={(e: any, _original: any) => {
            return {
              name: () => (
                <div className=''>
                  <div className='text-wrap'>{_original?.full_name}</div>
                  <div className='fs-11px text-gray-600'>
                    {_original?.username} ({_original?.email})
                  </div>
                  <div className='fs-11px text-gray-600'>{_original?.phone}</div>
                </div>
              ),
              member: () => {
                const isMember = Boolean(_original?.member)
                const durationInMonths = Math.round((e?.duration || 0) / 30)
                const expired = moment(_original?.membership?.end_date).format(
                  'dddd, D MMMM yyyy (HH:mm [WIB])'
                )
                return (
                  <div className='d-flex gap-5px'>
                    <div
                      className='w-25px h-25px radius-50 border'
                      style={{
                        background: `#fff url(${e?.badge || '/media/placeholder/blank-image.svg'}) center / cover no-repeat`,
                      }}
                    />
                    <div>
                      {isMember ? (
                        <div className='text-wrap'>{e?.name}</div>
                      ) : (
                        <>
                          <i className='d-block text-wrap text-danger ms-5px mt-5px'>Expired</i>
                          <div
                            className='btn btn-sm btn-warning py-2px px-5px mt-5px'
                            onClick={() => {
                              new Promise((resolve) => resolve(setTmpDetail(_original))).then(() =>
                                setShowModalSwitchToRegular(true)
                              )
                            }}>
                            Pindahkan ke Reguler
                          </div>
                        </>
                      )}
                      {isMember && (
                        <>
                          <div className='fs-11px text-gray-600'>
                            <span>Level : </span>
                            <span className='text-dark'> {e?.level}</span>
                          </div>
                          <div className='fs-11px text-gray-600'>
                            <span>Durasi : </span>
                            <span className='text-dark'> {durationInMonths} bulan</span>
                          </div>
                          <div className='fs-11px text-gray-600'>
                            <span>Expired : </span>
                            <span className='text-dark'> {expired}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              },
              image: () => {
                const img = _original?.avatar_link
                if (img) {
                  return (
                    <div
                      className='w-50px h-50px radius-50 border'
                      style={{
                        background: `#fff url(${img}) center / cover no-repeat`,
                      }}
                    />
                  )
                } else {
                  return (
                    <div
                      className='w-50px h-50px radius-50 border'
                      style={{
                        background: `#fff url(/media/placeholder/avatar.svg) center / cover no-repeat`,
                      }}
                    />
                  )
                }
              },
              actions: () => {
                return (
                  <div className='d-flex flex-center gap-10px'>
                    <Tooltip placement='top' title='Lihat detail kelas'>
                      <button
                        type='button'
                        disabled={_original?.service_id === 1}
                        className='btn btn-light-primary btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          new Promise((resolve) => resolve(setTmpDetail(_original))).then(() =>
                            setShowModalView(true)
                          )
                        }}>
                        <div className='fas fa-eye' />
                      </button>
                    </Tooltip>
                    <Tooltip placement='top' title='Edit paket'>
                      <div
                        className='btn btn-light-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={() => {
                          new Promise((resolve) => resolve(setTmpDetail(_original))).then(() => {
                            setShowModalAdd(true)
                          })
                        }}>
                        <div className='fas fa-pen-alt' />
                      </div>
                    </Tooltip>
                    <Tooltip placement='auto' title='Hapus paket'>
                      <div
                        className='btn btn-light-danger btn-flex flex-center p-0 w-30px h-30px radius-50'
                        onClick={async () => {
                          new Promise((resolve) => resolve(setTmpDetail(_original))).then(() => {
                            setShowModalDelete(true)
                          })
                        }}>
                        <div className='fas fa-trash-alt' />
                      </div>
                    </Tooltip>
                  </div>
                )
              },
            }
          }}
        />
      </div>
      {/* Modal View */}
      <ModalView show={showModalView} setShow={setShowModalView} detail={tmpDetail} />
      {/* Modal Add Item */}
      <ModalAddItem
        show={showModalAdd}
        setShow={setShowModalAdd}
        detail={tmpDetail}
        queryKey={['getUserMember', dataUserMemberQueryParams]}
      />
      {/* Modal Delete Item */}
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        detail={tmpDetail}
        queryKey={['getUserMember', dataUserMemberQueryParams]}
      />
      {/* Modal Switch to Regular */}
      <ModalSwitchToRegular
        show={showModalSwitchToRegular}
        setShow={setShowModalSwitchToRegular}
        detail={tmpDetail}
        queryKey={['getUserMember', dataUserMemberQueryParams]}
      />
      {/* Modal Delete Item */}
      <ModalImport
        show={showModalImport}
        setShow={setShowModalImport}
        data={dataImport}
        queryKey={['getUserMember', dataUserMemberQueryParams]}
      />
    </div>
  )
}

export default Index
