'use client'
// https://www.npmjs.com/package/jimp
// https://www.npmjs.com/package/browser-image-compression

import { KTSVG } from '@helpers'
import imageCompression from 'browser-image-compression'
import { ChangeEvent, FC, useRef } from 'react'

export type UploadFileType = File | Blob | MediaSource | undefined
// export type UploadFilesType = FileList | File[] | Blob[] | MediaSource[]

interface ImageUploaderType {
  onChange?: (e: UploadFileType) => void
}

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 600,
    useWebWorker: true,
  }
  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch {
    return undefined
  }
}

export const ImageUploaderSingle: FC<ImageUploaderType> = ({ onChange = () => '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event?.dataTransfer?.files?.length && event?.dataTransfer?.files?.[0]) {
      const file = await compressImage(event?.dataTransfer?.files?.[0])
      onChange(file)
    }
  }

  const updateImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.length && event?.target?.files?.[0]) {
      const file = await compressImage(event?.target?.files?.[0])
      onChange(file)
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        multiple={false}
        accept='image/*'
        style={{ display: 'none' }}
        onChange={updateImage}
      />
      <div
        className='btn btn-outline btn-bg-light btn-color-gray-600 btn-active-light-primary border-dashed border-primary d-flex flex-center text-center w-100 h-100'
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}>
        <div className='mx-auto text-center'>
          <KTSVG className='' width={50} height={50} path='/media/icons/general/gen006.svg' />
          <small className='text-gray-800 d-block pt-5px'>Browse Image</small>
        </div>
      </div>
    </>
  )
}
