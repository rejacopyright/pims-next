import axios from '@api/axios'

export const getDepartment = (params: object) => {
  return axios({
    method: 'get',
    params,
    url: 'department',
  })
}

export const addDepartment = (data: any) => {
  return axios({
    method: 'post',
    url: 'department',
    data,
  })
}

export const editDepartment = (data: any, id: any) => {
  return axios({
    method: 'put',
    url: `department/${id}`,
    data,
  })
}

export const deleteDepartment = (id: any) => {
  return axios({
    method: 'delete',
    url: `department/${id}`,
  })
}

export const getDetailDepartment = (id: string) => {
  return axios({
    method: 'get',
    url: `department/${id}`,
  })
}
