import { take, delay, put } from 'redux-saga/effects'
import { setFlash, dismissFlash } from '.'

export default function* flashSaga() {
  while(true) {
    yield take(setFlash.type)
    yield delay(4000)
    yield put(dismissFlash())
  }
}