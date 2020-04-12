import { all } from 'redux-saga/effects'
import currentUserSaga from 'modules/currentUser/sagas'
import subscriptionSaga from 'modules/subscription/sagas'

function* rootSaga() {
  yield all([
    currentUserSaga(),
    subscriptionSaga()
  ]);
}

export default rootSaga;
