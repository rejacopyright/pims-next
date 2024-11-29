import './style.scss'

import { configClass } from '@helpers'
import uniq from 'lodash/uniq'
import { FC, useEffect, useRef, useState } from 'react'
import { ReactTags as Tags } from 'react-tag-autocomplete'

export interface propTags {
  type?: any
  onChange?: any
  onInput?: any
  required?: any
  tag?: Array<{ value: any; label: any }>
  placeholder?: any
  className?: any
  name?: any
}

export const InputTags: FC<propTags> = ({
  type,
  onChange,
  onInput,
  required,
  tag,
  placeholder,
  className = configClass?.form,
  name = '',
}) => {
  const inputRef: any = useRef(null)

  const [tags, setTags] = useState<any>(tag || [])
  const [validateText, setValidateText] = useState<any>({ type: 'text', isValid: true })

  const defaultAllowedChars: any = /^[a-zA-Z0-9!@#$%^&*()\-_+\\|?<>]{2,}$/i
  const classNames: any = {
    root: 'py-1 px-2 ' + className,
    input: 'react-tags__combobox-input',
    tagList: 'react-tags__list',
    tagListItem: 'react-tags__list-item',
    tag: 'react-tags__tag',
    tagName: 'react-tags__tag-name',
    comboBox: 'react-tags__combobox',
  }

  const onValidate = (newTag: any) => {
    let isValid: any = true
    if (newTag === true) {
      return true
    }

    if (newTag?.isValid === false) {
      return false
    }

    if (type === 'email') {
      isValid = newTag?.value?.toString()?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      isValid = Boolean(isValid)
      return Boolean(isValid)
    }

    isValid = defaultAllowedChars.test(newTag?.value)
    return Boolean(isValid)
  }

  const onValidateText = (newTag: any) => {
    let isValid: any = true
    if (newTag === true) {
      setValidateText({ isValid })
      return isValid
    }

    if (newTag?.isValid === false) {
      setValidateText({ isValid: false, message: newTag?.message || 'invalid' })
      return isValid
    }

    if (type === 'email') {
      isValid = newTag?.value?.toString()?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      isValid = Boolean(isValid)
      setValidateText({ type: 'email', isValid, message: 'Input must be type of email' })
      return isValid
    }

    isValid = defaultAllowedChars.test(newTag?.value)
    setValidateText({
      type: 'text',
      isValid,
      message: 'Input must be at least 2 characters',
    })
  }

  const onAddition = (tag: any) => {
    const arr: any = [...tags, tag]?.filter((f: any) => f)
    const newArr: any = uniq(arr)
    setTags(newArr)
    const valuesArray: any = newArr?.map(({ value }: any) => value)
    onChange && onChange(valuesArray)
  }

  const onDelete = (tagIndex: any) => {
    const arr: any = tags?.filter((_: any, i: any) => i !== tagIndex)
    setTags(arr)
    const valuesArray: any = arr?.map(({ value }: any) => value)
    onChange && onChange(valuesArray)
  }

  useEffect(() => {
    required && setValidateText({ isValid: false, message: required })
  }, [required])

  return (
    <>
      <Tags
        ref={inputRef}
        allowNew
        labelText=''
        // addOnBlur
        allowBackspace={true}
        collapseOnSelect
        allowResize={false}
        activateFirstOption
        selected={tags}
        newOptionText=''
        classNames={classNames}
        placeholderText={placeholder || 'Press "Enter" or "Tab"'}
        suggestions={[]}
        onDelete={onDelete}
        delimiterKeys={['Enter', 'Tab', ' ', ',', ';', '/']}
        onAdd={onAddition}
        tagListLabelText={'oke'}
        onValidate={(val: any) => onValidate({ value: val })}
        onInput={(val: any) => {
          if (!val && !required) {
            onValidateText(true)
          } else if (!val && required) {
            onValidateText({ isValid: false, message: required })
          } else {
            onValidateText({ value: val })
          }
          onInput && onInput(val)
        }}
        renderInput={({ ...inputProps }: any) => (
          <input name={name} className={classNames?.input} {...inputProps} />
        )}
        renderTag={({ tag, ...tagProps }: any) => {
          return (
            <div className='d-inline-flex align-items-center bg-light-primary text-primary border border-dotted border-primary radius-50 m-1 p-1'>
              <div className='px-2 fw-bold'>{tag?.label}</div>
              <button
                // onClick={onDelete}
                className='btn btn-icon btn-light-danger border border-dotted border-danger w-20px h-20px radius-50'
                {...tagProps}>
                <i className='fas fa-times' />
              </button>
            </div>
          )
        }}
        renderHighlight={({ children, classNames }: any) => {
          const classes: any = [classNames.root]
          return <div className={classes?.join(' ')}>{children}</div>
        }}
      />

      {!validateText?.isValid && (
        <small className='d-block text-danger mt-1'>{validateText?.message}</small>
      )}
    </>
  )
}
