import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './appReducer';
import categoryReducer from './categoryReducer';
import expensesReducer from './expensesReducer';
import incomeReducer from './incomeReducer';
import signReducer from './signReducer';

export default (history) => combineReducers({
    app: appReducer,
    category: categoryReducer,
    expense: expensesReducer,
    income: incomeReducer,
    router: connectRouter(history),
    sign: signReducer
});