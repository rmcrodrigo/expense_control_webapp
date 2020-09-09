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
} from '../actions/types';

const initialState = {
  expense: null,
  expenses: null,
  expenseErrors: null,
  requestDone: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EXPENSE_RQ:
    case EDIT_EXPENSE_RQ:
    case GET_EXPENSE_BYID_RQ:
      return {
        ...state,
        expense: null,
        expenseErrors: null,
      };
    case ADD_EXPENSE_SUCCESS:
    case DEL_EXPENSE_RQ:
    case EDIT_EXPENSE_SUCCESS:
    case RESET_EXPENSE_ERROR:
      return {
        ...state,
        expenseErrors: null,
      };
    case DEL_EXPENSE_SUCCESS:
      return {
        ...state,
        expenseErrors: null,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case EXPENSES_ERROR:
      return {
        ...state,
        expense: null,
        expenseErrors: action.payload,
        requestDone: true
      };
    case GET_ALL_EXPENSES_RQ:
      return {
        ...state,
        expense: null,
        expenseErrors: null,
        expenses: null,
        requestDone: false
      };
    case GET_ALL_EXPENSES_SUCCESS:
      return {
        ...state,
        expenseErrors: null,
        expenses: action.payload,
        requestDone: true
      };
    case GET_EXPENSE_BYID_SUCCESS:
      return {
        ...state,
        expenseErrors: null,
        expense: action.payload,
      };
    default:
      return state;
  }
}
