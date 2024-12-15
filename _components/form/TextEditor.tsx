'use client'

// Documentation
// https://github.com/JiHong88/SunEditor/blob/master/README.md

import { useDeepEffect } from '@hooks'
import dynamic from 'next/dynamic'
import { FC, memo, useMemo, useRef, useState } from 'react'
// import {renderToString} from 'react-dom/server'
import { SunEditorOptions } from 'suneditor/src/options'
const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false })

interface Props {
  id?: any
  height?: any
  placeholder?: any
  defaultData?: any
  loading?: boolean
  onChange?: any
  onFocus?: any
  onBlur?: any
  className?: any
  options?: SunEditorOptions
  setContent?: boolean
  disabled?: boolean
}

let Index: FC<Props> = ({
  placeholder = '',
  defaultData = '',
  loading = false,
  height = 'auto',
  onChange = () => '',
  onFocus = () => '',
  onBlur = () => '',
  className = 'p-1 border border-gray-300 radius-5',
  options = {},
  setContent = true,
  disabled = false,
}) => {
  const editor: any = useRef()
  if (disabled) {
    className = ''
  }

  const getSunEditorInstance: any = (sunEditor: any) => {
    // editor?.current?.destroy?.()
    editor.current = sunEditor
    return sunEditor
  }
  const buttonList: any = useMemo(
    () => [
      ['undo', 'redo'],
      [
        // 'font',
        'fontSize',
        'formatBlock',
        'fontColor',
        // 'hiliteColor',
      ],
      ['bold', 'underline', 'italic'],
      ['removeFormat'],
      // ['strike', 'subscript', 'superscript'],
      ['align', 'horizontalRule', 'list', 'lineHeight'],
      [
        // 'table',
        // 'link',
        // 'image',
      ],
      // ['showBlocks', 'codeView'],
      // ['outdent', 'indent'],
      // ['fullScreen', 'preview', 'print'],
      [
        '%320',
        [
          ['undo', 'redo'],
          [':p-More Paragraph-default.more_paragraph', 'fontSize', 'formatBlock', 'fontColor'],
          [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'removeFormat'],
          [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
          [':r-More Rich-default.more_plus', 'table', 'link', 'image'],
          // ['-right', ':i-More Misc-default.more_vertical', 'showBlocks', 'codeView'],
        ],
      ],
    ],
    []
  )

  const [data, setData] = useState<any>()
  useDeepEffect(() => {
    if (loading) {
      editor?.current?.disable?.()
      editor?.current?.core?.showLoading?.()
    } else {
      editor?.current?.enable?.()
      editor?.current?.core?.closeLoading?.()
    }
    setData(defaultData)
  }, [defaultData, loading])

  // useDeepEffect(() => {
  //   if (!loading && editor?.current && options) {
  //     editor?.current?.setOptions?.(options)
  //   }
  // }, [options, loading])

  // setTimeout(() => {
  //   editor?.current?.core?.focus?.()
  // }, 1000)

  return (
    <div className={className}>
      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        disable={disabled}
        hideToolbar={disabled}
        width='100%'
        height={height}
        placeholder={placeholder}
        defaultValue={data || ''}
        // defaultValue='<div><br />&nbsp;</div>'
        onImageUploadBefore={(files: any) => {
          setTimeout(() => editor?.current?.core?.focus?.(), 1000)
          return files
        }}
        setContents={setContent ? data : ''} // setContent = true, will be show defaultData on module custom email template
        setDefaultStyle='font-family: inherit'
        setOptions={{
          placeholder: '',
          historyStackDelayTime: 500, // same as debounce
          resizingBar: false,
          mode: 'classic',
          stickyToolbar: -1,
          // minHeight: '100px',
          // hideToolbar: true,
          // imageUrlInput: false,
          // imageAlignShow: false,
          // imageHeightShow: false,
          imageUploadHeader: undefined,
          imageUploadUrl: undefined,
          attributesWhitelist: { all: '*' },
          addTagsWhitelist: '*',
          defaultTag: 'div',
          buttonList: buttonList,
          ...options,
          // icons: {
          //   // editor?.current?.core?.icons
          //   bold: renderToString(<i className='fas fa-eye text-dark' />),
          // },
        }}
        onChange={(e: any) => onChange(e, editor?.current)}
        // onFocus={onFocus}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

Index = memo(Index, (prev: any, next: any) => JSON.stringify(prev) === JSON.stringify(next))
export default Index
