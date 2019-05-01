import {
    RESET_ERROR, RESET_SUCCESS_MESSAGE,
    SET_USERDATA_FROM_COOKIE,
    SIGN_ERROR,
    SIGNIN_RQ, SIGNIN_SUCCESS,
    SIGNUP_RQ, SIGNUP_SUCCESS,
    SWITCH_FORMS
} from '../actions/types';

// initialState
const initialState = {
    signData: {
        showLoginForm: true,
        showNewUserForm: false
    },
    signedIn: false,
    signError: null,
    signUpMsg: null,
    userData: {},
    userId: 0
};

export default function(state = initialState, action) {
    let lState = null;
    switch(action.type) {
        case RESET_ERROR:
            lState = {
                ...state,
                signError: null
            };
            break;
        case RESET_SUCCESS_MESSAGE:
            lState = {
                ...state,
                signUpMsg: null
            };
            break;
        case SET_USERDATA_FROM_COOKIE:
            lState = {
                ...state,
                userData : action.payload,
                userId: action.payload.id
            };
            break;
        case SIGN_ERROR:
            lState = {
                ...state,
                signError: action.payload,
                signedIn: false
            };
            break;
        case SIGNIN_RQ: 
            lState = {
                ...state,
                signError: null,
                signedIn: false
            };
            break;
        case SIGNIN_SUCCESS:
            lState = {
                ...state,
                signedIn: true,
                userData: action.payload,
                userId: action.payload.id
            };
            break;
        case SIGNUP_RQ:
            lState = {
                ...state,
                signError: null
            };
            break;
        case SIGNUP_SUCCESS:
            lState = {
                ...state,
                signData: {
                    showLoginForm: true,
                    showNewUserForm: false
                },
                signUpMsg: action.payload
            };
            break;
        case SWITCH_FORMS:
            lState = {
                ...state,
                signData: action.payload
            };
            break;
        default: lState = state;
    }
    return lState;
}