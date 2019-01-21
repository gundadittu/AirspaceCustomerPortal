import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import registerWithMiddleware from '../saga/index.ts';

import generalReducer from './reducers/general';
import officeAdminReducer from './reducers/officeAdmin';
import authReducer from './reducers/auth';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    general: generalReducer,
    auth: authReducer,
    officeAdmin: officeAdminReducer
 });

 const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

 const sagaMiddleware = createSagaMiddleware();
 let middlewares = applyMiddleware(sagaMiddleware);

 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 export const store = createStore(persistedReducer, composeEnhancer(middlewares));
 export const persistor = persistStore(store);

 registerWithMiddleware(sagaMiddleware);