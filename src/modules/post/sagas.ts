import { all, call, take, select, put } from 'redux-saga/effects'
import { postLikeRequest, postLikeSuccess, postLikeFailure } from '.'
import { likePost } from './requests'
import { RootState } from 'rootReducer'
import { Authentication } from 'modules/currentUser'
import { navigate } from '@reach/router'
import { trigger } from 'swr'


function* watchLikeSuccess() {
  while (true) {
    const { payload: { projectId, postId } }: ReturnType<typeof postLikeSuccess> = yield take(postLikeSuccess.type)

    trigger(`/projects/${projectId}/posts/${postId}/like`)
    trigger(`/projects/${projectId}/posts/${postId}`)
  }
}

function* watchLikeRequests() {
  while (true) {
    const action: ReturnType<typeof postLikeRequest> = yield take(postLikeRequest.type)
    const { accessToken }: Authentication = yield select((state: RootState) => state.currentUser.auth)

    if (!accessToken) {
      yield put(postLikeFailure())
      navigate('/login', { state: { redirectTo: window.location.pathname }})
      continue
    } 

    try {
      yield call(likePost, accessToken, { ...action.payload })

      yield put(postLikeSuccess(action.payload))
    } catch (error) {

      yield put(postLikeFailure())
    }
  }
}

export default function*() {
  return yield all([
    watchLikeRequests(),
    watchLikeSuccess()
  ])
}