'use client'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import { useSize } from '@hooks'
import { FC, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

interface PDFViewerTypes {
  page?: number
  src?: string
  parentRef?: any
}

export const PDFViewer: FC<PDFViewerTypes> = ({
  page = 1,
  src = 'https://pdfobject.com/pdf/sample.pdf',
  parentRef = undefined,
}) => {
  const [parentWidth, setParentWidth] = useState<number>(300)
  useSize(() => {
    if (parentRef?.current?.clientWidth) {
      setParentWidth(parentRef?.current?.clientWidth || 300)
    }
  }, 100)

  return (
    <Document
      file={src}
      loading={
        <div className='d-flex flex-center' style={{ height: '60vh' }}>
          <span className='spinner-border w-50px h-50px text-primary border-2 opacity-50'></span>
        </div>
      }>
      <Page
        className='d-flex-xxx justify-content-center'
        // renderMode='custom'
        width={parentWidth - 15}
        pageNumber={page}
      />
    </Document>
  )
}
