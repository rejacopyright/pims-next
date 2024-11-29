// import 'react-toastify/dist/ReactToastify.css'
'use client'
import 'react-toastify/ReactToastify.min.css'

import dynamic from 'next/dynamic'
const ToastContainer = dynamic(
  () => import('react-toastify').then(({ ToastContainer }) => ToastContainer),
  { ssr: false }
)

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer limit={0} stacked />
    </>
  )
}
