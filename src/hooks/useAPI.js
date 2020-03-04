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
      'X-Device-Platform': 'web',
      accept: 'application/vnd.piction.v1+json',
    },
  });
  const patchConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const my = {
    withdraw: params => API.post('my/wallet/withdrawals', params),
  };

  const resetPassword = {
    sendEmail: params => API.post('/password-resets', params),
    reset: params => API.patch(`/password-resets/${params.token}`, params),
  };

  const post = projectId => ({
    getAll: params => API.get(`/projects/${projectId}/posts`, params),
    create: params => API.post(`/projects/${projectId}/posts`, params),
    delete: params => API.delete(`/projects/${projectId}/posts/${params.postId}`),
    get: params => API.get(`/projects/${projectId}/posts/${params.postId}`),
    getContent: params => API.get(`/projects/${projectId}/posts/${params.postId}/content`),
    update: params => API.put(`/projects/${projectId}/posts/${params.postId}`, params),
    like: params => API.post(`/projects/${projectId}/posts/${params.postId}/like`),
    uploadContentImage: params => API.patch(`/projects/${projectId}/posts/content`, params, patchConfig),
    uploadCoverImage: params => API.patch(`/projects/${projectId}/posts/cover`, params, patchConfig),
  });

  const project = {
    getAll: params => API.get('/projects', params),
    getTaggingProjects: params => API.get(`/projects/tags/${params.tag}`, params),
    getTrendingProjects: params => API.get('/projects/trending', params),
    create: params => API.post('/projects', params),
    get: params => API.get(`/projects/${params.projectId}`),
    update: params => API.put(`/projects/${params.projectId}`, params),
    uploadThumbnail: params => API.patch('/projects/thumbnail', params, patchConfig),
    uploadWideThumbnail: params => API.patch('/projects/wide-thumbnail', params, patchConfig),
  };

  const membership = {
    getAll: params => API.get(`/projects/${params.projectId}/memberships`),
    create: params => API.post(`/projects/${params.projectId}/memberships`, params),
    update: params => API.put(`/projects/${params.projectId}/memberships/${params.membershipId}`, params),
    delete: params => API.delete(`/projects/${params.projectId}/memberships/${params.membershipId}`, params),
    subscribe: params => API.post(`/projects/${params.projectId}/memberships/${params.membershipId}/sponsorship`, params),
    unsubscribe: params => API.delete(`/projects/${params.projectId}/memberships/${params.membershipId}/sponsorship`, params),
  };

  const recommended = {
    getProjects: params => API.get('/recommended/projects', params),
  };

  const series = projectId => ({
    get: params => API.get(`/projects/${projectId}/series/${params.seriesId}`),
    getAll: () => API.get(`/projects/${projectId}/series`),
    getPosts: params => API.get(`/projects/${projectId}/series/${params.seriesId}/posts`, params),
    getPreviousAndNextPosts: params => API.get(`/projects/${projectId}/series/${params.seriesId}/posts/${params.postId}`, params),
    sort: params => API.put(`/projects/${projectId}/series`, params),
    create: params => API.post(`/projects/${projectId}/series`, params),
    update: params => API.put(`/projects/${projectId}/series/${params.seriesId}`, params),
    delete: params => API.delete(`/projects/${projectId}/series/${params.seriesId}`),
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

  const creatorProfile = {
    create: params => API.post('/my/creator-profiles', params),
    update: params => API.put('/my/creator-profiles', params),
  };

  const newsletter = {
    create: params => API.post('/users/newsletter', params),
    delete: params => API.delete('/users/newsletter', params),
    deleteByToken: params => API.delete(`/users/newsletter/token/${params.token}`, params),
  };

  const token = {
    get: () => accessToken,
    create: (value, params) => setCookie('access_token', value, { ...params, path: '/' }),
    delete: () => removeCookie('access_token', { path: '/' }),
  };

  const handleCommonError = ({ code }) => ({
    4001: () => navigate('/login', { state: { redirectTo: window.location.pathname }, replace: true }),
    4004: () => navigate('/404'),
  }[code]());

  return [{
    my,
    resetPassword,
    post,
    project,
    membership,
    recommended,
    series,
    session,
    user,
    creatorProfile,
    newsletter,
    token,
  }, handleCommonError];
}

export default useAPI;
