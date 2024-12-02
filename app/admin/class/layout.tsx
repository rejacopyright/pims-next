'use client'

import NotFound from '@pages/not-found'
import { useParams } from 'next/navigation'

export default function Index({ children }) {
  const params = useParams()
  const classType: any = params?.class

  if (!['studio', 'functional'].includes(classType)) {
    return <NotFound />
  }
  return children
}
