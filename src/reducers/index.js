import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import categoryReducer from './categoryReducer';
import expensesReducer from './expensesReducer';
import incomeReducer from './incomeReducer';
import signReducer from './signReducer';

export default (history) => combineReducers({
    category: categoryReducer,
    expense: expensesReducer,
    income: incomeReducer,
    router: connectRouter(history),
    sign: signReducer
});