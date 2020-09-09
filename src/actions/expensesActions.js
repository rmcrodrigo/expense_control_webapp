import {
  ADD_EXPENSE_RQ,
  ADD_EXPENSE_SUCCESS,
  DEL_EXPENSE_RQ,
  DEL_EXPENSE_SUCCESS,
  EDIT_EXPENSE_RQ,
  EDIT_EXPENSE_SUCCESS,
  EXPENSES_ERROR,
  GET_ALL_EXPENSES_RQ,
  GET_ALL_EXPENSES_SUCCESS,
  GET_EXPENSE_BYID_RQ,
  GET_EXPENSE_BYID_SUCCESS,
  RESET_EXPENSE_ERROR,
  SET_SPINNER_VISIBILITY
} from './types';

import axios from '../utilities/axiosConfig';

import { handleRequestError } from '../utilities/util';

const url = '/expenses';

export const addExpenseRq = (expense, history, userToken) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    }
  };
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: ADD_EXPENSE_RQ });
    axios
      .post(url, expense, config)
      .then((response) => {
        if (handleRequestError(response, dispatch, expensesError)) {
          dispatch({
            type: ADD_EXPENSE_SUCCESS,
            payload: response.data.expense,
          });
          history.push('/expenses');
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, expensesError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const delExpenseRq = (id, userToken) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    }
  };
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: DEL_EXPENSE_RQ });
    axios
      .delete(`${url}/user/${id}`, config)
      .then((response) => {
        if (handleRequestError(response, dispatch, expensesError)) {
          dispatch({
            type: DEL_EXPENSE_SUCCESS,
            payload: id,
          });
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, expensesError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const editExpenseRq = (expense, history, userToken) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + userToken,
    }
  };
  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: EDIT_EXPENSE_RQ });
    axios
      .put(`${url}/user`, expense, config)
      .then((response) => {
        if (handleRequestError(response, dispatch, expensesError)) {
          dispatch({
            type: EDIT_EXPENSE_SUCCESS,
            payload: response.data.expense,
          });
          history.push('/expenses');
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, expensesError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

const expensesError = (error, dispatch) => {
  dispatch({
    type: EXPENSES_ERROR,
    payload: error,
  });
};

export const getAllExpensesRq = (userToken, from, to) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + userToken
    }
  };

  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: GET_ALL_EXPENSES_RQ });
    axios
      .get(`${url}/user/range/${from}/${to}`, config)
      .then((response) => {
        if (handleRequestError(response, dispatch, expensesError)) {
          dispatch({
            type: GET_ALL_EXPENSES_SUCCESS,
            payload: response.data.expenses,
          });
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, expensesError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const getExpenseById = (expenseId, userToken) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + userToken
    }
  };

  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({ type: GET_EXPENSE_BYID_RQ });
    axios
      .get(`${url}/user/${expenseId}`, config)
      .then((response) => {
        if (handleRequestError(response, dispatch, expensesError)) {
          dispatch({
            type: GET_EXPENSE_BYID_SUCCESS,
            payload: response.data.expense,
          });
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, expensesError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const resetExpenseError = () => {
  return {
    type: RESET_EXPENSE_ERROR,
  };
};
