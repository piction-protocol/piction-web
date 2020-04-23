import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'

import history from 'config/history'

import flash from 'modules/flash'
import currentUser from 'modules/currentUser'

const rootReducer = combineReducers({
  router: connectRouter(history),
  flash,
  currentUser,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;