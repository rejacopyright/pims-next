import { configClass } from '@helpers'
import { forwardRef, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'

interface Props {
  defaultValue?: any
  prefix?: any
  min?: number
  max?: number | undefined
  onChange?: (e?: any) => void
  disabled?: boolean
  placeholder?: string
  readOnly?: boolean
  autoFocus?: boolean
}

const Index = forwardRef<HTMLInputElement, Props>(
  (
    {
      defaultValue = '',
      prefix = undefined,
      min = 0,
      max = undefined,
      onChange = () => '',
      disabled = false,
      placeholder = '',
      readOnly = false,
      autoFocus = false,
    }: Props,
    ref
  ) => {
    const [value, setValue] = useState<any>('')

    useEffect(() => {
      let val: number = defaultValue
      if (max && defaultValue > max) {
        val = max
      } else if (min && defaultValue < min) {
        val = min
      }
      setValue(val)
    }, [defaultValue, min, max])

    return (
      <div className='input-group input-group-solid d-flex align-items-center bg-gray-100 border border-gray-300 overflow-hidden'>
        {prefix && (
          <div className='ps-5 d-flex h-100 flex-center'>
            <button type='button' className='btn btn-icon w-25px h-25px radius-5'>
              {prefix}
            </button>
          </div>
        )}
        <NumericFormat
          getInputRef={ref}
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={0}
          disabled={disabled}
          // allowEmptyFormatting={true}
          isAllowed={(val) => {
            const { floatValue, value } = val
            if (floatValue && min && max) {
              return (floatValue >= min && floatValue <= max) || floatValue === undefined
            }
            if (floatValue && min && parseInt(min?.toString()) !== 0) {
              return floatValue >= min
            }
            if (floatValue && max) {
              return floatValue <= max || floatValue === undefined
            }
            if (parseInt(value[0]) === 0 && !isNaN(parseInt(value[1]))) {
              return false
            }
            return true
          }}
          onValueChange={onChange}
          value={parseFloat(value)}
          defaultValue={parseFloat(value)}
          className={`border-0 ${configClass?.form}`}
          readOnly={readOnly}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </div>
    )
  }
)

export default Index
