import request from 'config/axios'

interface SubscriptionParams {
  projectId: string
  membershipId: number
  sponsorshipPrice: number
}

export const subscribeProject = (accessToken: string, params: SubscriptionParams) => 
  request({
    url: `/projects/${params.projectId}/memberships/${params.membershipId}/sponsorship`,
    method: 'POST',
    headers: {
      'X-Auth-Token': accessToken,
    },
    data: {
      sponsorshipPrice: params.sponsorshipPrice
    }
  }).then(res => res.data)

interface UnsubscriptionParams {
  projectId: string
  membershipId: number
}

export const unsubscribeProject = (accessToken: string, params: UnsubscriptionParams) => 
  request({
    url: `/projects/${params.projectId}/memberships/${params.membershipId}/sponsorship`,
    method: 'DELETE',
    headers: {
      'X-Auth-Token': accessToken,
    }
  }).then(res => res.data)