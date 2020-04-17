import { all } from 'redux-saga/effects'
import currentUserSaga from 'modules/currentUser/sagas'
import subscriptionSaga from 'modules/subscription/sagas'
import postSaga from 'modules/post/sagas'

function* rootSaga() {
  yield all([
    currentUserSaga(),
    subscriptionSaga(),
    postSaga()
  ]);
}

export default rootSaga;
