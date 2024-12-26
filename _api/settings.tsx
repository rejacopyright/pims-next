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
