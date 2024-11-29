export default function Index({ children, modal }) {
  return (
    <div className='d-flex'>
      <div className=''>{children}</div>
      <div className=''>{modal}</div>
    </div>
  )
}
