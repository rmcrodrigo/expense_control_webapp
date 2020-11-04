import React from 'react';
import { Route, Switch } from 'react-router';

import AddCategory from '../components/Categories/AddCategory/AddCategory';
import AddExpense from '../components/Expenses/AddExpense/AddExpense';
import AddIncome from '../components/Incomes/AddIncome/AddIncome';
import Categories from '../components/Categories/Categories';
import ConfirmAccount from '../components/Login/ConfirmAccount/ConfirmAccount';
import Dashboard from '../components/Dashboard/Dashboard';
import EditCategory from '../components/Categories/EditCategory/EditCategory';
import EditExpense from '../components/Expenses/EditExpense/EditExpense';
import EditIncome from '../components/Incomes/EditIncome/EditIncome';
import Expenses from '../components/Expenses/Expenses';
import Incomes from '../components/Incomes/Incomes';
import Login from '../components/Login/Login';
import LoginForm from '../components/Login/LoginForm/LoginForm';
import MyAccount from '../components/MyAccount/MyAccount';
import NotFound from '../components/NotFound';
import ResetPassword from '../components/Login/ResetPassword/ResetPassword';
import ResetPasswordForm from '../components/Login/ResetPassword/ResetPasswordForm';
import SignUpForm from '../components/Login/NewUserForm/NewUserForm';
import SuccessSignup from '../components/Login/SuccessSignin/SuccessSignin';

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
    <Route exact path="/my-account" component={MyAccount} />
    <Route exact path="/signin">
      <Login>
        <LoginForm />
      </Login>
    </Route>
    <Route exact path="/signup">
      <Login>
        <SignUpForm />
      </Login>
    </Route>
    <Route exact path="/reset-password">
      <Login>
        <ResetPassword />
      </Login>
    </Route>
    <Route exact path="/reset-password-form">
      <Login>
        <ResetPasswordForm />
      </Login>
    </Route>
    <Route exact path="/success-signin" component={SuccessSignup} />
    <Route exact path="/confirm-account" component={ConfirmAccount} />
    <Route component={NotFound} />
  </Switch>
);

export default React.memo(Routes);
