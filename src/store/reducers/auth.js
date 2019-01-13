import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    user: null, 
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_UP_USER_SUCCESS:
            const user = action.payload.data || null;
            return updateObject(state, {user: user});
        case actionTypes.SET_UP_USER_ERROR:
            return updateObject(state, {user: null});
    }
    return state;
};

export default reducer;