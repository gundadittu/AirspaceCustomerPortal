export const SET_UP_FIREBASE = "SET_UP_FIREBASE";

export const START_HOME = 'START_HOME'; // used in redux-saga

export const CLEAR_REDUX_STATE = "CLEAR_REDUX_STATE";

export const SIGN_IN_USER = 'SIGN_IN_USER'; // used in redux-saga
export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER_SUCCESS';
export const SIGN_IN_USER_ERROR = 'SIGN_IN_USER_ERROR';

export const SIGN_OUT_USER = 'SIGN_OUT_USER'; // used in redux-saga
export const SIGN_OUT_USER_SUCCESS = 'SIGN_OUT_USER_SUCCESS';
export const SIGN_OUT_USER_ERROR = 'SIGN_OUT_USER_ERROR';

export const SET_UP_USER = 'SET_UP_USER'; // used in redux-saga
export const SET_UP_USER_SUCCESS = 'SET_UP_USER_SUCCESS';
export const SET_UP_USER_ERROR = 'SET_UP_USER_ERROR';

export const LOAD_ADMIN_ANNOUNCEMENTS = 'LOAD_ADMIN_ANNOUNCEMENTS';
export const LOAD_ADMIN_ANNOUNCEMENTS_SUCCESS = 'LOAD_ADMIN_ANNOUNCEMENTS_SUCCESS';
export const LOAD_ADMIN_ANNOUNCEMENTS_ERROR = 'LOAD_ADMIN_ANNOUNCEMENTS_ERROR';

export const POST_ADMIN_ANNOUNCEMENT = 'POST_ADMIN_ANNOUNCEMENT';
export const POST_ADMIN_ANNOUNCEMENT_SUCCESS = 'POST_ADMIN_ANNOUNCEMENT_SUCCESS';
export const POST_ADMIN_ANNOUNCEMENT_ERROR = 'POST_ADMIN_ANNOUNCEMENT_ERROR';

export const LOAD_OFFICE_USERS = 'LOAD_OFFICE_USER';
export const LOAD_OFFICE_USERS_SUCCESS = 'LOAD_OFFICE_USER_SUCCESS';
export const LOAD_OFFICE_USERS_ERROR = 'LOAD_OFFICE_USER_ERROR';

export const LOAD_CONFERENCE_ROOMS = 'LOAD_CONFERENCE_ROOM';
export const LOAD_CONFERENCE_ROOMS_SUCCESS = 'LOAD_CONFERENCE_ROOM_SUCCESS';
export const LOAD_CONFERENCE_ROOMS_ERROR = 'LOAD_CONFERENCE_ROOM_ERROR';

export const LOAD_HOT_DESKS = 'LOAD_HOT_DESKS';
export const LOAD_HOT_DESKS_SUCCESS = 'LOAD_HOT_DESKS_SUCCESS';
export const LOAD_HOT_DESKS_ERROR = 'LOAD_HOT_DESKS_ERROR';

export const LOAD_SERVICE_REQUESTS = 'LOAD_SERVICE_REQUESTS';
export const LOAD_SERVICE_REQUESTS_SUCCESS = 'LOAD_SERVICE_REQUESTS_SUCCESS';
export const LOAD_SERVICE_REQUESTS_ERROR = 'LOAD_SERVICE_REQUESTS_ERROR';

export const LOAD_SERVICE_REQUESTS_EMAILS = 'LOAD_SERVICE_REQUESTS_EMAILS';
export const LOAD_SERVICE_REQUESTS_EMAILS_SUCCESS = 'LOAD_SERVICE_REQUESTS_EMAILS_SUCCESS';
export const LOAD_SERVICE_REQUESTS_EMAILS_ERROR = 'LOAD_SERVICE_REQUESTS_EMAILS_ERROR';

export const EDIT_SERVICE_REQUESTS_EMAILS = 'EDIT_SERVICE_REQUESTS_EMAILS';
export const EDIT_SERVICE_REQUESTS_EMAILS_SUCCESS = 'EDIT_SERVICE_REQUESTS_EMAILS_SUCCESS';
export const EDIT_SERVICE_REQUESTS_EMAILS_ERROR = 'EDIT_SERVICE_REQUESTS_EMAILS_ERROR';

export const GUEST_SELF_CHECK_IN_STATUS = 'GUEST_SELF_CHECK_IN_STATUS';
export const GUEST_SELF_CHECK_IN_STATUS_SUCCESS = 'GUEST_SELF_CHECK_IN_STATUS_SUCCESS';
export const GUEST_SELF_CHECK_IN_STATUS_ERROR = 'GUEST_SELF_CHECK_IN_STATUS_ERROR';

