import { all } from 'redux-saga/effects'
import currentUserSaga from 'modules/currentUser/sagas'
import subscriptionSaga from 'modules/subscription/sagas'
import postSaga from 'modules/post/sagas'
import flashSaga from 'modules/flash/sagas'
import accountSagas from 'modules/account/sagas'

function* rootSaga() {
  yield all([
    flashSaga(),
    currentUserSaga(),
    subscriptionSaga(),
    postSaga(),
    accountSagas()
  ]);
}

export default rootSaga;
