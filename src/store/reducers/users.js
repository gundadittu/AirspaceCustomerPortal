import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {something: true};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INCREMENT:
            return updateObject(state, {});
    }
    return state;
};

export default reducer;