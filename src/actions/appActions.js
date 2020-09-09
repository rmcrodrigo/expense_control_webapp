import {SET_SPINNER_VISIBILITY} from "./types";

export const setSpinnerVisibility = (newValue) => {
  return {
    type: SET_SPINNER_VISIBILITY,
    payload: newValue
  };
};