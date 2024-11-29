import { configClass } from '@helpers'
import debounce from 'lodash/debounce'
import { ChangeEvent, FC, ReactNode, useCallback, useEffect, useState } from 'react'

interface InputDebounceProps {
  type?: 'text' | 'email' | 'number' | 'tel'
  autoFocus?: boolean
  onChange?: (e: string | undefined) => void
  onFocus?: (e: any) => void
  defaultValue?: string
  delay?: number
  className?: string
  placeholder?: string
  icon?: ReactNode
  formClass?: string
}

export const InputDebounce: FC<InputDebounceProps> = ({
  type = 'text',
  autoFocus = false,
  onChange = () => '',
  onFocus = () => '',
  defaultValue = '',
  delay = 1000,
  className = '',
  placeholder = '',
  icon,
  formClass = configClass?.form,
}) => {
  const [val, setVal] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setVal(defaultValue)
  }, [defaultValue])

  const debounced = debounce(
    ({ target: { value } }: ChangeEvent & { target: HTMLInputElement }) => {
      setLoading(false)
      onChange(value)
    },
    delay,
    { leading: false, trailing: true }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(debounced, [])

  return (
    <div
      className={`input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 position-relative overflow-hidden ${className}`}>
      {!!icon && (
        <div className='d-flex flex-center w-20px h-20px ms-3 me-1 my-3 overflow-hidden'>
          {icon}
        </div>
      )}
      <input
        type={type}
        defaultValue={val}
        className={`border-0 ${formClass}`}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onChange={(e: ChangeEvent) => {
          setLoading(true)
          onSearch(e)
        }}
      />
      {loading && (
        <div className='ps-1 pe-4'>
          <span className='spinner-border w-20px h-20px text-primary border-2 opacity-50'></span>
        </div>
      )}
    </div>
  )
}

export const InputDebounceBasic: FC<InputDebounceProps> = ({
  type = 'text',
  autoFocus = false,
  onChange = () => '',
  onFocus = () => '',
  defaultValue = '',
  delay = 1000,
  className = '',
  placeholder = '',
  formClass = configClass?.form,
}) => {
  const [val, setVal] = useState<string>('')

  useEffect(() => {
    setVal(defaultValue)
  }, [defaultValue])

  const debounced = debounce(
    ({ target: { value } }: ChangeEvent & { target: HTMLInputElement }) => {
      onChange(value)
    },
    delay,
    { leading: false, trailing: true }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(debounced, [])

  return (
    <div className={className}>
      <input
        type={type}
        defaultValue={val}
        className={`border-0 ${formClass}`}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onChange={(e: ChangeEvent) => onSearch(e)}
      />
    </div>
  )
}
