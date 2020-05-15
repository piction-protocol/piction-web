import request from 'config/axios'

interface LikePostParams {
  projectId: string
  postId: number
}

export const likePost = (accessToken: string, params: LikePostParams) =>
  request({
    url: `/projects/${params.projectId}/posts/${params.postId}/like`,
    method: 'POST',
    headers: {
      'X-Auth-Token': accessToken,
    },
  }).then(res => res.data)