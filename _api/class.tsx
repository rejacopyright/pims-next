import axios from '@api/axios'

export const createClass = (data: any) => {
  return axios({
    method: 'post',
    url: 'class/create',
    data,
  })
}
