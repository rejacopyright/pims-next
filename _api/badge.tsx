import axios, { API_SERVER } from '@api/axios'

export const getBadges = (data?: { user_id: string; ctgry?: string | undefined }) => {
  return axios({
    method: 'post',
    url: 'badge/list',
    data,
  })
}

export const issueBadge = (data?: object) => {
  return axios({
    method: 'post',
    url: 'badge/issue',
    data,
  })
}

export const getDetailBadge = (data: { data?: string }) => {
  return axios({
    method: 'post',
    url: 'badge/public/validate',
    data,
  })
}

export const validateBadge = (data: { data?: string }) => {
  return axios({
    method: 'post',
    url: 'badge/public/validate',
    data,
  })
}

export const getCategories = (params?: { user_id: string }) => {
  return axios({
    method: 'get',
    url: 'badge/category_list',
    params,
  })
}

export const addCategory = (data?: { user_id: string; user_sub_id: string; ctgry: string }) => {
  return axios({
    method: 'post',
    url: 'badge/insert_category',
    data,
  })
}

export const updateCategory = (data?: {
  user_id: string
  user_sub_id: string
  ctgry: string
  new_ctgry: string
}) => {
  return axios({
    method: 'post',
    url: 'badge/update_category',
    data,
  })
}

export const deleteCategory = (data?: {
  user_id: string
  user_sub_id: string
  ctgry: string
  sno: any
}) => {
  return axios({
    method: 'post',
    url: 'badge/delete_category',
    data,
  })
}

export const updateBadgeCategory = (data: {
  user_id: string
  user_bdg_id: string
  ctgry: string
}) => {
  return axios({
    method: 'post',
    url: 'badge/update_badge_category',
    data,
  })
}

// export const sortCategory = (data?: {
//   user_id: string
//   user_sub_id: string
//   ctgry: string
//   sno: string
//   gbn: 'up' | 'down'
// }) => {
//   return axios({
//     method: 'post',
//     url: 'badge/change_category_sno',
//     data,
//   })
// }

export const getExternalBadge = (data?: { user_id: string }) => {
  return axios({
    method: 'post',
    url: 'import_badge/list',
    data,
  })
}

export const importExternalBadge = (data: { user_id: string; imageFile: any }) => {
  const formData = new FormData()
  formData.append('user_id', data.user_id)
  formData.append('file', data.imageFile)
  return axios({
    method: 'post',
    url: 'import_badge/insert_import_badge',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const deleteExternalBadge = (data: {
  user_id: string
  user_sub_id: string
  bdg_id: string
}) => {
  return axios({
    method: 'delete',
    url: 'import_badge/delete',
    data,
  })
}

export const badgeImage = (data: { user_id: string; badge_file_name: string }) => {
  return axios({
    baseURL: `${API_SERVER}/`,
    responseType: 'blob',
    method: 'post',
    url: 'user_badge',
    data,
  })
}

export const badgePDF = (data: { user_id: string; cert_file_name: string }) => {
  return axios({
    responseType: 'blob',
    method: 'post',
    url: 'badge/user_badge_pdf',
    data,
  })
}

export const getBlockchainVerification = (data: {
  user_id: string
  user_bdg_id: string
  biz_mbr_id: string
  bdg_id: string
}) => {
  return axios({
    method: 'post',
    url: 'badge/validate',
    data,
  })
}

export const createShareURL = (data: {
  user_id: string
  user_bdg_id: string
  shae_start_date?: string
  shae_end_date?: string
}) => {
  return axios({
    method: 'post',
    url: 'badge/create_share_url',
    data,
  })
}
