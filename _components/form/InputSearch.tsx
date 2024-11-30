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
  height?: number
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
  rounded = false,
  icon = 'search',
  controlled = false,
  bounceOnEmpty = false,
  height = 40,
}) => {
  const [val, setVal] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

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
      className={`input-group d-flex align-items-center bg-white border border-gray-300 h-${height}px position-relative radius-${rounded ? 50 : 5} ${className}`}>
      <div className={`d-flex flex-center w-${height}px h-${height}px radius-${rounded ? 50 : 5}`}>
        <i className={`las la-${icon} text-dark fs-16px`} style={{ transform: 'scaleX(-1)' }} />
      </div>
      {controlled ? (
        <input
          type='text'
          name='search'
          value={val}
          className='form-control h-100 border-0 bg-transparent fs-13px ps-0 mb-1px'
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
          className='form-control h-36px border-0 bg-transparent fs-13px ps-5px pt-8px'
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
