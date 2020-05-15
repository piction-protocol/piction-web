import { RootState } from 'rootReducer'
import { all, put, take, call, select } from 'redux-saga/effects'
import { Cookies } from 'react-cookie'

import {
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
} from 'modules/currentUser'
import { setFlash } from 'modules/flash'
import { 
  createSession,
  destroySession,
  fetchCurrentUser,
  UserMeResponse,
  CreateSessionResponse,
} from 'modules/currentUser/requests'

import DefaultPicture from 'images/img-user-profile.svg';
import { push, replace } from 'connected-react-router'

const cookies = new Cookies();

function* watchCurrentUser() {
  while (true) {
    yield take(fetchCurrentUserRequest.type)
    const { accessToken } = yield select((state: RootState) => state.currentUser.auth)
    try {
      if (accessToken) {
        const currentUser: UserMeResponse = yield call(fetchCurrentUser, accessToken)
        yield put(fetchCurrentUserSuccess({
          ...currentUser,
          picture: currentUser.picture || DefaultPicture
        }))
      }
    } catch (error) {
      // TODO: Handle failed fetch current user request
      yield put(fetchCurrentUserFailure(error))
      yield put(logoutRequest())
    }
  }
}

function* watchLoginSuccess() {
  while (true) {
    const { payload }: ReturnType<typeof loginSuccess> = yield take(loginSuccess.type)
    yield put(setFlash({ type: 'success', message: '로그인 되었습니다' }))

    cookies.set('access_token', payload.accessToken, {
      expires: payload.rememberme ? new Date('2099-12-31T23:59:59') : undefined
    })

    yield put(fetchCurrentUserRequest())
  }
}

function* loginFlow() {
  while (true) {
    const { payload }: ReturnType<typeof loginRequest> = yield take(loginRequest.type)

    try {
      const response: CreateSessionResponse = yield call(createSession, payload)

      yield put(loginSuccess({ accessToken: response.accessToken, rememberme: payload.rememberme }))

      yield put(replace(payload.redirectTo || '/'))
    } catch (error) {
      yield put(loginFailure(error.response.data.message as string))
    }
  }
}

function* logoutFlow() {
  while(true) {
    yield take(logoutRequest.type)

    yield put(push('/'))

    yield call(destroySession)

    cookies.remove('access_token')

    yield put(setFlash({ type: 'success', message: '로그아웃 되었습니다' }))
  }
}

function* currentUserSaga() {
  yield all([
    loginFlow(),
    logoutFlow(),
    watchLoginSuccess(),
    watchCurrentUser()
  ])
}

export default currentUserSaga;