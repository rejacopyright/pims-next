'use client'

import '@components/viewer/image/style.scss'

import { defaultIcons } from '@components/viewer/image/common'
import { VideoPlayer } from '@components/viewer/video'
import { blobToBase64, getClientOS } from '@helpers'
import Image from 'rc-image'
import { FC, useEffect, useMemo, useState } from 'react'

// import ModalViewImage from './ModalViewImage'
import ModalViewVideo from './ModalViewVideo'

const Index: FC<any> = ({ detailBadge }) => {
  // const [tmpImage, setTmpImage] = useState<any>(undefined)
  // const [showModalViewImage, setShowModalViewImage] = useState<boolean>(false)
  const [showModalViewVideo, setShowModalViewVideo] = useState<boolean>(false)

  const [visible, setVisible] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)

  const achievement: any = detailBadge?.credentialSubject?.achievement || {}
  const evidence: any = detailBadge?.evidence?.[0]?.ext || {}
  const imgEvidence: any = detailBadge?.evidence?.[0]?.image || []

  const vidEvidence: any = detailBadge?.evidence?.[0]?.video || {}
  const [vidSrc, setVidSrc] = useState<any>(undefined)

  const pillClass =
    'd-flex flex-center px-16px border bg-gray-200 color-66 radius-100 flex-nowrap text-truncate'
  const titleClass = 'fs-20px fw-700'

  const isApple: any = useMemo(() => ['iOS'].includes(getClientOS()?.os), [])

  useEffect(() => {
    if (vidEvidence?.id) {
      if (isApple) {
        fetch(vidEvidence?.id)
          .then((res: any) => res?.blob())
          .then(async (e: any) => {
            const b64Video: any = await blobToBase64(e)
            setVidSrc(b64Video)
          })
      } else {
        setVidSrc(vidEvidence?.id)
      }
    }
  }, [vidEvidence?.id, isApple])
  return (
    <>
      {/* CONTENTS OF TRAINING */}
      {achievement?.description && (
        <div className='row m-0 border border-gray-200 radius-15 p-5 pb-0 position-relative bg-white p-24px mb-16px'>
          <div className='col-12 p-0 mb-16px'>
            <div className='d-flex align-items-center gap-8px'>
              <div
                className='w-30px h-30px bg-gray-300 radius-50'
                style={{ background: 'url(/media/assets/contents-of-training.png)' }}
              />
              <div className={titleClass}>수련 내용 (Contents of training)</div>
            </div>
          </div>
          <div className='col-12 p-0' style={{ whiteSpace: 'pre-line' }}>
            <div className='w-100 fw-400 fs-16px text-dark'>
              {achievement?.description?.split('\\n')?.join('\n')}
            </div>
          </div>
        </div>
      )}
      {/* SCORES */}
      {Array.isArray(evidence?.score) && evidence?.score?.length > 0 && (
        <div className='row m-0 border border-gray-200 radius-15 p-5 pb-0 position-relative bg-white p-24px mb-24px'>
          <div className='col-12 p-0 mb-16px'>
            <div className='d-flex align-items-center gap-8px'>
              <div
                className='w-30px h-30px bg-gray-300 radius-50'
                style={{ background: 'url(/media/assets/examination-results.png)' }}
              />
              <div className={titleClass}>심사 결과 (Examination results)</div>
            </div>
          </div>
          <div className='col-12 p-0 fs-16px fw-400'>
            <div className='d-flex flex-wrap align-items-center gap-16px'>
              {evidence?.score?.map((ev: any, index: number) => (
                <div key={index} className='d-flex flex-center flex-nowrap gap-13px fw-400'>
                  <div className={pillClass} style={{ height: '36px' }}>
                    {ev?.name}
                  </div>
                  <div className='pe-5px text-dark'>{ev?.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* LEADER */}
      {evidence?.leader && (
        <div className='row m-0 border border-gray-200 radius-15 p-5 pb-0 position-relative bg-white p-24px mb-24px'>
          <div className='col-12 p-0 mb-16px'>
            <div className='d-flex align-items-center gap-8px'>
              <div
                className='w-30px h-30px bg-gray-300 radius-50'
                style={{ background: 'url(/media/assets/leader.png)' }}
              />
              <div className={titleClass}>지도자 (Leader)</div>
            </div>
          </div>
          <div className='col-12 p-0 fs-16px fw-400'>
            <div className='d-flex flex-wrap align-items-center gap-16px'>
              <div className='d-flex align-items-center flex-wrap gap-13px fw-400'>
                <div className={pillClass} style={{ height: '36px' }}>
                  지도자명 (Leader's name)
                </div>
                <div className='text-dark'>{evidence?.leader?.name}</div>
              </div>
              <div className='d-flex align-items-center flex-wrap gap-13px fw-400'>
                <div className={pillClass} style={{ height: '36px' }}>
                  지도자 단 번호 (Leader's DAN No.)
                </div>
                <div className='text-dark'>{evidence?.leader?.dan}</div>
              </div>
              <div className='d-flex align-items-center flex-wrap gap-13px fw-400'>
                <div className={pillClass} style={{ height: '36px' }}>
                  지도자 단 (Leader's DAN)
                </div>
                <div className='text-dark'>{evidence?.leader?.dan_no}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* CENTER NAME */}
      {evidence?.leader?.center_name && (
        <div className='row m-0 border border-gray-200 radius-15 p-5 pb-0 position-relative bg-white p-24px mb-24px'>
          <div className='col-12 p-0 mb-16px'>
            <div className='d-flex align-items-center gap-8px'>
              <div
                className='w-30px h-30px bg-gray-300 radius-50'
                style={{ background: 'url(/media/assets/center-name.png)' }}
              />
              <div className={titleClass}>도장명 (Center name)</div>
            </div>
          </div>
          <div className='col-12 p-0 fs-16px fw-bold'>
            <div className=''>{evidence?.leader?.center_name}</div>
          </div>
        </div>
      )}
      {/* IMAGE */}
      {imgEvidence?.length > 0 && (
        <div className='row m-0 border border-gray-200 radius-15 p-5 pb-0 position-relative bg-white p-24px mb-24px gap-24px'>
          <div className='col-12 p-0 mb-16px'>
            <div className='d-flex align-items-center gap-8px'>
              <div
                className='w-30px h-30px bg-gray-300 radius-50'
                style={{ background: 'url(/media/assets/photographic-image.png)' }}
              />
              <div className={titleClass}>사진 이미지 (Photographic image)</div>
            </div>
          </div>
          {imgEvidence?.length > 0 && (
            <Image.PreviewGroup
              items={imgEvidence?.map(({ id }: any) => id)}
              preview={{
                icons: defaultIcons,
                visible,
                onVisibleChange: setVisible,
                current,
                onChange: setCurrent,
                // onTransform: throttle(async ({ transform, action }: any) => {
                //   if (action === 'move') {
                //     const thisFile: any = await urlToFile(imgEvidence?.[current]?.id, 'just-test')
                //     const thisImageWidth: any =
                //       (thisFile?.meta?.width || 0) * (transform?.scale || 1)
                //     const documentWidth: number = document?.body?.offsetWidth || 0
                //     const smallestWidth: any = Math.min(...[thisImageWidth, documentWidth])
                //     const quarterOfWidthThisImage: number = smallestWidth / 4
                //     const isNext: boolean = transform?.x < 0
                //     const transformWidth: number = Math.abs(transform?.x || 0)
                //     // Whether Go Next or Prev
                //     console.log(isNext)

                //     if (isNext && transformWidth >= quarterOfWidthThisImage) {
                //       setGoTo('next')
                //     } else if (!isNext && transformWidth >= quarterOfWidthThisImage) {
                //       setGoTo('prev')
                //     }
                //   }
                //   if (action === 'dragRebound') {
                //     console.log('goTo =>', goTo)
                //   }
                // }, 100),
              }}>
              {imgEvidence?.map((item: any, index: number) => {
                return (
                  <div key={index} className='col-12 p-0 fs-16px fw-bold'>
                    <div className='row m-0 align-items-center gap-13px'>
                      <div className='col-auto h-auto px-10px' style={{ width: '300px' }}>
                        <div
                          className='w-100 bg-gray-200'
                          onClick={() => {
                            setCurrent(index)
                            setVisible(true)
                          }}
                          style={{
                            background: `url(${item?.id}) center / contain no-repeat`,
                            minHeight: '150px',
                            maxHeight: '300px',
                          }}>
                          {/* <Image
                              src={item?.id}
                              // src={`https://i.pinimg.com/originals/39/a3/dc/39a3dcbd4d2d66405ba59818028855b6.jpg`}
                              wrapperStyle={{
                                width: '100%',
                                maxHeight: '300px',
                              }}
                            /> */}
                        </div>
                      </div>
                      <div className='col p-0'>{item?.caption?.split('\\n')?.join('\n')}</div>
                    </div>
                  </div>
                )
              })}
            </Image.PreviewGroup>
          )}
        </div>
      )}
      {/* VIDEO */}
      {vidEvidence?.id && (
        <div className='row m-0 border border-gray-200 radius-15 p-5 pb-0 position-relative bg-white p-24px mb-24px'>
          <div className='col-12 p-0 mb-16px'>
            <div className='d-flex align-items-center gap-8px'>
              <div
                className='w-30px h-30px bg-gray-300 radius-50'
                style={{ background: 'url(/media/assets/video.png)' }}
              />
              <div className={titleClass}>동영상 (Video)</div>
            </div>
          </div>
          <div className='col-12 p-0 fs-16px fw-bold'>
            <div className='row m-0 align-items-center gap-13px'>
              <div className='col-auto px-10px' style={{ width: '300px' }}>
                <div className='d-flex bg-gray-200'>
                  <div
                    className='d-flex flex-center position-relative'
                    onClick={() => !isApple && setShowModalViewVideo(true)}
                    style={{ width: '100%', maxHeight: '300px', minHeight: '200px' }}>
                    {!vidSrc && (
                      <span className='indicator-progress d-block mb-10px'>
                        <span className='spinner-border spinner-border-sm text-gray-400 fs-10px w-25px h-25px align-middle' />
                      </span>
                    )}
                    <VideoPlayer readOnly={!isApple} src={vidSrc} autoPlay={false} />
                  </div>
                </div>
              </div>
              <div className='col p-0'>{vidEvidence?.caption?.split('\\n')?.join('\n')}</div>
            </div>
          </div>
        </div>
      )}
      {/* <ModalViewImage show={showModalViewImage} setShow={setShowModalViewImage} detail={tmpImage} /> */}
      <ModalViewVideo show={showModalViewVideo} setShow={setShowModalViewVideo} src={vidSrc} />
    </>
  )
}

export default Index
