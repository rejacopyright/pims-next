import axios from '@api/axios'

export const getUserSubmission = (data?: { user_id: string }) => {
  return axios({
    method: 'post',
    url: 'biz/submission_user_submit_badge_list',
    data,
  })
}

export const getSubmissionList = (data: { user_id: string }) => {
  return axios({
    method: 'post',
    url: 'biz/submission_list',
    data,
  })
}

export const getSubmissionDetail = (data: {
  user_id: string
  biz_mbr_id: string
  sbmsn_idx: string
}) => {
  return axios({
    method: 'post',
    url: 'biz/view_submission',
    data,
  })
}

export const getBadgeAvailableforSubmission = (data: {
  user_id: string
  biz_mbr_id: string
  sbmsn_idx: string
}) => {
  return axios({
    method: 'post',
    url: 'biz/submission_available_badge_list',
    data,
  })
}
