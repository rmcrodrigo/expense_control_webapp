import {
  RESET_ERROR,
  RESET_SUCCESS_MESSAGE,
  SET_SPINNER_VISIBILITY,
  SET_USERDATA_FROM_OAUTH,
  SET_USERDATA_FROM_STORAGE,
  SIGN_ERROR,
  SIGNIN_RQ,
  SIGNIN_SUCCESS,
  SIGNUP_RQ
  // SIGNUP_SUCCESS
} from './types';
import axios from '../utilities/axiosConfig';
import base64 from 'base-64';

import { handleRequestError } from '../utilities/util';

export const confirmAccount = (token) => {
  return dispatch => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true
    });
    axios.get('/confirm-account/' + token)
      .then(function (response) {
        handleRequestError(response, dispatch, signError);
      }).catch(function (error) {
        handleRequestError(error, dispatch, signError);
      }).finally(function () {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  }
}

export const githubSign = (code, history) => {

  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });

    axios.get("/signin/oauth/github/" + code)
      .then(function (response) {
        if (handleRequestError(response, dispatch, signError)) {
          if (response.data.code === 119) {
            dispatch(setUserDataFromOAuth({
              code: response.data.code,
              birthday: response.data.birthday,
              email: response.data.email,
              name: response.data.name
            }));
          } else {
            dispatch({
              type: SIGNIN_SUCCESS,
              payload: {
                email: response.data.email,
                name: response.data.name,
                token: response.data.token
              },
            });
            history.push("/signin");
          }
        } else {
          history.push("/signin");
        }
      }).catch(function (error) {
        handleRequestError(error, dispatch, signError);
      }).finally(function () {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  }
}

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

export const setUserDataFromOAuth = (userData) => {
  return {
    type: SET_USERDATA_FROM_OAUTH,
    payload: userData
  };
}

const signError = error => ({
  type: SIGN_ERROR,
  payload: error,
});

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

export const signUpRq = (user, history) => {
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
          /* dispatch({
            type: SIGNUP_SUCCESS,
            payload: 'You have registered successfully',
          }); */
          history.push("/success-signin");
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
