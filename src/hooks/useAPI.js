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

  const my = {
    wallet: () => API.get('my/wallet'),
    projects: () => API.get('my/projects'),
  };

  const post = projectId => ({
    getAll: params => API.get(`/projects/${projectId}/posts`, params),
    create: params => API.post(`/projects/${projectId}/posts`, params),
    getPost: params => API.get(`/projects/${projectId}/posts/${params.postId}`),
    uploadContentImage: params => API.patch(`/projects/${projectId}/posts/content`, params, patchConfig),
    uploadCoverImage: params => API.patch(`/projects/${projectId}/posts/cover`, params, patchConfig),
  });

  const project = {
    create: params => API.post('/projects', params),
    get: params => API.get(`/projects/${params.projectId}`),
    update: params => API.put(`/projects/${params.projectId}`, params),
    uploadThumbnail: params => API.patch('/projects/thumbnail', params, patchConfig),
    uploadWideThumbnail: params => API.patch('/projects/wide-thumbnail', params, patchConfig),
  };

  const series = projectId => ({
    getAll: () => API.get(`/projects/${projectId}/series`),
  });

  const session = {
    create: params => API.post('/sessions', params),
    delete: () => API.delete('/sessions'),
  };

  const user = {
    me: () => API.get('/users/me'),
    create: params => API.post('/users', params),
    update: params => API.put('/users/me', params),
    updatePassword: params => API.patch('/users/me/password', params),
    uploadPicture: params => API.patch('/users/me/picture', params, patchConfig),
  };

  const token = {
    get: () => accessToken,
    create: (value, params) => setCookie('access_token', value, { ...params, path: '/' }),
    delete: () => removeCookie('access_token'),
  };

  return [{
    my,
    post,
    project,
    series,
    session,
    user,
    token,
  }];
}

export default useAPI;
