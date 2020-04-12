import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useCurrentUser from 'hooks/useCurrentUser';
import { subscriptionRequest, cancelSubscriptionRequest } from 'modules/subscription';
import { navigate } from '@reach/router';

interface ProjectResponse {
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

interface Membership {
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
}

type MembershipsResponse = Membership[]

function useProject(projectId: string) {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const { currentUser } = useCurrentUser();

  const { data: project, error: projectError } = useSWR<ProjectResponse>(`/projects/${projectId}`, { revalidateOnFocus: false });
  const { data: series = [] } = useSWR<SeriesResponse>(`/projects/${projectId}/series`, { revalidateOnFocus: false });
  const { data: [subscription, ...memberships] = [] } = useSWR<MembershipsResponse>(`/projects/${projectId}/memberships`);
  const { data: sponsored } = useSWR(() => (currentUser ? `/projects/${projectId}/memberships/sponsorship` : null));
  const isMyProject = (currentUser && project) && currentUser.loginId === project?.user.loginId;

  const [showOverlay, setOverlay] = useState(project && project.adult && !cookies[`no-warning-${projectId}`])

  useEffect(() => {
    if (projectError) {
      navigate('/404', { replace: true });
    }
  }, [projectError])

  const supressOverlay = useCallback(() => {
    setOverlay(false)
    setCookie(`no-warning-${projectId}`, true, { expires: moment().add(12, 'hours').toDate(), path: '/' });
  }, [projectId, setCookie])

  const requestToggleSubscription = useCallback(() => {
    if (!sponsored) {
      dispatch(subscriptionRequest({
        projectId,
        membershipId: subscription.id,
        sponsorshipPrice: subscription.price
      }))
    } else {
      dispatch(cancelSubscriptionRequest({
        projectId,
        membershipId: subscription.id,
      }))
    }
  }, [dispatch, projectId, subscription, sponsored])

  return {
    project,
    series,
    subscription,
    memberships,
    sponsored,
    isMyProject,
    requestToggleSubscription,
    showOverlay,
    supressOverlay
  }
}

export default useProject