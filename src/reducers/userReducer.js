import {
  GET_PROFILE_RQ,
  GET_PROFILE_SUCCESS,
  USER_ERROR
} from '../actions/types';

const initialState = {
  profile: null,
  userErrors: null
}

export default function (state = initialState, action) {
  switch(action.type) {
    case GET_PROFILE_RQ:
      return {
        ...state,
        profile: null,
        userErrors: null
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        userErrors: null,
      }
    case USER_ERROR:
      return {
        ...state,
        profile: null,
        userErrors: action.payload
      }
    default: return state;
  }
}