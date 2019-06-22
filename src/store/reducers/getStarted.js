import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    step: 0,
    isLoading: false,
    isFinished: false,
    firstName: null,
    lastName: null,
    emailAddress: null,
    password: null,
    phoneNo: null,
    companyName: null,
    companyURL: null,
    userRole: null,
    streetAddr1: null,
    streetAddr2: null,
    zipCode: null,
    city: null,
    stateAddr: null,
    floorNo: null,
    suiteNo: null,
    squareFT: null,
    employeeNo: null,
    moveInDate: null,
    validEmail: null,
    // buildingContactName: null,
    // buildingContactRole: null,
    // buildingContactEmail: null,
    // buildingContactPhone: null,
    newServices: [],
    otherServicesDetails: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECK_VALID_EMAIL_FINISHED:
            const valid = action.payload.validEmail || false;
            return updateObject(state, { validEmail: valid });
        case actionTypes.CHANGE_GET_STARTED_STEP:
            const newStep = action.payload.newStep;
            return updateObject(state, { step: newStep })
        case actionTypes.UPDATE_GET_STARTED_DATA:
            const payload = action.payload;
            console.log("getStarted payload: "+JSON.stringify(payload));
            return updateObject(state, payload);
        case actionTypes.SUBMIT_GET_STARTED_DATA:
            return updateObject(state, { isLoading: true });
        case actionTypes.SUBMIT_GET_STARTED_DATA_FINISHED_SUCCESS:
            return updateObject(state, { isLoading: false, isFinished: true });
        case actionTypes.SUBMIT_GET_STARTED_DATA_FINISHED_ERROR:
            return updateObject(state, { isLoading: false, isFinished: false });
        default:
            return initialState;
    }
}

export default reducer; 