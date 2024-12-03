import axios from '@api/axios'

export const createClass = (data: any) => {
  return axios({
    method: 'post',
    url: 'class/create',
    data,
  })
}

export const updateClass = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `class/${id}/update`,
    data,
  })
}

export const deleteClass = (id: string) => {
  return axios({
    method: 'delete',
    url: `class/${id}/delete`,
  })
}

export const getClass = (service_id: string = 'studio', params?: any) => {
  return axios({
    method: 'get',
    url: `class/${service_id}`,
    params,
  })
}

export const getStudioClass = (params?: any) => {
  return axios({
    method: 'get',
    url: `class/studio`,
    params,
  })
}

export const getFunctionalClass = (params?: any) => {
  return axios({
    method: 'get',
    url: `class/functional`,
    params,
  })
}

export const getDetailClass = (id?: string) => {
  return axios({
    method: 'get',
    url: `class/${id}/detail`,
  })
}

export const createOpenClass = (data: any) => {
  return axios({
    method: 'post',
    url: 'class/open/create',
    data,
  })
}

export const updateOpenClass = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `class/open/${id}/update`,
    data,
  })
}

export const deleteOpenClass = (id: string) => {
  return axios({
    method: 'delete',
    url: `class/open/${id}/delete`,
  })
}

export const getOpenClass = (service_id: string = 'studio', params?: any) => {
  return axios({
    method: 'get',
    url: `class/open/${service_id}`,
    params,
  })
}

export const getDetailOpenClass = (id?: string) => {
  return axios({
    method: 'get',
    url: `class/open/${id}/detail`,
  })
}
