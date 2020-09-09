import {
  INCOME_ERROR,
  ADD_INCOME_RQ,
  ADD_INCOME_SUCCESS,
  DEL_INCOME_RQ,
  DEL_INCOME_SUCCESS,
  EDIT_INCOME_RQ,
  EDIT_INCOME_SUCCESS,
  GET_INCOME_BY_ID_RQ,
  GET_INCOME_BY_ID_SUCCESS,
  GET_USER_INCOMES_RQ,
  GET_USER_INCOMES_SUCCESS,
  RESET_INCOME_ERROR,
} from '../actions/types';

const initialState = {
  income: null,
  incomeErrors: null,
  incomes: null,
  requestDone: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_INCOME_RQ:
    case EDIT_INCOME_RQ:
    case GET_INCOME_BY_ID_RQ:
      return {
        ...state,
        income: null,
        incomeErrors: null,
      };
    case ADD_INCOME_SUCCESS:
    case DEL_INCOME_RQ:
    case EDIT_INCOME_SUCCESS:
    case RESET_INCOME_ERROR:
      return {
        ...state,
        incomeErrors: null,
      };
    case DEL_INCOME_SUCCESS:
      return {
        ...state,
        incomeErrors: null,
        incomes: state.incomes.filter((income) => income.id !== action.payload),
      };
    case GET_INCOME_BY_ID_SUCCESS:
      return {
        ...state,
        income: action.payload,
        incomeErrors: null,
      };
    case GET_USER_INCOMES_RQ:
      return {
        ...state,
        income: null,
        incomeErrors: null,
        incomes: null,
        requestDone: false
      };
    case GET_USER_INCOMES_SUCCESS:
      return {
        ...state,
        incomeErrors: null,
        incomes: action.payload,
        requestDone: true
      };
    case INCOME_ERROR:
      return {
        ...state,
        income: null,
        incomeErrors: action.payload,
        requestDone: true
      };
    default:
      return state;
  }
}
