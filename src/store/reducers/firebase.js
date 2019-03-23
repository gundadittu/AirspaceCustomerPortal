import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { Mixpanel } from '../Mixpanel';

const initialState = { 
    firebase: null, 
    mixpanel: null 
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_UP_FIREBASE:
            let firebase = action.payload.firebase;
            return updateObject(state, {firebase: firebase, mixpanel: Mixpanel});
        default: 
            return state 
    }
}

export default reducer;