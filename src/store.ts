import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import history from 'config/history'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware(),
    sagaMiddleware,
    routerMiddleware(history)
  ]
});

export type AppDispatch = typeof store.dispatch;
export default store;

sagaMiddleware.run(rootSaga);