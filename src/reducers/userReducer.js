import {
  GET_PROFILE_RQ,
  GET_PROFILE_SUCCESS,
  RESET_PASSWORD_RQ,
  RESET_PASSWORD_SUCCESS,
  RESET_USER_ERROR,
  UPDATE_PASSWORD_RQ,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_RQ,
  UPDATE_PROFILE_SUCCESS,
  USER_ERROR
} from '../actions/types';

const initialState = {
  profile: null,
  successRq: false,
  updateProfileRqFlag: false,
  updatePasswordRqFlag: false,
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
    case RESET_PASSWORD_RQ:
      return {
        ...state,
        userErrors: null,
        successRq: false
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        successRq: true,
        userErrors: null
      }
    case RESET_USER_ERROR:
      return {
        ...state,
        userErrors: null
      }
    case UPDATE_PROFILE_RQ:
      return {
        ...state,
        updateProfileRqFlag: null,
        userErrors: null
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileRqFlag: true
      }
    case UPDATE_PASSWORD_RQ: 
      return {
        ...state,
        updatePasswordRqFlag: false,
        userErrors: null
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordRqFlag: true,
        userErrors: null
      }
      case USER_ERROR:
        return {
          ...state,
          profile: null,
          updateProfileRqFlag: false,
          userErrors: action.payload
        }
    default: return state;
  }
}