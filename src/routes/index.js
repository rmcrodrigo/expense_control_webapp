import React from 'react';
import { Route, Switch } from 'react-router';

import AddCategory from '../components/Categories/AddCategory/AddCategory';
import AddExpense from '../components/Expenses/AddExpense/AddExpense';
import AddIncome from '../components/Incomes/AddIncome/AddIncome';
import Categories from '../components/Categories/Categories';
import Dashboard from '../components/Dashboard/Dashboard';
import Expenses from '../components/Expenses/Expenses';
import EditExpense from '../components/Expenses/EditExpense/EditExpense';
import EditCategory from '../components/Categories/EditCategory/EditCategory';
import EditIncome from '../components/Incomes/EditIncome/EditIncome';
import Incomes from '../components/Incomes/Incomes';
import Login from '../components/Login/Login';
import NotFound from '../components/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/categories" component={Categories} />
    <Route exact path="/categories/add" component={AddCategory} />
    <Route exact path="/categories/edit/:id" component={EditCategory} />
    <Route exact path="/expenses" component={Expenses} />
    <Route exact path="/expenses/add" component={AddExpense} />
    <Route exact path="/expenses/edit/:id" component={EditExpense} />
    <Route exact path="/incomes" component={Incomes} />
    <Route exact path="/incomes/add" component={AddIncome} />
    <Route exact path="/incomes/edit/:id" component={EditIncome} />
    <Route exact path="/sign" component={Login} />
    <Route component={NotFound} />
  </Switch>
);

export default React.memo(Routes);
