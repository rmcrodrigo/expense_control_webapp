import {SET_SPINNER_VISIBILITY} from '../actions/types';

const initialState = {
  spinnerVisibility: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SPINNER_VISIBILITY:
      return {
        ...state,
        spinnerVisibility: action.payload
      }
    default: return state;
  }
}