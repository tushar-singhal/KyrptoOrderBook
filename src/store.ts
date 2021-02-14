import AsyncStorage from '@react-native-community/async-storage';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Dispatch,
  MiddlewareAPI,
} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import appReducer from './reducers/appReducer';
import orderBook from './reducers/orderBookReducer';

const appPersistConfig = {
  storage: AsyncStorage,
  key: 'app',
};

const ordrBookPersistConfig = {
  storage: AsyncStorage,
  key: 'orderBook',
};

export const reducers = {
  app: persistReducer(appPersistConfig, appReducer),
  orderBook: persistReducer(ordrBookPersistConfig, orderBook),
};

export const rootReducer = combineReducers(reducers);

// tslint:disable-next-line: no-shadowed-variable
const appMiddleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
  next(action);
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, appMiddleware, thunk];
const enhancers = [applyMiddleware(...middlewares)];

export const store = createStore(rootReducer, compose(...enhancers));

export const persistor = persistStore(store);

/*
 *--------------------------------------------------*
 * Reset persist store: persistor.purge()
 *--------------------------------------------------*
 */
