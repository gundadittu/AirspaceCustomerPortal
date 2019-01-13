import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';
import usersReducer from './reducers/users';

const rootReducer = combineReducers({
    users: usersReducer
 });
 
 const sagaMiddleware = createSagaMiddleware();
 let middlewares = applyMiddleware(sagaMiddleware);

 const store = createStore(rootReducer, compose(middlewares));
 
 sagaMiddleware.run(rootSaga);
 
 export default store; 