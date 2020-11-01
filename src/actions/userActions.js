import {
  GET_PROFILE_RQ,
  GET_PROFILE_SUCCESS,
  SET_SPINNER_VISIBILITY,
  USER_ERROR
} from './types';
import axios from '../utilities/axiosConfig';

import { handleRequestError } from '../utilities/util';

export const getProfile = (userToken) => {
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
    axios.get('/get-profile', options)
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

const userError = (error) => ({
  type: USER_ERROR,
  payload: error
});