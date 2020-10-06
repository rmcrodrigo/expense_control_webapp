import {
  RESET_ERROR,
  RESET_SUCCESS_MESSAGE,
  SIGNIN_RQ,
  SIGNIN_SUCCESS,
  SIGN_ERROR,
  SWITCH_FORMS,
  SET_SPINNER_VISIBILITY,
  SET_USERDATA_FROM_STORAGE,
  SIGNUP_RQ,
  SIGNUP_SUCCESS
} from './types';
import axios from '../utilities/axiosConfig';
import base64 from 'base-64';

import {handleRequestError} from '../utilities/util';

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

export const resetSuccessMsg = () => {
  return {
    type: RESET_SUCCESS_MESSAGE,
  };
};

export const setUserDataFromStorage = (userData) => {
  return {
    type: SET_USERDATA_FROM_STORAGE,
    payload: userData,
  };
};

const signError = (error, dispatch) => {
  dispatch({
    type: SIGN_ERROR,
    payload: error,
  });
};

export const signInRq = (email, password) => {
  let options = {
    headers: {
      Authorization: 'Basic ' + base64.encode(email + ':' + password),
      'Access-Control-Allow-Origin': '*',
    }
  };

  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({
      type: SIGNIN_RQ,
    });
    axios
      .get('/signin', options)
      .then((response) => {
        if (handleRequestError(response, dispatch, signError)) {
          dispatch({
            type: SIGNIN_SUCCESS,
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        handleRequestError(error, dispatch, signError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const signUpRq = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: SIGNUP_RQ });
    axios
      .post('/signup', user)
      .then((response) => {
        if (handleRequestError(response, dispatch, signError)) {
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: 'You have registered successfully',
          });
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, signError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const switchForms = (activeForm) => {
  const signData = {
    showLoginForm: false,
    showNewUserForm: false,
  };

  signData['show' + activeForm + 'Form'] = true;

  return {
    type: SWITCH_FORMS,
    payload: signData,
  };
};
