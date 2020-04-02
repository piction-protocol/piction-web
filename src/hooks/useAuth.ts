import { useCookies } from 'react-cookie';
import useAxiosClient from './useAxiosClient';

export interface UserResponse {
  loginId: string,
  email: string,
  username: string,
  createdAt: number,
  picture?: string,
}

export interface SessionCreateParams {
  loginId: string,
  password: string,
  rememberme: boolean
}

export interface SignupParams {
  loginId: string,
  email: string,
  password: string,
  passwordCheck: string,
  username: string
}

export interface SignupResponse {
  accessToken: string
}

function useAPI() {
  const axiosClient = useAxiosClient();
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const patchConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const token = {
    get: (): string => accessToken,
    create: (value: string, params: any) => setCookie('access_token', value, { ...params, path: '/' }),
    delete: () => removeCookie('access_token', { path: '/' }),
  };

  const user = {
    me: () => axiosClient.get<UserResponse>('/users/me'),
    create: (params: SignupParams) => axiosClient.post<SignupResponse>('/users', params),
    update: (params: any) => axiosClient.put('/users/me', params),
    updatePassword: (params: any) => axiosClient.patch('/users/me/password', params),
    uploadPicture: (params: any) => axiosClient.patch('/users/me/picture', params, patchConfig),
  };

  const session = {
    create: (params: SessionCreateParams) => axiosClient.post('/sessions', params),
    delete: () => axiosClient.delete<null>('/sessions'),
  };

  return {
    token,
    user,
    session,
  };
}

export default useAPI;
