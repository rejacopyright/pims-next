export function getCurrentUrl(pathname: string) {
  return pathname?.split(/[?#]/)[0]
}

export function errorValidation(e: any) {
  const { response } = e || {}
  const { data } = response || {}
  const res: any = {}
  if (data && data?.data?.fields) {
    Object.keys(data?.data?.fields || {})?.forEach((map: any) => {
      res[map] = data?.data?.fields?.[map]?.[0]
    })
  } else if (data?.message) {
    res.message = data?.message
  }
  return res
}

export function errorFromAxios(e: any) {
  const { response } = e || {}
  const { data } = response || {}
  let res: any = []
  if (data && data?.data?.fields) {
    res = Object.keys(data?.data?.fields || {})?.map((m: any) => {
      const result: any = data?.data?.fields?.[m]?.[0]
      return result
    })
  } else if (data?.message) {
    res = [data?.message]
  }
  return res
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  if (decodeURI(pathname) === url) {
    return true
  }

  if (current.indexOf(url) > -1) {
    return true
  }

  return false
}
