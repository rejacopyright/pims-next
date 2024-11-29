import axios from '@api/axios'

export const login = (data: { username: string; password: string }) => {
  return axios.post('auth/login', data)
}

export const logoutAPI = (user_id: string) => {
  return axios.post('auth/logout', { user_id })
}

export const register = (data: any) => {
  return axios({
    method: 'post',
    url: 'auth/join',
    data,
  })
}

export const myInfo = (user_id?: string, token?: string) => {
  return axios({
    method: 'post',
    url: 'member/user_info',
    data: { user_id },
    headers: { Authorization: 'Bearer ' + token },
  })
}

export const checkEmail = (email?: string) => {
  return axios({
    method: 'get',
    url: `common/email_dpcn_ck/${email}`,
  })
}

export const checkPhone = (phone?: string) => {
  return axios({
    method: 'get',
    url: `common/mobile_dpcn_ck/${phone}`,
  })
}

export const getOTP = (data: { eml_to: string; eml_se: 'A' | 'B' | 'C' | 'D' }) => {
  return axios({
    method: 'post',
    url: `common/email_send`,
    data,
  })
}

export const verifyOTP = (data: {
  eml_to: string
  eml_se: 'A' | 'B'
  eml_cert_cd: string | number
}) => {
  return axios({
    method: 'post',
    url: `common/email_cd_cert_ck`,
    data,
  })
}

export const getSMS = (data: { sms_to: string; sms_se: 'A' | 'B' }) => {
  return axios({
    method: 'post',
    url: 'common/mobile_sms_send',
    data,
  })
}

export const verifySMS = (data: {
  sms_to: string
  sms_cert_cd: string | number
  sms_se: 'A' | 'B'
}) => {
  return axios({
    method: 'post',
    url: 'common/mobile_sms_cd_cert_ck',
    data,
  })
}

export const refreshToken = (data: { user_id: string }) => {
  return axios.post('auth/reissue', data)
}

export const resetPassword = (data: { user_eml: string }) => {
  return axios.put('member/reset_pwd', data)
}
