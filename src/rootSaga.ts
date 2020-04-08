import { all } from 'redux-saga/effects'
import currentUserSaga from 'modules/currentUser/sagas'

function* rootSaga() {
  yield all([
    currentUserSaga()
  ]);
}

export default rootSaga;
