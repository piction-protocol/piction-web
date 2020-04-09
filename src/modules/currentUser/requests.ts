import request from 'config/axios'

export interface CreateSessionResponse {
  accessToken: string
}

export interface LoginParams {
  loginId: string
  password: string
  rememberme: boolean
}

export interface UserMeResponse {
  loginId: string,
  email: string,
  username: string,
  createdAt: number,
  picture?: string,
}

export const createSession = (param: LoginParams): Promise<CreateSessionResponse> =>
  request({
    url: `/sessions`,
    method: 'POST',
    data: param
  }).then(res => res.data)

export const destroySession = () =>
  request({
    url: '/sessions',
    method: 'DELETE',
  })

export const fetchCurrentUser = (accessToken: string): Promise<UserMeResponse> =>
  request({
    url: '/users/me',
    method: 'GET',
    headers: {
      'X-Auth-Token': accessToken,
    }
  }).then(res => res.data)