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
  RESET_CATEGORIES_ERROR,
  GET_USER_CATEGORIES_BY_TYPE_RQ,
  GET_USER_CATEGORIES_BY_TYPE_SUCCESS,
  RESET_CATEGORIES,
} from '../actions/types';

const initialState = {
  categories: null,
  category: null,
  categoryErrors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY_RQ:
    case DEL_CATEGORY_RQ:
    case EDIT_CATEGORY_RQ:
    case RESET_CATEGORIES_ERROR:
      return {
        ...state,
        categoryErrors: null,
      };
    case ADD_CATEGORY_SUCCESS:
    case EDIT_CATEGORY_SUCCESS:
    case GET_CATEGORY_BY_ID_RQ:
      return {
        ...state,
        category: null,
        categoryErrors: null,
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        category: null,
        categoryErrors: action.payload,
      };
    case DEL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        categoryErrors: null,
      };
    case GET_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        category: action.payload,
        categoryErrors: null,
      };
    case GET_USER_CATEGORIES_RQ:
    case GET_USER_CATEGORIES_BY_TYPE_RQ:
      return {
        ...state,
        categories: null,
        category: null,
        categoryErrors: null,
      };
    case GET_USER_CATEGORIES_SUCCESS:
    case GET_USER_CATEGORIES_BY_TYPE_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        categoryErrors: null,
      };
    case RESET_CATEGORIES: 
      return {
        ...state,
        categories: null,
      };
    default:
      return state;
  }
}
