import { createAction } from '@reduxjs/toolkit'

export const subscriptionRequest = createAction<{
  projectId: string,
  membershipId: number,
  sponsorshipPrice: number
}>("subscription/subscriptionRequest")

export const subscriptionSuccess = createAction<{
  projectId: string,
  membershipId: number,
}>("subscription/subscriptionSuccess")

export const subscriptionFailure = createAction("subscription/subscriptionFailure")

export const cancelSubscriptionRequest = createAction<{
  projectId: string,
  membershipId: number,
}>("subscription/cancelSubscriptionRequest")

export const cancelSubscriptionSuccess = createAction<{
  projectId: string,
  membershipId: number,
}>("subscription/cancelSubscriptionSuccess")

export const cancelSubscriptionFailure = createAction("subscription/cancelSubscriptionFailure")
