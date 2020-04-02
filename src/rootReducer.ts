import { combineReducers } from '@reduxjs/toolkit';

import flash from 'modules/flash'

const rootReducer = combineReducers({
  flash
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;