import {
  INCOME_ERROR,
  ADD_INCOME_RQ,
  ADD_INCOME_SUCCESS,
  DEL_INCOME_RQ,
  DEL_INCOME_SUCCESS,
  EDIT_INCOME_RQ,
  EDIT_INCOME_SUCCESS,
  GET_INCOME_BY_ID_RQ,
  GET_INCOME_BY_ID_SUCCESS,
  GET_USER_INCOMES_RQ,
  GET_USER_INCOMES_SUCCESS,
  RESET_INCOME_ERROR,
  SET_SPINNER_VISIBILITY,
} from '../actions/types';
import axios from '../utilities/axiosConfig';

import { handleRequestError } from '../utilities/util';

const url = '/incomes';

export const addIncomeRq = (income, history, userToken) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  };
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: ADD_INCOME_RQ });
    axios
      .post(url, income, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, incomeError)) {
          incomeSuccess(dispatch, ADD_INCOME_SUCCESS, response.data.income);
          history.push('/incomes');
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, incomeError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const delIncomeRq = (id, userToken) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  };
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: DEL_INCOME_RQ });
    axios
      .delete(`${url}/user/${id}`, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, incomeError))
          incomeSuccess(dispatch, DEL_INCOME_SUCCESS, id);
      })
      .catch((error) => {
        handleRequestError(error, dispatch, incomeError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const editIncomeRq = (income, history, userToken) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  };
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: EDIT_INCOME_RQ });
    axios
      .put(`${url}/user`, income, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, incomeError)) {
          incomeSuccess(dispatch, EDIT_INCOME_SUCCESS, response.data.income);
          history.push('/incomes');
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, incomeError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const getIncomeByIdRq = (id, userToken) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  };
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: GET_INCOME_BY_ID_RQ });
    axios
      .get(`${url}/user/${id}`, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, incomeError))
          incomeSuccess(
            dispatch,
            GET_INCOME_BY_ID_SUCCESS,
            response.data.income
          );
      })
      .catch((error) => {
        handleRequestError(error, dispatch, incomeError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const getUserIncomesRq = (userToken, from, to) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  };
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: GET_USER_INCOMES_RQ });
    axios
      .get(`${url}/user/range/${from}/${to}`, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, incomeError)) {
          incomeSuccess(
            dispatch,
            GET_USER_INCOMES_SUCCESS,
            response.data.incomes
          );
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, incomeError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

const incomeError = (error, dispatch) => {
  dispatch({
    type: INCOME_ERROR,
    payload: error,
  });
};

const incomeSuccess = (dispatch, type, data) => {
  dispatch({
    type: type,
    payload: data,
  });
};

export const resetIncomeErrors = () => {
  return {
    type: RESET_INCOME_ERROR,
  };
};
