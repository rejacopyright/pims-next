import axios from '@api/axios'

export const getPublicBadgeDetail = (sharingToken?: string) => {
  return axios({
    method: 'get',
    url: `badge/share/${sharingToken}`,
  })
}
export const getPublicIMGBadgeDetail = (sharingToken?: string) => {
  return axios({
    method: 'get',
    url: `badge/share/${sharingToken}/png`,
    responseType: 'blob',
  })
}

export const getBufferIMG = (sharingToken?: string) => {
  return axios({
    method: 'get',
    url: `badge/share/${sharingToken}/png`,
    responseType: 'arraybuffer',
  })
}
