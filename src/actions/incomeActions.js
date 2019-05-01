import {
    INCOME_ERROR,
    ADD_INCOME_RQ, ADD_INCOME_SUCCESS,
    DEL_INCOME_RQ, DEL_INCOME_SUCCESS,
    EDIT_INCOME_RQ, EDIT_INCOME_SUCCESS,
    GET_INCOME_BY_ID_RQ, GET_INCOME_BY_ID_SUCCESS,
    GET_USER_INCOME_RQ, GET_USER_INCOME_SUCCESS,
    RESET_INCOME_ERROR
} from '../actions/types';
import axios from 'axios';

const url = "http://localhost:8080/income/";

export const addIncomeRq = (income, history) => {
    
    return(dispatch) => {
        dispatch({type: ADD_INCOME_RQ});
        axios.post(url, income)
            .then(response => {
                incomeSuccess(dispatch, ADD_INCOME_SUCCESS, response.data);
                history.push("/income");
            })
            .catch(error => {
                incomeError(dispatch, error);
            });
    }
}

export const delIncomeRq = (id) => {
    return(dispatch) => {
        dispatch({type: DEL_INCOME_RQ});
        axios.delete(`${url}${id}`)
            .then(response => {
                incomeSuccess(dispatch, DEL_INCOME_SUCCESS, id);
            })
            .catch(error => {
                incomeError(dispatch, error);
            });
    }
}

export const editIncomeRq = (income, history) => {
    return(dispatch) => {
        dispatch({type: EDIT_INCOME_RQ});
        axios.put(`${url}${income.id}`, income)
            .then(response => {
                incomeSuccess(dispatch, EDIT_INCOME_SUCCESS, response.data);
                history.push("/income");
            })
            .catch(error => {
                incomeError(dispatch, error);
            });
    }
}

export const getIncomeByIdRq = (id) => {
    return(dispatch) => {
        dispatch({type: GET_INCOME_BY_ID_RQ});
        axios.get(`${url}${id}`)
            .then(response => {
                incomeSuccess(dispatch, GET_INCOME_BY_ID_SUCCESS, response.data);
            })
            .catch(error => {
                incomeError(dispatch, error);
            });
    }
}

export const getUserIncomeRq = (userId, from, to) => {
    return(dispatch) => {
        dispatch({type: GET_USER_INCOME_RQ});
        axios.get(`${url}user/${userId}/range/${from}/${to}`)
            .then(response => {
                incomeSuccess(dispatch, GET_USER_INCOME_SUCCESS, response.data);
            })
            .catch(error => {
                incomeError(dispatch, error);
            });
    }
}

const incomeError = (dispatch, error) => {
    dispatch({
        type: INCOME_ERROR,
        payload: error.response.data
    });
}

const incomeSuccess = (dispatch, type, data) => {
    dispatch({
        type: type,
        payload: data
    });
}

export const resetIncomeErrors = () => {
    return {
        type: RESET_INCOME_ERROR
    }
}