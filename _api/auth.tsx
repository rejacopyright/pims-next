import axios from '@api/axios'

export const login = (data: { username: string; password: string }) => {
  return axios.post('auth/login', data)
}

export const refreshToken = (data: { user_id: string }) => {
  return axios.post('auth/reissue', data)
}

export const resetPassword = (data: { user_eml: string }) => {
  return axios.put('member/reset_pwd', data)
}
