import { FC, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/lazy'

interface Props {
  src: string
  readOnly?: boolean
  autoPlay?: boolean
}

export const VideoPlayer: FC<Props> = ({ src, readOnly = false, autoPlay = true }) => {
  const videoRef: any = useRef()

  useEffect(() => {
    videoRef.current.addEventListener(
      'contextmenu',
      (e: any) => {
        e.preventDefault()
      },
      false
    )

    return videoRef.current.removeEventListener(
      'contextmenu',
      (e: any) => {
        e.preventDefault()
      },
      false
    )
  }, [])

  return (
    <div ref={videoRef} className='h-100'>
      <ReactPlayer
        width='100%'
        height='100%'
        url={src}
        controls={!readOnly}
        playing={!readOnly && autoPlay}
        stopOnUnmount
        pip={false}
        loop={false}
        muted={false}
        playsInline
        config={{
          file: {
            attributes: { controlsList: 'nodownload' },
            // forceHLS: isSafari,
            // forceSafariHLS: true,
            // forceVideo: true,
            forceVideo: true,
            hlsVersion: '0.12.4',
          },
        }}
      />
    </div>
  )
}
