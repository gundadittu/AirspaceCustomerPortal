// import { all } from 'redux-saga/effects';
import * as authSagas from './auth';
import * as officeAdminSagas from './officeAdmin';

// import watchSetUpFirebaseSaga from './setUpFirebase';
// import watchSetUpUserSaga from "./setUpUser"; 

const sagas: {[index: string]: any} = {
    ...authSagas, 
    ...officeAdminSagas
};

export default function registerWithMiddleware(middleware: { run: Function }) {
    for (let name in sagas) {
        middleware.run(sagas[name]);
    }
}

// export default function* rootSaga() {
//     yield all([
//         watchSetUpUserSaga, 
//         watchSetUpFirebaseSaga
//     ]);
//   }