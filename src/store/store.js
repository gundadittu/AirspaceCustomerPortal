import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import registerWithMiddleware from '../saga/index.ts';

import generalReducer from './reducers/general';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    general: generalReducer,
    auth: authReducer,
    users: usersReducer
 });
 
 const sagaMiddleware = createSagaMiddleware();
 let middlewares = applyMiddleware(sagaMiddleware);

 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer, composeEnhancer(middlewares));
 
 registerWithMiddleware(sagaMiddleware);

 export default store; 