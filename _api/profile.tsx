import axios from '@api/axios'

export const editProfile = (data: {
  user_id: string
  user_frst_nm?: string
  user_last_nm?: string
  user_brth_ymd?: string
  user_mbl?: string
  user_ntn_cd?: string
  user_psta_cd?: string
  user_ctpv?: string
  user_cty?: string
  user_addr?: string
  user_daddr?: string
}) => {
  return axios({
    method: 'put',
    url: 'member/update_user_info',
    data,
  })
}
export const changePassword = (data: { user_id: string; user_pswd?: string }) => {
  return axios({
    method: 'put',
    url: 'member/update_user_pwd',
    data,
  })
}
export const loginHistory = (data: { user_id: string; page_no?: string; page_size?: string }) => {
  return axios({
    method: 'post',
    url: 'member/login_history',
    data,
  })
}
export const addEmail = (data: { user_id: string; user_eml?: string }) => {
  return axios({
    method: 'post',
    url: 'member/add_user_eml',
    data,
  })
}
export const deleteEmail = (data: { user_id: string; user_eml?: string }) => {
  return axios({
    method: 'put',
    url: 'member/delete_user_eml',
    data,
  })
}
export const setDefaultEmail = (data: { user_id: string; user_eml?: string }) => {
  return axios({
    method: 'put',
    url: 'member/update_user_eml_rprs',
    data,
  })
}
export const me = (user_id: string) => {
  return axios({
    method: 'post',
    url: 'member/user_info',
    data: { user_id },
  })
}
export const getBadgeStats = (user_id: string) => {
  return axios({
    method: 'post',
    url: 'member/select_user_badge_stats',
    data: { user_id },
  })
}
