import useSWR from 'swr';
import { AxiosError } from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';
import useExplicitContent from 'hooks/useExplicitContent';

export interface ProjectResponse {
  id: number
  title: string
  uri: string
  synopsis: string
  thumbnail: string
  wideThumbnail: string
  sponsorCount: number
  createdAt: number
  lastPublishedAt: number
  status: 'PUBLIC' | 'HIDDEN'
  tags: string[]
  categories: {
    id: number
    name: string
    priority: number
  }[]
  adult: boolean
  activeMembership: boolean,
  viewType: 'LIST' | 'CARD'
  user: {
    loginId: string
    email: string
    username: string
    picture: string
    createdAt: number
  }
}

interface SeriesResponse {
  [index: number]: {
    id: number
    name: string
    priority: number
    createdAt: number
    postCount: number
    thumbnails: string[]
  }
}

function useProject(projectId: string) {
  const { data: project, error: projectError } = useSWR<ProjectResponse, AxiosError>(`/projects/${projectId}`)
  const { data: series = [] } = useSWR<SeriesResponse>(`/projects/${projectId}/series`)

  const { currentUser } = useCurrentUser()
  const isMyProject = (currentUser && project) && currentUser.loginId === project?.user.loginId

  const { isExplicitContent, consentWithExplicitContent } = useExplicitContent(project)

  return {
    project,
    projectError,
    series,
    isMyProject,
    isExplicitContent,
    consentWithExplicitContent
  }
}

export default useProject