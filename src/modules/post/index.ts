import { createAction } from '@reduxjs/toolkit'

export const postLikeRequest = createAction<{
  projectId: string,
  postId: number
}>("post/likeRequest")

export const postLikeSuccess = createAction<{
  projectId: string,
  postId: number
}>("post/likeSuccess")

export const postLikeFailure = createAction("post/likeFailure")