import { KTSVG } from '@helpers'
import debounce from 'lodash/debounce'
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'

interface SearchboxProps {
  onChange?: (e: string | undefined) => void
  isBouncing?: (e: boolean) => void
  defaultValue?: string
  delay?: number
  className?: string
  placeholder?: any
  size?: 'sm' | 'md' | 'lg'
  // theme?: 'primary' | 'danger' | 'warning' | 'info' | 'custom-blue'
  rounded?: boolean
  icon?: string
  controlled?: boolean
  bounceOnEmpty?: boolean
}

export const Searchbox: FC<SearchboxProps> = ({
  onChange = () => '',
  isBouncing = () => '',
  defaultValue = '',
  delay = 1000,
  className = '',
  placeholder = 'Search...',
  size = 'md',
  rounded = false,
  icon = 'search',
  controlled = false,
  bounceOnEmpty = false,
}) => {
  const [val, setVal] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  let formSize: string = 'ms-3 me-1 my-3'
  let iconSize: number = 20
  switch (size) {
    case 'sm':
      formSize = 'ms-2 me-0 my-2'
      break
    case 'lg':
      iconSize = 35
      break
    default:
      break
  }

  useEffect(() => {
    setVal(defaultValue)
  }, [defaultValue])

  const debounced = debounce(
    ({ target: { value } }: ChangeEvent & { target: HTMLInputElement }) => {
      setLoading(false)
      isBouncing(false)
      onChange(value)
    },
    delay,
    { leading: false, trailing: true }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(debounced, [])

  return (
    <div
      className={`input-group d-flex align-items-center bg-white border border-gray-300 h-40px position-relative radius-${rounded ? 50 : 5} ${className}`}>
      <div
        className={`d-flex flex-center w-${iconSize}px h-${iconSize}px radius-${rounded ? 50 : 5} ${formSize}`}>
        <KTSVG
          path='/media/icons/general/gen004.svg'
          className='svg-icon-white position-absolutes'
          svgClassName='w-20px h-20px d-none'
        />
        <i className={`las la-${icon} text-dark fs-20px`} style={{ transform: 'scaleX(-1)' }} />
      </div>
      {controlled ? (
        <input
          type='text'
          name='search'
          value={val}
          className='form-control h-35px border-0 bg-transparent fs-13px ps-5px pt-8px'
          placeholder={placeholder}
          onChange={(e: ChangeEvent) => {
            setLoading(true)
            isBouncing(true)
            const target: any = e?.target || {}
            setVal(target?.value)
            if (!bounceOnEmpty && target?.value) {
              onSearch(e)
            } else {
              setLoading(false)
              isBouncing(false)
              onChange(target?.value)
            }
          }}
        />
      ) : (
        <input
          type='text'
          name='search'
          defaultValue={val}
          // className={`border-0 bg-white lh-0 ${configClass?.form}`}
          className='form-control h-35px border-0 bg-transparent fs-13px ps-5px pt-8px'
          placeholder={placeholder}
          onChange={(e: ChangeEvent) => {
            const target: any = e?.target || {}
            setLoading(true)
            isBouncing(true)
            if (!bounceOnEmpty && target?.value) {
              onSearch(e)
            } else {
              setLoading(false)
              isBouncing(false)
              onChange(target?.value)
            }
          }}
        />
      )}
      {loading && (
        <div className='position-absolute end-0'>
          <div className='ps-1 pe-3 pt-2px'>
            <span
              className={`spinner-border w-15px h-15px text-gray-400 border-1 opacity-50`}></span>
          </div>
        </div>
      )}
    </div>
  )
}