export const GUEST_CREATE_PASSWORD = 'GUEST_CREATE_PASSWORD';
export const GUEST_CREATE_PASSWORD_SUCCESS = 'GUEST_CREATE_PASSWORD_SUCCESS';
export const GUEST_CREATE_PASSWORD_ERROR = 'GUEST_CREATE_PASSWORD_ERROR';

export const EDIT_SERVICE_REQUESTS_STATUS = 'EDIT_SERVICE_REQUESTS_STATUS';
export const EDIT_SERVICE_REQUESTS_STATUS_SUCCESS = 'EDIT_SERVICE_REQUESTS_STATUS_SUCCESS';
export const EDIT_SERVICE_REQUESTS_STATUS_ERROR = 'EDIT_SERVICE_REQUESTS_STATUS_ERROR';

export const EDIT_SERVICE_REQUESTS_STATUS_EMAIL = 'EDIT_SERVICE_REQUESTS_STATUS_EMAIL';
export const EDIT_SERVICE_REQUESTS_STATUS_EMAIL_SUCCESS = 'EDIT_SERVICE_REQUESTS_STATUS_EMAIL_SUCCESS';
export const EDIT_SERVICE_REQUESTS_STATUS_EMAIL_ERROR = 'EDIT_SERVICE_REQUESTS_STATUS_EMAIL_ERROR';

export const LOAD_REGISTERED_GUESTS = 'LOAD_REGISTERED_GUESTS';
export const LOAD_REGISTERED_GUESTS_SUCCESS = 'LOAD_REGISTERED_GUESTS_SUCCESS';
export const LOAD_REGISTERED_GUESTS_ERROR = 'LOAD_REGISTERED_GUESTS_ERROR';

export const EDIT_REGISTERED_GUESTS_STATUS = 'EDIT_REGISTERED_GUESTS_STATUS';
export const EDIT_REGISTERED_GUESTS_STATUS_SUCCESS = 'EDIT_REGISTERED_GUESTS_STATUS_SUCCESS';
export const EDIT_REGISTERED_GUESTS_STATUS_ERROR = 'EDIT_REGISTERED_GUESTS_STATUS_ERROR';

export const LOAD_EVENTS = 'LOAD_EVENTS';
export const LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS';
export const LOAD_EVENTS_ERROR = 'LOAD_EVENTS_ERROR';

export const CHANGE_PAGE = 'CHANGE_PAGE';

export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS';
export const LOAD_NOTIFICATIONS_ERROR = 'LOAD_NOTIFICATIONS_ERROR';

export const CREATE_USER_FOR_OFFICEADMIN = 'CREATE_USER_FOR_OFFICEADMIN';
export const CREATE_USER_FOR_OFFICEADMIN_FINISHED = 'CREATE_USER_FOR_OFFICEADMIN_FINISHED';

export const REMOVE_OFFICE_USER = 'REMOVE_OFFICE_USER';
export const REMOVE_OFFICE_USER_FINISHED = 'REMOVE_OFFICE_USER_FINISHED';

export const EDIT_OFFICE_USER = 'EDIT_OFFICE_USER';
export const EDIT_OFFICE_USER_FINISHED = 'EDIT_OFFICE_USER_FINISHED';

export const ADD_CONF_ROOM = 'ADD_CONF_ROOM';
export const ADD_CONF_ROOM_FINISHED = 'ADD_CONF_ROOM_FINISHED';

export const EDIT_CONF_ROOM = 'EDIT_CONF_ROOM';
export const EDIT_CONF_ROOM_FINISHED = 'EDIT_CONF_ROOM_FINISHED';

export const ADD_HOT_DESK = 'ADD_HOT_DESK';
export const ADD_HOT_DESK_FINISHED = 'ADD_HOT_DESK_FINISHED';

export const EDIT_HOT_DESK = 'EDIT_HOT_DESK';
export const EDIT_HOT_DESK_FINISHED = 'EDIT_HOT_DESK_FINISHED';

export const LOAD_SPACE_INFO = 'LOAD_SPACE_INFO';
export const LOAD_SPACE_INFO_FINISHED = 'LOAD_SPACE_INFO_FINISHED';
export const LOAD_SPACE_INFO_FINISHED_ERROR = 'LOAD_SPACE_INFO_FINISHED_ERROR';

export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_EVENT_FINISHED = 'CREATE_EVENT_FINISHED';

export const EDIT_EVENT = 'EDIT_EVENT';
export const EDIT_EVENT_FINISHED = 'EDIT_EVENT_FINISHED';

