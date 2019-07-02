import { useCookies } from 'react-cookie';
import axios from 'axios';

function useAPI() {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const API = axios.create({
    baseURL: 'http://api-iro.piction.network/',
    headers: {
      'X-Auth-Token': accessToken,
    },
  });
  const patchConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const session = {
    create: params => API.post('/sessions', params),
    delete: () => API.delete('/sessions'),
  };

  const post = projectId => ({
    getAll: params => API.get(`/projects/${projectId}/posts`, params),
    create: params => API.post(`/projects/${projectId}/posts`, params),
    getPost: params => API.get(`/projects/${projectId}/posts/${params.postId}`),
    uploadContentImage: params => API.patch(`/projects/${projectId}/posts/content`, params, patchConfig),
    uploadCoverImage: params => API.patch(`/projects/${projectId}/posts/cover`, params, patchConfig),
  });

  const series = projectId => ({
    getAll: () => API.get(`/projects/${projectId}/series`),
  });

  const user = {
    me: () => API.get('/users/me'),
    create: params => API.post('/users', params),
    update: params => API.put('/users/me', params),
    updatePassword: params => API.patch('/users/me/password', params),
    uploadPicture: params => API.patch('/users/me/picture', params, patchConfig),
  };

  const my = {
    wallet: () => API.get('my/wallet'),
  };

  const token = {
    get: () => accessToken,
    create: (value, params) => setCookie('access_token', value, { ...params }),
    delete: () => removeCookie('access_token'),
  };

  return [{
    session,
    post,
    series,
    user,
    my,
    token,
  }];
}

export default useAPI;
