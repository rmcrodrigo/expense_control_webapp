import { 
    ADD_EXPENSE_RQ, ADD_EXPENSE_SUCCESS,
    DEL_EXPENSE_RQ, DEL_EXPENSE_SUCCESS,
    EDIT_EXPENSE_RQ, EDIT_EXPENSE_SUCCESS,
    EXPENSES_ERROR,
    GET_ALL_EXPENSES_RQ, GET_ALL_EXPENSES_SUCCESS,
    GET_EXPENSE_BYID_RQ, GET_EXPENSE_BYID_SUCCESS,
    RESET_EXPENSE_ERROR
} from '../actions/types';

const initialState = {
    expense: {},
    expenseList: [],
    expenseErrors: null,
    fetchedExpenses: false,
    fetchingExpense: false,
    fetchingExpenses: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case ADD_EXPENSE_RQ:
            return {
                ...state,
                expenseErrors: null
            }
        case ADD_EXPENSE_SUCCESS:
            return {
                ...state,
                expenseList: state.expenseList.concat(action.payload),
                fetchedExpenses: false,
                fetchingExpenses: false
            }
        case DEL_EXPENSE_RQ:
            return {
                ...state,
                expenseErrors: null
            }
        case DEL_EXPENSE_SUCCESS:
            return {
                ...state,
                expenseList: state.expenseList.filter(expense => expense.id !== action.payload),
                fetchedExpenses: false,
                fetchingExpenses: false
            }
        case EDIT_EXPENSE_RQ:
            return {
                ...state,
                expenseErrors: null
            }
        case EDIT_EXPENSE_SUCCESS:
            return {
                ...state,
                expenseList: state.expenseList.map(expense => expense.id === action.payload.id
                                            ? expense = action.payload
                                            : expense),
                fetchedExpenses: false,
                fetchingExpenses: false
            }
        case EXPENSES_ERROR:
            return {
                ...state,
                fetchedExpenses: false,
                fetchingExpenses: false,
                expenseErrors: action.payload
            }
        case GET_ALL_EXPENSES_RQ:
            return {
                ...state,
                expenseErrors: null,
                fetchedExpenses: false,
                fetchingExpenses: true
            }
        case GET_ALL_EXPENSES_SUCCESS:
            return {
                ...state,
                expenseList: action.payload,
                fetchedExpenses: true,
                fetchingExpenses: false
            }
        case GET_EXPENSE_BYID_RQ:
            return {
                ...state,
                expenseErrors: null,
                fetchingExpense: true
            }
        case GET_EXPENSE_BYID_SUCCESS:
            return {
                ...state,
                expense: action.payload,
                fetchingExpense: false
            }
        case RESET_EXPENSE_ERROR:
            return {
                ...state,
                expenseErrors: null
            }
        default:
            return state;
    }
}