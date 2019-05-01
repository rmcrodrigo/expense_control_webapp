import {
    ADD_EXPENSE_RQ, ADD_EXPENSE_SUCCESS,
    DEL_EXPENSE_RQ, DEL_EXPENSE_SUCCESS,
    EDIT_EXPENSE_RQ, EDIT_EXPENSE_SUCCESS, 
    EXPENSES_ERROR,
    GET_ALL_EXPENSES_RQ, GET_ALL_EXPENSES_SUCCESS,
    GET_EXPENSE_BYID_RQ, GET_EXPENSE_BYID_SUCCESS,
    RESET_EXPENSE_ERROR
} from './types';
import axios from 'axios';

const url = "http://localhost:8080/expenses/";

export const addExpenseRq = (expense, history) => {
    return (dispatch) => {
        dispatch({type: ADD_EXPENSE_RQ});
        axios.post(url, expense)
            .then(response => {
                dispatch({
                    type: ADD_EXPENSE_SUCCESS,
                    payload: response.data
                });
                history.push("/");
            })
            .catch(error => {
                expensesError(error, dispatch);
            })
    }
};

export const delExpenseRq = (id) => {
    return (dispatch) => {
        dispatch({type: DEL_EXPENSE_RQ});
        axios.delete(`${url}${id}/`)
            .then(() => {
                dispatch({
                    type: DEL_EXPENSE_SUCCESS,
                    payload: id
                });
            })
            .catch(error => {
                expensesError(error, dispatch);
            })
    }
};

export const editExpenseRq = (expense, history) => {
    return (dispatch) => {
        dispatch({type: EDIT_EXPENSE_RQ});
        axios.put(`${url}${expense.id}/`, expense)
            .then(response => {
                dispatch({
                    type: EDIT_EXPENSE_SUCCESS,
                    payload: response.data
                });
                history.push("/");
            })
            .catch(error => {
                expensesError(error, dispatch);
            })
    }
}

const expensesError = (error, dispatch) => {
    dispatch({
        type: EXPENSES_ERROR,
        payload: error.response.data
    });
}

export const getAllExpensesRq = (userId, from, to) => {
    return (dispatch) => {
        dispatch({type: GET_ALL_EXPENSES_RQ});
        axios.get(`${url}user/${userId}/range/${from}/${to}`)
            .then(response => {
                dispatch({
                    type: GET_ALL_EXPENSES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                expensesError(error, dispatch);
            })
    }
};

export const getExpenseById = (id) => {
    return (dispatch) => {
        dispatch({type: GET_EXPENSE_BYID_RQ});
        axios.get(`${url}${id}/`)
            .then(response => {
                dispatch({
                    type: GET_EXPENSE_BYID_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                expensesError(error);
            })
    }
}

export const resetExpenseError = () => {
    return {
        type: RESET_EXPENSE_ERROR
    }
}