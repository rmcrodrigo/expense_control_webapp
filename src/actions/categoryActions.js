import axios from 'axios';

import {
    CATEGORIES_ERROR,
    ADD_CATEGORY_RQ, ADD_CATEGORY_SUCCESS,
    DEL_CATEGORY_RQ, DEL_CATEGORY_SUCCESS,
    EDIT_CATEGORY_RQ, EDIT_CATEGORY_SUCCESS,
    GET_CATEGORY_BY_ID_RQ, GET_CATEGORY_BY_ID_SUCCESS,
    GET_USER_CATEGORIES_RQ, GET_USER_CATEGORIES_SUCCESS,
    RESET_CATEGORIES_ERROR
} from './types'

const url = "http://localhost:8080/categories/";

export const addCategoryRq = (category, history) => {
    return (dispatch) => {
        dispatch({
            type: ADD_CATEGORY_RQ
        });
        axios.post(url, category)
            .then(response => {
                dispatch({
                    type: ADD_CATEGORY_SUCCESS,
                    payload: response.data
                });
                history.push("/categories");
            })
            .catch(error => {
                categoryError(error, dispatch);
            });
    };
}

const categoryError = (error, dispatch) => {
    dispatch({
        type: CATEGORIES_ERROR,
        payload: error.response.data
    });
}

export const delCategoryRq = (id) => {
    return (dispatch) => {
        dispatch({
            type: DEL_CATEGORY_RQ
        });

        axios.delete(`${url}${id}/`)
            .then(() => {
                dispatch({
                    type: DEL_CATEGORY_SUCCESS,
                    payload: id
                });
            })
            .catch(error => {
                categoryError(error, dispatch);
            });
    }
}

export const editCategoryRq = (category, history) => {
    return (dispatch) => {
        dispatch({type: EDIT_CATEGORY_RQ});
        axios.put(`${url}${category.id}/`, category)
            .then(response => {
                dispatch({
                    type: EDIT_CATEGORY_SUCCESS,
                    payload: response.data
                });
                history.push("/categories");
            })
            .catch(error => {
                categoryError(error, dispatch);
            });
    }
}

export const getCategoryByIdRq = (categoryId) => {
    return (dispatch) => {
        dispatch({type: GET_CATEGORY_BY_ID_RQ});
        axios.get(`${url}${categoryId}/`)
            .then(response => {
                dispatch({
                    type: GET_CATEGORY_BY_ID_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                categoryError(error, dispatch);
            });
    }
}

export const getUserCategoriesRq = (userId, getUserCategoriesRq, from, to) => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_CATEGORIES_RQ
        });
        axios.get(`${url}user/${userId}`)
            .then(response => {
                dispatch({
                    type: GET_USER_CATEGORIES_SUCCESS,
                    payload: response.data
                });
                if(getUserCategoriesRq) {
                    getUserCategoriesRq(userId, from, to);
                }
            })
            .catch(error => {
                categoryError(error, dispatch);
            })
    };
}

export const resetCategoriesError = () => {
    return {
        type: RESET_CATEGORIES_ERROR
    }
}