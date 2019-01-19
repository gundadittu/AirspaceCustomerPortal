import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    currentOfficeUID: null,
    userList: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOAD_OFFICE_USERS_SUCCESS:
            // properly update state here 
            const userList = action.payload.userList || null;
            return updateObject(state, {userList: userList});
    }
    return state;
};

export default reducer;