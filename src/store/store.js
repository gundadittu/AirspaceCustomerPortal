import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';

import generalReducer from './reducers/general';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    general: generalReducer,
    users: usersReducer, 
    auth: authReducer
 });
 
 const sagaMiddleware = createSagaMiddleware();
 let middlewares = applyMiddleware(sagaMiddleware);

 const store = createStore(rootReducer, compose(middlewares));
 
 sagaMiddleware.run(rootSaga);
 
 export default store; 