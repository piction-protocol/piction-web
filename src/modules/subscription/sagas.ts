import { take, call, select, put, all } from 'redux-saga/effects'
import { mutate } from 'swr'

import { RootState } from 'rootReducer'
import { 
  subscriptionRequest,
  subscriptionSuccess,
  subscriptionFailure,
  cancelSubscriptionRequest,
  cancelSubscriptionSuccess,
  cancelSubscriptionFailure
} from '.'
import { subscribeProject, unsubscribeProject } from './requests'

function* watchSubscription() {
  while (true) {
    const action: ReturnType<typeof subscriptionRequest> = yield take(subscriptionRequest.type)
    const { accessToken } = yield select((state: RootState) => state.currentUser.auth)

    try {
      const response = yield call(subscribeProject, accessToken, action.payload)

      yield put(subscriptionSuccess(action.payload))
      mutate(`/projects/${action.payload.projectId}/memberships/sponsorship`, response)
    } catch (error) {
      yield put(subscriptionFailure())
    }
  }
}

function* watchCancelSubscription() {
  while (true) {
    const action: ReturnType<typeof cancelSubscriptionRequest> = yield take(cancelSubscriptionRequest.type)
    const { accessToken } = yield select((state: RootState) => state.currentUser.auth)

    try {
      yield call(unsubscribeProject, accessToken, action.payload)

      yield put(cancelSubscriptionSuccess(action.payload))
      mutate(`/projects/${action.payload.projectId}/memberships/sponsorship`, null)
    } catch (error) {
      yield put(cancelSubscriptionFailure())
    }
  }
}

function* subscriptionSaga() {
  return yield all([
    watchSubscription(),
    watchCancelSubscription()
  ])
}

export default subscriptionSaga