import { useCookies } from 'react-cookie';
import { navigate } from '@reach/router';
import axios from 'axios';

function useAPI() {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://api-stg.piction.network/',
    headers: {
      'X-Auth-Token': accessToken,
      accept: 'application/vnd.piction.v1+json',
    },
  });
  const patchConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const my = {
    wallet: () => API.get('my/wallet'),
    projects: () => API.get('my/projects'),
    projectSubscriptions: params => API.get(`my/projects/${params.projectId}/subscriptions`, params),
    posts: params => API.get(`my/projects/${params.projectId}/posts`, params),
    subscriptions: () => API.get('my/subscriptions'),
  };

  const post = projectId => ({
    getAll: params => API.get(`/projects/${projectId}/posts`, params),
    create: params => API.post(`/projects/${projectId}/posts`, params),
    delete: params => API.delete(`/projects/${projectId}/posts/${params.postId}`),
    get: params => API.get(`/projects/${projectId}/posts/${params.postId}`),
    getContent: params => API.get(`/projects/${projectId}/posts/${params.postId}/content`),
    getIsLike: params => API.get(`/projects/${projectId}/posts/${params.postId}/isLike`),
    update: params => API.put(`/projects/${projectId}/posts/${params.postId}`, params),
    like: params => API.post(`/projects/${projectId}/posts/${params.postId}/like`),
    uploadContentImage: params => API.patch(`/projects/${projectId}/posts/content`, params, patchConfig),
    uploadCoverImage: params => API.patch(`/projects/${projectId}/posts/cover`, params, patchConfig),
  });

  const project = {
    getAll: params => API.get('/projects', params),
    getTaggingProjects: params => API.get(`/projects/tags/${params.tag}`, params),
    create: params => API.post('/projects', params),
    get: params => API.get(`/projects/${params.projectId}`),
    update: params => API.put(`/projects/${params.projectId}`, params),
    uploadThumbnail: params => API.patch('/projects/thumbnail', params, patchConfig),
    uploadWideThumbnail: params => API.patch('/projects/wide-thumbnail', params, patchConfig),
  };

  const fanPass = {
    get: params => API.get(`/fan-pass/${params.fanPassId}`),
    getAll: params => API.get(`/fan-pass/projects/${params.projectId}`),
    getSubscription: params => API.get(`/fan-pass/projects/${params.projectId}/subscription`),
    subscribe: params => API.post(`/fan-pass/${params.fanPassId}/subscription`, params),
    unsubscribe: params => API.delete(`/fan-pass/${params.fanPassId}/subscription`),
  };

  const recommended = {
    getProjects: params => API.get('/recommended/projects', params),
  };

  const series = projectId => ({
    get: params => API.get(`/projects/${projectId}/series/${params.seriesId}`),
    getAll: () => API.get(`/projects/${projectId}/series`),
    getPosts: params => API.get(`/projects/${projectId}/series/${params.seriesId}/posts`, params),
    createSeries: params => API.post(`/projects/${projectId}/series`, params),
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

  const handleCommonError = ({ code }) => ({
    4001: () => navigate('/login', { state: { redirectTo: window.location.pathname }, replace: true }),
    4004: () => navigate('/404'),
  }[code]());

  return [{
    my,
    post,
    project,
    fanPass,
    recommended,
    series,
    session,
    user,
    token,
  }, handleCommonError];
}

export default useAPI;
