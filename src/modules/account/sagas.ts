import { take, put } from 'redux-saga/effects'
import { createAccountSuccess } from './actions'
import { replace } from 'connected-react-router'
import { loginSuccess, fetchCurrentUserRequest } from 'modules/currentUser'

export default function* watchCreateAccount() {
  while (true) {
    const action: ReturnType<typeof createAccountSuccess> = yield take(createAccountSuccess.type)

    yield put(replace('/signup/welcome', { redirectTo: action.payload.redirectTo }))
    yield put(loginSuccess({
      accessToken: action.payload.accessToken,
      rememberme: true
    }))
    yield put(fetchCurrentUserRequest())
  }
}