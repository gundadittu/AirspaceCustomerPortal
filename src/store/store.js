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

 const store = createStore(rootReducer, compose(middlewares));
 
 registerWithMiddleware(sagaMiddleware);

 export default store; 