import {
        RESET_ERROR, RESET_SUCCESS_MESSAGE,
        SIGNIN_RQ, SIGNIN_SUCCESS, SIGN_ERROR,
        SWITCH_FORMS,
        SET_USERDATA_FROM_COOKIE,
        SIGNUP_RQ,
        SIGNUP_SUCCESS
    } from './types';
import axios from 'axios';
import base64 from 'base-64';

const url = "http://localhost:8080/users";

export const resetError = () => {
    return {
        type: RESET_ERROR
    };
}

export const resetSuccessMsg = () => {
    return {
        type: RESET_SUCCESS_MESSAGE
    };
}

const signError = (error, dispatch) => {
    dispatch({
        type: SIGN_ERROR,
        payload: error.response.data
    })
}

export const signInRq = (email, password) => {
    
    let options = {
        method: 'GET',
        headers: {"Authorization": "Basic " + base64.encode(email + ":" + password)},
        url: url + "/login/"
    };

    return (dispatch) => {
        dispatch({
            type: SIGNIN_RQ        
        });
        axios(options)
            .then(response => {
                dispatch({
                    type: SIGNIN_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                signError(error, dispatch);
            });
    }
}

export const signUpRq = (user) => {
    return (dispatch) => {
        dispatch({type: SIGNUP_RQ});
        axios.post(url, user)
            .then(() => {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: "Registro exitoso"
                });
            })
            .catch(error => {
                signError(error, dispatch);
            });
    }
}

export const switchForms = (activeForm) => {
    const signData = {
        showLoginForm: false,
        showNewUserForm: false
    };

    signData["show" + activeForm + "Form"] = true;

    return {
        type: SWITCH_FORMS,
        payload: signData
    }
}

export const setUserDataFromCookie = (userData) => {
    return {
        type: SET_USERDATA_FROM_COOKIE,
        payload: userData
    }
}