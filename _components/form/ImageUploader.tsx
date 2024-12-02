'use client'
// https://www.npmjs.com/package/jimp
// https://www.npmjs.com/package/browser-image-compression

import { KTSVG } from '@helpers'
import imageCompression from 'browser-image-compression'
import { ChangeEvent, FC, useRef } from 'react'

export type UploadFileType = File | Blob | MediaSource
export type UploadFilesType = FileList | File[] | Blob[] | MediaSource[]

interface ImageUploaderType {
  onChange?: (e: UploadFilesType) => void
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

export const ImageUploader: FC<ImageUploaderType> = ({ onChange = () => '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event?.dataTransfer?.files?.length && event?.dataTransfer?.files?.[0]) {
      const files = Promise.all(
        Array.from(event?.dataTransfer?.files)?.map((file: File) => compressImage(file))
      )
      const result = (await files)?.filter((f) => f !== undefined)
      onChange(result)
    }
  }

  const updateImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.length && event?.target?.files?.[0]) {
      const files = Promise.all(
        Array.from(event?.target?.files)?.map((file: File) => compressImage(file))
      )
      const result = (await files)?.filter((f) => f !== undefined)
      onChange(result)
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        multiple
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
          <small className='text-gray-800 d-block pt-5px'>Tambah Gambar</small>
        </div>
      </div>
    </>
  )
}
