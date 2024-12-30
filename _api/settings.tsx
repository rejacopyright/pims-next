import axios from '@api/axios'

export const getConfig = () => {
  return axios({
    method: 'get',
    url: `config/detail`,
  })
}

export const updateConfig = (data: any) => {
  return axios({
    method: 'put',
    url: `config/update`,
    data,
  })
}

// ================ APP BANNER ================

export const getAppBanner = () => {
  return axios({
    method: 'get',
    url: `config/app/banner`,
  })
}

export const createAppBanner = (data: any) => {
  return axios({
    method: 'post',
    url: `config/app/banner/create`,
    data,
  })
}

export const updateAppBanner = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `config/app/banner/${id}/update`,
    data,
  })
}

export const deleteAppBanner = (id: string) => {
  return axios({
    method: 'delete',
    url: `config/app/banner/${id}/delete`,
  })
}
