import { FC, useRef, useState } from 'react'

interface InputOTPTypes {
  digits?: number
  type?: 'text' | 'number'
}

export const InputOTP: FC<InputOTPTypes> = ({ digits = 4, type = 'number' }) => {
  const initialArrary = new Array(digits).fill('')
  const [otp, setOtp] = useState(initialArrary)
  const otpBoxReference: any = useRef([])

  const handleChange = (value: any, index: number) => {
    const newArr = [...otp]
    newArr[index] = value
    const fillFromStart: any = newArr?.filter((f: any) => Boolean(f))
    const resArray = Object.assign(initialArrary, fillFromStart)
    setOtp([...resArray])

    if (value && index < digits - 1) {
      if (fillFromStart?.length < digits) {
        otpBoxReference?.current?.[fillFromStart?.length]?.focus()
      } else {
        otpBoxReference?.current?.[index + 1]?.select()
      }
    }
  }

  const handleBackspaceAndEnter = (e: any, index: number) => {
    if (e?.key === 'Backspace' && !e?.target?.value && index > 0) {
      e.preventDefault()
      otpBoxReference?.current?.[index - 1]?.select()
    }
    if (e?.key === 'Enter' && e?.target?.value && index < digits) {
      otpBoxReference?.current?.[index + 1]?.focus()
    }
  }

  const handlePaste = (e: any, index: number) => {
    setOtp((prev: any) => {
      const getPastedData: any = e?.clipboardData
        ?.getData('text/plain')
        ?.replace(/\s/, '')
        ?.slice(0, digits - index)
      let res: any = prev?.slice(0, index)?.concat(getPastedData?.split(''))
      if (res?.length < digits) {
        res = Object.assign(initialArrary, res)
        otpBoxReference?.current?.[res?.length]?.focus()
      } else {
        otpBoxReference?.current?.[digits - 2]?.select()
      }
      if (
        type === 'number' &&
        res?.filter((item: any) => Boolean(item))?.filter((item: any) => isNaN(parseInt(item)))
          ?.length
      ) {
        e.preventDefault()
        return [...prev]
      }
      return [...res]
    })
  }

  return (
    <div className='d-flex align-items-center gap-4'>
      {otp?.map((digit: any, index: number) => (
        <input
          key={index}
          inputMode='numeric'
          value={digit}
          maxLength={1}
          onClick={({ target }: any) => {
            target?.select()
          }}
          onInput={({ target: { value } }: any) => handleChange(value, index)}
          onPaste={(e: any) => handlePaste(e, index)}
          onKeyUp={(e: any) => handleBackspaceAndEnter(e, index)}
          onKeyDown={(e: any) => {
            if (e?.key === 'Backspace') {
              e.preventDefault()
              setOtp((prev: any) => {
                prev = prev?.filter((f: any) => Boolean(f))
                prev?.splice(-1)
                const resArray = Object.assign(initialArrary, prev)
                return [...resArray]
              })
            }
            if (e?.key === 'ArrowLeft' && index > 0) {
              otpBoxReference?.current?.[index - 1]?.select()
            }
            if (e?.key === 'ArrowRight' && index < digits) {
              otpBoxReference?.current?.[index + 1]?.select()
            }
            if (
              type === 'number' &&
              !e?.key?.toString()?.match(/[0-9]|(Backspace|Tab)/g) &&
              e?.code !== 'KeyV'
            ) {
              e.preventDefault()
            }
          }}
          ref={(reference) => (otpBoxReference.current[index] = reference) as any}
          className={`form-control border-primary w-60px h-75px text-center fs-3x text-dark fw-bolder`}
        />
      ))}
    </div>
  )
}
