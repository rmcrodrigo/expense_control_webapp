import {
    RESET_ERROR, RESET_SUCCESS_MESSAGE,
    SET_USERDATA_FROM_STORAGE,
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
    signErrors: null,
    signUpMsg: null,
    userData: {}
};

export default function(state = initialState, action) {
    let lState = null;
    switch(action.type) {
        case RESET_ERROR:
            lState = {
                ...state,
                signErrors: null
            };
            break;
        case RESET_SUCCESS_MESSAGE:
            lState = {
                ...state,
                signUpMsg: null
            };
            break;
        case SET_USERDATA_FROM_STORAGE:
            lState = {
                ...state,
                userData : action.payload
            };
            break;
        case SIGN_ERROR:
            lState = {
                ...state,
                signErrors: action.payload,
                userData: null
            };
            break;
        case SIGNIN_RQ: 
            lState = {
                ...state,
                signErrors: null,
                userData: null
            };
            break;
        case SIGNIN_SUCCESS:
            lState = {
                ...state,
                userData: action.payload
            };
            break;
        case SIGNUP_RQ:
            lState = {
                ...state,
                signErrors: null
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