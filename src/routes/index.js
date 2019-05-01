import React from 'react';
import {Route, Switch} from 'react-router';

import Login from '../components/Login/Login';
import NotFound from '../components/NotFound';
import Expenses from '../components/Expenses/Expenses';
import AddExpense from '../components/Expenses/AddExpense/AddExpense';
import EditExpense from '../components/Expenses/EditExpense/EditExpense';
import Categories from '../components/Categories/Categories';
import AddCategory from '../components/Categories/AddCategory/AddCategory';
import EditCategory from '../components/Categories/EditCategory/EditCategory';
import Incomes from '../components/Incomes/Incomes';
import AddIncome from '../components/Incomes/AddIncome/AddIncome';
import EditIncome from '../components/Incomes/EditIncome/EditIncome';

const routes = (
    <React.Fragment>
        <Switch>
            <Route exact path="/" component={Expenses} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/categories/add" component={AddCategory} />
            <Route path="/categories/edit/:id" component={EditCategory} />
            <Route exact path="/expenses/add" component={AddExpense} />
            <Route path="/expenses/edit/:id" component={EditExpense} />
            <Route exact path="/income" component={Incomes} />
            <Route exact path="/income/add" component={AddIncome} />
            <Route path="/income/edit/:id" component={EditIncome} />
            <Route exact path="/sign" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </React.Fragment>
);

export default routes;