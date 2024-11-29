'use client'
import langKeys from '@metronic/i18n/messages/en.json'
import { useIntl } from 'react-intl'

export function getJWTPayload(token: any) {
  if (token) {
    try {
      const base64Url: any = token?.split('.')[1] || token
      const base64: any = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/')
      const jsonPayload: any = decodeURIComponent(
        window
          .atob(base64)
          ?.split('')
          ?.map((c: any) => '%' + ('00' + c?.charCodeAt(0)?.toString(16))?.slice(-2))
          ?.join('')
      )
      return JSON.parse(jsonPayload)
    } catch {
      return undefined
    }
  } else {
    return undefined
  }
}

export const detectMobileScreen = () => {
  let isMobile: boolean = false
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 720) {
      isMobile = true
    } else {
      isMobile = false
    }
  }
  return isMobile
}

export const truncate: any = (str: any, max: number) => {
  const string = str?.toString()?.replace(/  +/g, ' ')
  const arr = string?.toString()?.split(' ')
  if (arr?.length > max) {
    return arr?.slice(0, max)?.join(' ') + '...'
  } else {
    return string
  }
}

export const truncateChar: any = (str: any, max: number) => {
  const strLen = str?.toString()?.length
  return strLen > max ? str?.substring(0, max) + '...' : str
}

export const toCurrency = (number: number) =>
  number?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

export const isValidMail = (text: any) =>
  text?.toString()?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)

export const isValidURL = (str: any) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(str)
}

export const toCapitalize = (text: string) =>
  text?.replace(/(?:^|\s)\S/g, (a: any) => a?.toUpperCase())

export const urlToBase64 = async (url: string) => {
  const data = await fetch(url)
  const blob = await data.blob()
  return new Promise((resolve: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      const base64data = reader.result
      resolve(base64data)
    }
  })
}

export const urlToFile = async (url: string, name: string) => {
  const data = await fetch(url)
  const blob = await data.blob()
  const file = new File([blob], name, { type: blob.type })
  const buffer = await blob.arrayBuffer()
  const base64 = await new Promise((resolve: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const base64data = reader.result
      resolve(base64data)
    }
  })
  const result: any = {
    file,
    blob,
    buffer,
    base64,
  }
  return result
}

export const base64ToArrayBuffer = (dataURI: any) => {
  const BASE64_MARKER = ';base64,'
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER?.length
  const base64 = dataURI.substring(base64Index)
  const unit8 = Uint8Array.from(atob(base64), (c: any) => c.charCodeAt(0))
  return unit8.buffer
}

export const bufferToBase64 = (buffer: any) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export const randomString = () => {
  const rand: any =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  return rand
}

export const sortByDayName = (days: any = [], key = 'day') => {
  const indexOfDays: any = {
    sunday: 1,
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
    saturday: 7,
  }
  return days.sort((a: any, b: any) => indexOfDays[a[key]] - indexOfDays[b[key]])
}

export const PageSubTitle = ({ title, reload: _reload }: any) => {
  const subTitle: any = document.querySelector('.pageSubTitle')
  if (subTitle && title) {
    subTitle.innerHTML = title
  }
  // useEffect(() => {
  //   subTitle && title && (subTitle.innerHTML = renderToString(title))
  //   return () => {
  //     subTitle && (subTitle.innerHTML = '')
  //   }
  // }, [subTitle, title, reload])
  return null
}

export const replaceHTMLEntity = (text: any) => {
  if (typeof text === 'string') {
    return text?.replace(/(<([^>]+)>|&[A-Za-z0-9#]+;)/gi, '')?.toString()
  } else {
    return text
  }
}

export const numberWithCommas = (number: any, last_two_digit = true) => {
  return number
    ? parseFloat(number)
        .toFixed(last_two_digit ? 2 : 0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    : undefined
}

export const encodeHTMLEntities = (text?: any) => {
  const textArea: any = document.createElement('textarea')
  textArea.innerText = text || ''
  let encodedOutput: any = textArea.innerHTML
  const arr: any = encodedOutput?.split('<br>')
  encodedOutput = arr?.join('\n')
  return encodedOutput
}

export const decodeHTMLEntities = (text?: any) => {
  const textArea: any = document.createElement('textarea')
  textArea.innerHTML = text || ''
  return textArea?.value
}

// export const ToolbarActions: FC<{ children?: ReactNode; asMobileTitle?: boolean }> = ({
//   children,
//   asMobileTitle,
// }) => {
//   const toolbar_actions: any = document.getElementById('toolbar_actions')
//   if (asMobileTitle) {
//     const toolbar_container: any = document.getElementById('kt_toolbar_container')
//     toolbar_container.classList.add('justify-content-center')
//   } else {
//     const toolbar_container: any = document.getElementById('kt_toolbar_container')
//     toolbar_container.classList.remove('justify-content-center')
//   }
//   useEffect(() => {
//     const toolbar_root = createRoot(toolbar_actions)
//     setTimeout(() => {
//       toolbar_root && children && toolbar_root.render(children)
//     }, 100)
//     return () => {
//       setTimeout(() => {
//         toolbar_root && children && toolbar_root.unmount()
//       }, 100)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [children])
//   return null
// }

export const copyToClipboard = async (text: any) => {
  try {
    const permissions: any = await navigator?.permissions?.query({ name: 'clipboard-write' as any })
    if (permissions?.state === 'granted' || permissions?.state === 'prompt') {
      await navigator.clipboard.writeText(text)
    } else {
      throw new Error("Can't access the clipboard. Check your browser permissions.")
    }
  } catch {
    //
  }
}

export const downloadFile = async ({ url, fileName = 'downloaded-file' }) => {
  const { blob }: any = await urlToFile(url, fileName)
  let ext: any = 'txt'
  switch (blob?.type?.split(';')?.[0]) {
    case 'image/png':
      ext = 'png'
      break
    case 'image/jpeg':
      ext = 'jpg'
      break
  }
  const uri = window.URL.createObjectURL(new Blob([blob]))
  const link = document.createElement('a')
  link.href = uri
  link.download = `${fileName}.${ext}`
  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(uri)
}

export const downloadBlobFile = async ({
  blob,
  fileName = 'downloaded-file',
}: {
  blob: Blob
  fileName?: string
}) => {
  let ext: any = 'txt'
  switch (blob?.type) {
    case 'image/png':
      ext = 'png'
      break
    case 'image/jpeg':
      ext = 'jpg'
      break
    case 'image/svg+xml':
      ext = 'svg'
      break
    case 'application/pdf':
      ext = 'pdf'
      break
  }
  const uri = window.URL.createObjectURL(new Blob([blob]))
  const link = document.createElement('a')
  link.href = uri
  link.download = `${fileName}.${ext}`
  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(uri)
}

export const translate = (id: keyof typeof langKeys) => {
  const intl = useIntl()
  return intl.formatMessage({ id })
}

export const utf8ToBase64 = (str) => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16))
    })
  )
}

export const base64ToUtf8 = (base64Str) => {
  return decodeURIComponent(
    atob(base64Str)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

export const blobToBase64 = (blob) => {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}
