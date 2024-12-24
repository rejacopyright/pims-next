import axios from '@api/axios'

export const getTrainer = (params: any) => {
  return axios({
    method: 'get',
    url: 'users/trainer',
    params,
  })
}

export const getUserRegular = (params: any) => {
  return axios({
    method: 'get',
    url: 'users/regular',
    params,
  })
}

export const getUserMember = (params: any) => {
  return axios({
    method: 'get',
    url: 'users/member',
    params,
  })
}

export const addUser = (data: any) => {
  return axios({
    method: 'post',
    url: 'users/create',
    data,
  })
}

export const updateUser = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `users/${id}/update`,
    data,
  })
}

export const deleteUser = (id: string) => {
  return axios({
    method: 'delete',
    url: `users/${id}/delete`,
  })
}

export const importUser = (data) => {
  return axios({
    method: 'post',
    url: `users/create/bulk`,
    data,
  })
}
