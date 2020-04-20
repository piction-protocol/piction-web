import { all } from 'redux-saga/effects'
import currentUserSaga from 'modules/currentUser/sagas'
import subscriptionSaga from 'modules/subscription/sagas'
import postSaga from 'modules/post/sagas'
import flashSaga from 'modules/flash/sagas'

function* rootSaga() {
  yield all([
    flashSaga(),
    currentUserSaga(),
    subscriptionSaga(),
    postSaga()
  ]);
}

export default rootSaga;
