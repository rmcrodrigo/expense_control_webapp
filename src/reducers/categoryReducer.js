import {
    CATEGORIES_ERROR,
    ADD_CATEGORY_RQ, ADD_CATEGORY_SUCCESS,
    DEL_CATEGORY_RQ, DEL_CATEGORY_SUCCESS,
    EDIT_CATEGORY_RQ, EDIT_CATEGORY_SUCCESS,
    GET_CATEGORY_BY_ID_RQ, GET_CATEGORY_BY_ID_SUCCESS,
    GET_USER_CATEGORIES_RQ, GET_USER_CATEGORIES_SUCCESS,
    RESET_CATEGORIES_ERROR
} from '../actions/types';

const initialState = {
    categories: [],
    category: {},
    fetchedCategories: false,
    fetchingCategories: false,
    fetchingCategory: false,
    categoryErrors: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_CATEGORY_RQ: {
            return {
                ...state,
                categoryErrors:null
            }
        }
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.concat(action.payload),
                fetchedCategories: false,
                fetchingCategories: false
            }
        case CATEGORIES_ERROR:
            return {
                ...state,
                categoryErrors: action.payload,
                fetchingCategories: false
            }
        case DEL_CATEGORY_RQ:
            return {
                ...state,
                categoryErrors: null
            }
        case DEL_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload),
                fetchedCategories: false,
                fetchingCategories: false
            }
        case EDIT_CATEGORY_RQ:
            return {
                ...state,
                categoryErrors: null
            }
        case EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(expense => 
                                    expense.id === action.payload.id
                                    ? expense = action.payload
                                    : expense),
                fetchedCategories: false,
                fetchingCategories: false
            }
        case GET_CATEGORY_BY_ID_RQ:
            return {
                ...state,
                categoryErrors: null,
                fetchingCategory: true
            }
        case GET_CATEGORY_BY_ID_SUCCESS:
            return {
                ...state,
                category: action.payload,
                fetchingCategory: false
            }
        case GET_USER_CATEGORIES_RQ:
            return {
                ...state,
                categoryErrors: null,
                fetchedCategories: false,
                fetchingCategories: true
            }
        case GET_USER_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                fetchedCategories: true,
                fetchingCategories: false
            }
        case RESET_CATEGORIES_ERROR:
            return {
                ...state,
                categoryErrors: null
            }
        default:
            return state;
    }
}