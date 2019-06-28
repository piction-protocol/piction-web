import { useCookies } from 'react-cookie';
import axios from 'axios';

function useAPI() {
  const [cookies] = useCookies(['access_token']);
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

  return [{ post, series }];
}

export default useAPI;