export const CHANGE_GET_STARTED_STEP = "CHANGE_GET_STARTED_STEP";

export const UPDATE_GET_STARTED_DATA = "UPDATE_GET_STARTED_DATA";

export const SUBMIT_GET_STARTED_DATA = "SUBMIT_GET_STARTED_DATA";
export const SUBMIT_GET_STARTED_DATA_FINISHED_SUCCESS = "SUBMIT_GET_STARTED_DATA_FINISHED_SUCCESS";
export const SUBMIT_GET_STARTED_DATA_FINISHED_ERROR = "SUBMIT_GET_STARTED_DATA_FINISHED_ERROR";

export const STORE_ALEXA_REDIRECT = "STORE_ALEXA_REDIRECT";

export const GET_ALL_INVOICES_FOR_OFFICE = "GET_ALL_INVOICES_FOR_OFFICE";
export const GET_ALL_INVOICES_FOR_OFFICE_FINISHED = "GET_ALL_INVOICES_FOR_OFFICE_FINISHED";

export const GET_SERVICE_PLAN_FOR_OFFICE = "GET_SERVICE_PLAN_FOR_OFFICE";
export const GET_SERVICE_PLAN_FOR_OFFICE_FINISHED = "GET_SERVICE_PLAN_FOR_OFFICE_FINISHED";
export const GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD = "GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD";


export const LOAD_EM_INFO = "LOAD_EM_INFO"; 
export const LOAD_EM_INFO_FINISHED = "LOAD_EM_INFO_FINISHED"; 

export const LOAD_OFFICE_PROFILE = "LOAD_OFFICE_PROFILE";
export const LOAD_OFFICE_PROFILE_FINISHED = "LOAD_OFFICE_PROFILE_FINISHED";

export const UPDATE_OFFICE_PROFILE = "UPDATE_OFFICE_PROFILE";
export const UPDATE_OFFICE_PROFILE_FINISHED = "UPDATE_OFFICE_PROFILE_FINISHED";

export const CHECK_VALID_EMAIL = "CHECK_VALID_EMAIL";
export const CHECK_VALID_EMAIL_FINISHED = "CHECK_VALID_EMAIL_FINISHED";

export const ADD_REQUEST_SERVICE = "ADD_REQUEST_SERVICE";
export const ADD_REQUEST_SERVICE_FINISHED = "ADD_REQUEST_SERVICE_FINISHED";

export const SUBMIT_SERVICE_TICKET = "SUBMIT_SERVICE_TICKET"; 
export const SUBMIT_SERVICE_TICKET_FINISHED = "SUBMIT_SERVICE_TICKET_FINISHED";

export const ACCEPT_SERVICE_OPTION = "ACCEPT_SERVICE_OPTION";
export const ACCEPT_SERVICE_OPTION_FINISHED = "ACCEPT_SERVICE_OPTION_FINISHED";

export const PENDING_SERVICE_OPTION = "PENDING_SERVICE_OPTION";
export const PENDING_SERVICE_OPTION_FINISHED = "PENDING_SERVICE_OPTION_FINISHED";

export const CONFIRM_PENDING_PACKAGE = "CONFIRM_PENDING_PACKAGE"
export const CONFIRM_PENDING_PACKAGE_FINISHED = "CONFIRM_PENDING_PACKAGE_FINISHED";

export const REJECT_PENDING_PACKAGE = "REJECT_PENDING_PACKAGE"
export const REJECT_PENDING_PACKAGE_FINISHED = "REJECT_PENDING_PACKAGE_FINISHED";

export const SEND_PASSWORD_RESET = "SEND_PASSWORD_RESET"
export const SEND_PASSWORD_RESET_FINISHED = "SEND_PASSWORD_RESET_FINISHED"


export const LOAD_BUILDING_OFFICE_REPORT = "LOAD_BUILDING_OFFICE_REPORT"
export const LOAD_BUILDING_OFFICE_REPORT_FINISHED = "LOAD_BUILDING_OFFICE_REPORT_FINISHED"

export const LOAD_OFFICE_REPORT = "LOAD_OFFICE_REPORT"
export const LOAD_OFFICE_REPORT_FINISHED = "LOAD_OFFICE_REPORT_FINISHED"

// export const ACCEPT_SERVICE_ADDON = "ACCEPT_SERVICE_ADDON";
// export const ACCEPT_SERVICE_ADDON_FINISHED = "ACCEPT_SERVICE_ADDON_FINISHED";

// export const PENDING_SERVICE_ADDON = "PENDING_SERVICE_ADDON";
// export const PENDING_SERVICE_ADDON_FINISHED = "PENDING_SERVICE_ADDON_FINISHED";