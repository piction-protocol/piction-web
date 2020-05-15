import useSWR from 'swr'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import useExplicitContent from 'hooks/useExplicitContent';
import useCurrentUser from 'hooks/useCurrentUser';
import { ProjectResponse } from 'hooks/useProject';

import { postLikeRequest } from 'modules/post';

interface PostResponse {
  id: number
  title: string
  cover: string | null
  previewText: string | null
  likeCount: number
  series: {
    id: number
    name: string
    priority: number
    createdAt: number
    postCount: number
    thumbnails: (string | null)[]
  }
  publishedAt: number
  membership: {
    id: number
    name: string
    description: string | null
    thumbnail: string | null
    price: number
    level: number
    sponsorLimit: number | null
    sponsorCount: number
    postCount: number
    status: boolean
    createdAt: number
  } | null 
  status: 'PUBLIC' | 'HIDDEN'
}

function usePost(projectId: string, postId: number) {
  const { 
    data: project,
    error: projectError
  } = useSWR<ProjectResponse, AxiosError>(`/projects/${projectId}`, { revalidateOnFocus: false })

  const { isExplicitContent, consentWithExplicitContent } = useExplicitContent(project)

  const {
    data: post,
    error: postError
  } = useSWR<PostResponse, AxiosError>(`/projects/${projectId}/posts/${postId}`, { revalidateOnFocus: false })

  const {
    data: content,
    error: contentError,
    revalidate: revalidateContent,
  } = useSWR(`/projects/${projectId}/posts/${postId}/content`, { revalidateOnFocus: false, shouldRetryOnError: false })

  const [needSponsorship, setNeedSponsorship] = useState(false)
  useEffect(() => {
    if (contentError && contentError.response.data.code === 4003) {
      setNeedSponsorship(true)
    }
    return () => setNeedSponsorship(false)
  }, [contentError])

  const dispatch = useDispatch();

  const { currentUser } = useCurrentUser()
  const { data: { like } = { like: false } } = useSWR(currentUser ? `/projects/${projectId}/posts/${postId}/like` : null, { revalidateOnFocus: false });

  const handleLike = async () => {
    dispatch(postLikeRequest({ projectId, postId }))
  };

  return {
    project,
    projectError,
    post,
    postError,
    content,
    revalidateContent,
    needSponsorship,
    like,
    handleLike,
    isExplicitContent,
    consentWithExplicitContent
  }
}

export default usePost