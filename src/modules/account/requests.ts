import request from 'config/axios'

interface CreateAccountParams {
  loginId: string
  email: string
  password: string
  passwordCheck: string
  username: string
}

interface CreateAccountResponse {
  accessToken: string
}

export const createAccount = (params: CreateAccountParams) =>
  request.post<CreateAccountResponse>('/users', params).then(res => res.data)