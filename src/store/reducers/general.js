import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isLoading: false,
    error: null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_UP_USER_STARTED:
            return updateObject(state, {isLoading: true});
        case actionTypes.SET_UP_USER_SUCCESS:
            return updateObject(state, {isLoading: false, error: null});
        case actionTypes.SET_UP_USER_ERROR:
            const error = action.payload.error || null;
            return updateObject(state, {isLoading: false, error: error});
    }
    return state;
};

export default reducer;