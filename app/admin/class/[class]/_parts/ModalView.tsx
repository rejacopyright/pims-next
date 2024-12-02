import { API_SERVER } from '@api/axios'
import { getDetailClass } from '@api/class'
import TextEditor from '@components/form/TextEditor'
import { toCurrency, urlToBase64 } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
}> = ({ show, setShow, detail = {} }) => {
  const genderObj = { 1: 'Pria', 2: 'Wanita', 3: 'Campuran' }
  const detailClassQuery: any = useQuery({
    // initialData: {data: []},
    enabled: show && Boolean(detail?.id),
    queryKey: ['getDetailClass', { id: detail?.id }],
    queryFn: async () => {
      const api = await getDetailClass(detail?.id as string)
      const newData = api?.data
      newData.images = await Promise.all(
        newData?.class_gallery?.map(async (img) => {
          const base64Img = await urlToBase64(`${API_SERVER}/static/images/class/${img?.filename}`)
          return { index: img?.index, img: base64Img }
        })
      )

      return newData
    },
  })

  const detailClass = detailClassQuery?.data || {}

  return (
    <Modal
      centered
      dialogClassName='modal-lg'
      contentClassName='radius-15'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='p-0'>
        <div className='border-bottom border-gray-300 p-15px m-0 d-flex align-items-center'>
          <div className='fas fa-info-circle text-primary me-10px fs-16px' />
          <div className='fw-bold fs-14px'>{detailClass?.name}</div>
        </div>
        {detailClass?.class_gallery?.length > 0 && (
          <div className='px-15px py-5px'>
            <div className='row'>
              {detailClass?.class_gallery?.map(({ filename }: any, key: number) => (
                <div key={key} className='col-auto mt-15px'>
                  <div
                    className='w-100px h-100px btn border border-gray-300 d-flex flex-center position-relative radius-15'
                    style={{
                      background: `#fff url(${API_SERVER}/static/images/class/${filename}) center / cover no-repeat`,
                    }}></div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='p-15px'>
          <div className='mb-15px'>
            <div className='text-gray-500'>Nama Program</div>
            <div className='fw-bold fs-14px'>{detailClass?.name}</div>
          </div>
          <div className='mb-15px'>
            <div className='text-gray-500'>Harga Default</div>
            <div className='fw-bold fs-14px'>Rp. {toCurrency(detailClass?.default_fee || 0)}</div>
          </div>
          <div className='mb-15px'>
            <div className='text-gray-500'>Gender</div>
            <div className='fw-bold fs-14px'>{genderObj?.[detailClass?.gender]}</div>
          </div>
          <div className='mb-15px'>
            <div className='text-gray-500'>Default Trainer</div>
            <div className='fw-bold fs-14px'>
              {detailClass?.default_trainer?.first_name} {detailClass?.default_trainer?.last_name}
            </div>
          </div>
          {detailClass?.description && (
            <div className='mb-15px'>
              <div className='text-gray-500'>Deskipsi</div>
              <div className='' style={{ marginLeft: '-10px', marginRight: '-10px' }}>
                <TextEditor
                  id='editor'
                  disabled
                  options={{ className: 'p-0' }}
                  placeholder='Tulis deskripsi disini...'
                  defaultData={detailClass?.description || ''}
                  loading={false}
                />
              </div>
            </div>
          )}
        </div>
        <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
          <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
            <div className='fs-14px'>Tutup</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
