import { useCallback } from 'react'
import useSWR from 'swr'

import useCurrentUser from './useCurrentUser';

import { subscriptionRequest, cancelSubscriptionRequest } from 'modules/subscription';
import { useDispatch } from 'react-redux';

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

function useSubscription(projectId: string) {
  const { currentUser } = useCurrentUser()
  const dispatch = useDispatch()

  const { data: [subscription, ...memberships] = [] } = useSWR<MembershipsResponse>(`/projects/${projectId}/memberships`)
  const { data: sponsored } = useSWR(() => (currentUser ? `/projects/${projectId}/memberships/sponsorship` : null))

  const requestSubscription = useCallback(() => {
    dispatch(subscriptionRequest({
      projectId,
      membershipId: subscription.id,
      sponsorshipPrice: subscription.price
    }))
  }, [dispatch, projectId, subscription])

  const requestCancelSubscription = useCallback(() => {
    dispatch(cancelSubscriptionRequest({
      projectId,
      membershipId: subscription.id,
    }))
  }, [dispatch, projectId, subscription])

  const requestToggleSubscription = () => {
    if (!sponsored) {
      requestSubscription()
    } else {
      requestCancelSubscription()
    }
  }

  return {
    memberships,
    sponsored,
    requestSubscription,
    requestCancelSubscription,
    requestToggleSubscription
  }
}

export default useSubscription;