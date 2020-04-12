import { combineReducers } from '@reduxjs/toolkit';

import flash from 'modules/flash'
import currentUser from 'modules/currentUser'

const rootReducer = combineReducers({
  flash,
  currentUser,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;