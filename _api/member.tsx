import axios from '@api/axios'

export const createMemberPackage = (data: any) => {
  return axios({
    method: 'post',
    url: 'member/package/create',
    data,
  })
}

export const updateMemberPackage = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `member/package/${id}/update`,
    data,
  })
}

export const deleteMemberPackage = (id: string) => {
  return axios({
    method: 'delete',
    url: `member/package/${id}/delete`,
  })
}

export const getMemberPackage = (params?: any) => {
  return axios({
    method: 'get',
    url: `member/package`,
    params,
  })
}

export const getDetailMemberPackage = (id?: string) => {
  return axios({
    method: 'get',
    url: `member/package/${id}/detail`,
  })
}

// ITEMS
export const getMemberItems = (member_id?: string, params?: any) => {
  return axios({
    method: 'get',
    url: `member/items/${member_id}`,
    params,
  })
}

export const addMemberItem = (data: any) => {
  return axios({
    method: 'post',
    url: `member/items/create`,
    data,
  })
}

export const updateMemberItem = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `member/items/${id}/update`,
    data,
  })
}

export const deleteMemberItem = (id: string) => {
  return axios({
    method: 'delete',
    url: `member/items/${id}/delete`,
  })
}
