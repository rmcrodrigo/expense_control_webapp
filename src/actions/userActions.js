import {
  GET_PROFILE_RQ,
  GET_PROFILE_SUCCESS,
  RESET_PASSWORD_RQ,
  RESET_PASSWORD_SUCCESS,
  RESET_USER_ERROR,
  SET_SPINNER_VISIBILITY,
  UPDATE_PASSWORD_RQ,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_RQ,
  UPDATE_PROFILE_SUCCESS,
  USER_ERROR
} from './types';
import axios from '../utilities/axiosConfig';

import { handleRequestError } from '../utilities/util';

const url = '/user';

export const getProfileRq = (userToken) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  };
  return dispatch => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true
    });
    dispatch({
      type: GET_PROFILE_RQ
    });
    axios.get(`${url}/get-profile`, options)
    .then(function(response) {
      if(handleRequestError(response, dispatch, userError)){
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: response.data.user
        });
      }
    })
    .catch(function(error) {
      handleRequestError(error, dispatch, userError);
    })
    .finally(function(){
      dispatch({
        type: SET_SPINNER_VISIBILITY,
        payload: false
      });
    })
  }
}

export const requestResetPassword = (email) => {
  axios.get('/request-reset-password/' + email);
};

export const resetPasswordRq = (password, token) => {
  return dispatch => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true
    });
    dispatch({
      type: RESET_PASSWORD_RQ
    });
    axios.put("/reset-password", {
      password,
      token
    })
    .then(function(response) {
      if(handleRequestError(response, dispatch, userError)) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        });
      }
    })
    .catch(function(error) {
      handleRequestError(error, dispatch, userError);
    })
    .finally(function() {
      dispatch({
        type: SET_SPINNER_VISIBILITY,
        payload: false
      })
    });
  }
}

export const updatePasswordRq = (data, token) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  return dispatch => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true
    });
    dispatch({
      type: UPDATE_PASSWORD_RQ
    });
    axios.put(`${url}/update-password`, data, options)
    .then(function(response) {
      if(handleRequestError(response, dispatch, userError)) {
        dispatch({
          type: UPDATE_PASSWORD_SUCCESS
        });
      }
    })
    .catch(function(error) {
      handleRequestError(error, dispatch, userError);
    }).finally(function() {
      dispatch({
        payload: false,
        type: SET_SPINNER_VISIBILITY
      });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    })
  }
}

export const updateProfileRq = (profile, userToken) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  };

  return dispatch => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true
    });
    dispatch({
      type: UPDATE_PROFILE_RQ
    });
    axios.put(`${url}/update-profile`, profile, options)
    .then(function(response) {
      if(handleRequestError(response, dispatch, userError)) {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS
        });
      }
    }).catch(function(error) {
      handleRequestError(error, dispatch, userError);
    }).finally(function() {
      dispatch({
        type: SET_SPINNER_VISIBILITY,
        payload: false
      });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }

}

const userError = (error) => ({
  type: USER_ERROR,
  payload: error
});

export const resetUserError = () => ({
  type: RESET_USER_ERROR
});