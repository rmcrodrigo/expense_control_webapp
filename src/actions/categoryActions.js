import axios from '../utilities/axiosConfig';

import {
  CATEGORIES_ERROR,
  ADD_CATEGORY_RQ,
  ADD_CATEGORY_SUCCESS,
  DEL_CATEGORY_RQ,
  DEL_CATEGORY_SUCCESS,
  EDIT_CATEGORY_RQ,
  EDIT_CATEGORY_SUCCESS,
  GET_CATEGORY_BY_ID_RQ,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_USER_CATEGORIES_RQ,
  GET_USER_CATEGORIES_SUCCESS,
  GET_USER_CATEGORIES_BY_TYPE_RQ,
  GET_USER_CATEGORIES_BY_TYPE_SUCCESS,
  RESET_CATEGORIES,
  RESET_CATEGORIES_ERROR,
  SET_SPINNER_VISIBILITY,
} from './types';

import { handleRequestError } from '../utilities/util';

const url = '/categories';

export const addCategoryRq = (category, history, userToken) => {
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
    dispatch({
      type: ADD_CATEGORY_RQ,
    });
    axios
      .post(url, category, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, categoryError)) {
          dispatch({
            type: ADD_CATEGORY_SUCCESS,
            payload: response.data.category,
          });
          history.push('/categories');
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, categoryError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

const categoryError = (error, dispatch) => {
  dispatch({
    type: CATEGORIES_ERROR,
    payload: error,
  });
};

export const delCategoryRq = (id, userToken) => {
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
    dispatch({
      type: DEL_CATEGORY_RQ,
    });
    axios
      .delete(`${url}/user/${id}`, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, categoryError)) {
          dispatch({
            type: DEL_CATEGORY_SUCCESS,
            payload: id,
          });
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, categoryError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const editCategoryRq = (category, history, userToken) => {
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
    dispatch({ type: EDIT_CATEGORY_RQ });
    axios
      .put(`${url}/user`, category, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, categoryError)) {
          dispatch({
            type: EDIT_CATEGORY_SUCCESS,
            payload: response.data.category,
          });
          history.push('/categories');
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, categoryError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const getCategoryByIdRq = (categoryId, userToken) => {
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
    dispatch({ type: GET_CATEGORY_BY_ID_RQ });
    axios
      .get(`${url}/user/${categoryId}`, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, categoryError)) {
          dispatch({
            type: GET_CATEGORY_BY_ID_SUCCESS,
            payload: response.data.category,
          });
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, categoryError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const getUserCategoriesRq = (userToken) => {
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
    dispatch({
      type: GET_USER_CATEGORIES_RQ,
    });
    axios
      .get(`${url}/user`, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, categoryError)) {
          dispatch({
            type: GET_USER_CATEGORIES_SUCCESS,
            payload: response.data.categories,
          });
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, categoryError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const getUserCategoriesByTypeRq = (categoryType, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  return (dispatch) => {
    dispatch({
      type: SET_SPINNER_VISIBILITY,
      payload: true,
    });
    dispatch({
      type: GET_USER_CATEGORIES_BY_TYPE_RQ,
    });
    axios
      .get(`${url}/user/type/${categoryType}`, options)
      .then((response) => {
        if (handleRequestError(response, dispatch, categoryError)) {
          dispatch({
            type: GET_USER_CATEGORIES_BY_TYPE_SUCCESS,
            payload: response.data.categories,
          });
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch, categoryError);
      })
      .finally(() => {
        dispatch({
          type: SET_SPINNER_VISIBILITY,
          payload: false,
        });
      });
  };
};

export const resetCategoriesError = () => {
  return {
    type: RESET_CATEGORIES_ERROR,
  };
};

export const resetCategories = () => {
  return (dispatch) =>
    dispatch({
      type: RESET_CATEGORIES,
    });
};
