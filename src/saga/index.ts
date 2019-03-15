import * as authSagas from './auth';
import * as officeAdminSagas from './officeAdmin';
import * as generalSagas from './general';

const sagas: {[index: string]: any} = {
    ...authSagas,
    ...officeAdminSagas,
    ...generalSagas
};

export default function registerWithMiddleware(middleware: { run: Function }) {
    for (let name in sagas) {
        middleware.run(sagas[name]);
    }
}
