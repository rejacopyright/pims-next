import axios from '@api/axios'

export const getTrainer = (params: any) => {
  return axios({
    method: 'get',
    url: 'users/trainer',
    params,
  })
}
