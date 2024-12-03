'use client'
import ax from 'axios'
import Cookies from 'js-cookie'
import qs from 'qs'

export const API_SERVER: string = process.env.REACT_APP_SERVER || 'http://localhost:4000'

const axios = ax.create({
  baseURL: `${API_SERVER + '/api/v1'}/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    // 'Access-Control-Max-Age': 0,
    // 'Cache-Control': 'no-cache',
  },
})

// const authStore: any = Cookies.get('persist:token')
// const token: any = JSON.parse(authStore || '{}')?.token?.replace(/"/g, '')
const prefix: any = location?.pathname?.slice(1)?.split('/')?.[0] || ''
const token: any = Cookies.get(`token_${prefix}`)
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
axios.interceptors.request.use(
  (req: any) => {
    if (req.method === 'get' && req?.params) {
      req.paramsSerializer = () =>
        qs.stringify(req.params, {
          encode: false,
          arrayFormat: 'brackets',
          indices: false,
          strictNullHandling: true,
          skipNulls: true,
        })
    }
    return req
  },
  (error: any) => Promise.reject(error)
)
axios.interceptors.response.use(
  (res: any) => res,
  (error: any) => Promise.reject(error)
)

export default axios
