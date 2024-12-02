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

export const getClass = (service_id: number = 2, params: any) => {
  return axios({
    method: 'get',
    url: `class/${service_id}`,
    params,
  })
}

export const getDetailClass = (id?: string) => {
  return axios({
    method: 'get',
    url: `class/${id}/detail`,
  })
}
