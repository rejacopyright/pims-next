import axios, { API_SERVER } from '@api/axios'

export const getCategoryGallery = () => {
  return axios({
    method: 'get',
    url: 'biz/service_type',
  })
}

export const getGalleryBadges = (data: { user_id: string }) => {
  return axios({
    method: 'post',
    url: 'biz/badge_list',
    data,
  })
}

export const getGalleryBadgeDetail = (data: { user_id: string; bdg_id: string }) => {
  return axios({
    method: 'post',
    url: 'biz/view_badge',
    data,
  })
}

export const getBusinessMember = (data: { user_id: string }) => {
  return axios({
    method: 'post',
    url: 'biz/member_list',
    data,
  })
}

export const getBusinessBadgeLogo = (data: { user_id: string; img_file_name: string }) => {
  return axios({
    baseURL: `${API_SERVER}/`,
    method: 'post',
    url: '/biz_badge',
    responseType: 'blob',
    data,
  })
}
