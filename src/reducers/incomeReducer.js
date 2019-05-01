import {
    INCOME_ERROR,
    ADD_INCOME_RQ, ADD_INCOME_SUCCESS,
    DEL_INCOME_RQ, DEL_INCOME_SUCCESS,
    EDIT_INCOME_RQ, EDIT_INCOME_SUCCESS,
    GET_INCOME_BY_ID_RQ, GET_INCOME_BY_ID_SUCCESS,
    GET_USER_INCOME_RQ, GET_USER_INCOME_SUCCESS,
    RESET_INCOME_ERROR
} from '../actions/types';

const initialState = {
    fetchedIncome: false,
    fetchedIncomeList: false,
    fetchingIncome: false,
    fetchingIncomeList: false,
    income: null,
    incomeErrors: null,
    incomeList: []
}

export default function(state = initialState, action){
    switch(action.type){
        case ADD_INCOME_RQ:
            return {
                ...state,
                incomeErrors: null
            };
        case ADD_INCOME_SUCCESS:
            return {
                ...state,
                fetchedIncomeList: false,
                fetchingIncomeList: false,
                incomeList: state.incomeList.concat(action.payload)
            };
        case DEL_INCOME_RQ:
            return {
                ...state,
                incomeErrors: null
            }
        case DEL_INCOME_SUCCESS:
            return {
                ...state,
                incomeList: state.incomeList.filter(income => income.id !== action.payload)
            }
        case EDIT_INCOME_RQ:
            return {
                ...state,
                incomeErrors: null
            }
        case EDIT_INCOME_SUCCESS:
            return {
                ...state,
                fetchedIncomeList: false,
                fetchingIncomeList: false,
                incomeList: state.incomeList.map(income => income.id === action.payload.id
                                        ? income = action.payload
                                        : income)
            }
        case GET_INCOME_BY_ID_RQ:
            return {
                ...state,
                fetchedIncome: false,
                fetchingIncome: true,
                incomeErrors: null
            }
        case GET_INCOME_BY_ID_SUCCESS:
            return {
                ...state,
                fetchedIncome: true,
                fetchingIncome: false,
                income: action.payload
            }
        case GET_USER_INCOME_RQ:
            return {
                ...state,
                fetchedIncomeList: false,
                fetchingIncomeList: true,
                incomeErrors: null
            };
        case GET_USER_INCOME_SUCCESS:
            return {
                ...state,
                fetchedIncomeList: true,
                fetchingIncomeList: false,
                incomeList: action.payload
            };
        case INCOME_ERROR:
            return {
                ...state,
                fetchedIncomeList: false,
                fetchingIncomeList: false,
                incomeErrors: action.payload
            };
        case RESET_INCOME_ERROR:
            return {
                ...state,
                incomeErrors: null
            }
        default:
            return state;
    }
}