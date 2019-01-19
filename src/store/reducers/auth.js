import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    user: null,
    type: null,
    adminOfficeList: null, 
    regularUserPortalMode: 'admin'
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SIGN_IN_USER:
            break;
        case actionTypes.SET_UP_USER_ERROR:
            break;
        case actionTypes.SET_UP_USER_SUCCESS:
            const data = action.payload.data || null;
            const type = data.type || null;
            const adminOfficeList = data.officeAdmin || null;
            return updateObject(state, {user: data, type: type, adminOfficeList: adminOfficeList});
        case actionTypes.SET_UP_USER_ERROR:
            return updateObject(state, {user: null});
        default:
            return state;
    }
    return state;
};

export default reducer;
