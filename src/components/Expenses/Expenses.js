/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getAllExpensesRq,
  delExpenseRq,
  resetExpenseError,
} from '../../actions/expensesActions';
import { getUserCategoriesByTypeRq } from '../../actions/categoryActions';
import { NoResultsTable } from '../Errors';

import DatesContainer from '../Util/DatesContainer/DatesContainer';
import ExpenseList from './ExpenseList/ExpenseList';
import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';
import { SimpleError } from '../Errors';

import './Expenses.css';

const Expenses = ({
  categories,
  delExpenseRq,
  expenseErrors,
  expenses,
  getAllExpensesRq,
  getUserCategoriesByTypeRq,
  history,
  userToken,
}) => {

  const _tempDate = new Date().getTime();
  const [endDate, setEndDate] = useState(_tempDate);
  const [mode, setMode] = useState("month");
  const [startDate, setStartDate] = useState(_tempDate);
  const [startMonth, setStartMonth] = useState(_tempDate);

  useEffect(() => {
    getUserCategoriesByTypeRq(1, userToken);
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {

      const datesFormData = JSON.parse(localStorage.getItem('datesFormData'));
      if (
        datesFormData &&
        datesFormData.mode &&
        datesFormData.values &&
        datesFormData.values.endDate &&
        datesFormData.values.startDate &&
        datesFormData.values.startMonth
      ) {
        callGetExpensesRq(
          datesFormData.mode,
          new Date(datesFormData.values.endDate),
          new Date(datesFormData.values.startDate),
          new Date(datesFormData.values.startMonth)
        );
        setEndDate(datesFormData.values.endDate);
        setMode(datesFormData.mode);
        setStartDate(datesFormData.values.startDate);
        setStartMonth(datesFormData.values.startMonth);
        localStorage.removeItem('datesFormData');
      } else callGetExpensesRq('month', new Date(endDate), new Date(startDate), new Date(startMonth));
    }
  }, [categories]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  const callGetExpensesRq = (type, endDate, startDate, startMonth) => {
    let from = null;
    let to = null;

    if (type === 'month') {
      from = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
      to = new Date(from);
      to.setMonth(to.getMonth() + 1);
      to.setDate(to.getDate() - 1);
      from = from.getTime();
      to = to.getTime();
    } else {
      from = startDate.getTime();
      to = endDate.getTime();
    }
    getAllExpensesRq(userToken, from, to);
  };

  const goExpenseForm = (e, expenseId) => {
    e.preventDefault();
    const _tempData = {
      mode,
      values: {
        endDate,
        startDate,
        startMonth
      }
    };

    localStorage.setItem("datesFormData", JSON.stringify(_tempData));

    if (expenseId)
      history.push(`/expenses/edit/${expenseId}`);
    else
      history.push('/expenses/add');
  };

  const renderExpenseErrors = () => {
    if (!expenses || expenses.length < 1)
      return (
        <SimpleError
          callback={resetExpenseError}
          errors={expenseErrors}
          timeout={5000}
        />
      );
  };

  const renderExpenseList = () => {
    if (!expenses || expenses.length < 1) return <NoResultsTable />;

    return (
      <ExpenseList
        categories={categories}
        delExpenseRq={delExpenseRq}
        expenses={expenses}
        goExpenseForm={goExpenseForm}
        userToken={userToken}
      />
    );
  };

  const searchExpenses = (_mode, _endDate, _startDate, _startMonth) => {
    setEndDate(_endDate.getTime());
    setMode(_mode);
    setStartDate(_startDate.getTime());
    setStartMonth(_startMonth.getTime());
    callGetExpensesRq(_mode, _endDate, _startDate, _startMonth);
  };

  return (
    <div className="card card-container expenses-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className="h3 font-weight-bold text-center">Expense List</h1>
        </div>
        <div className="pt-3">
          {renderExpenseErrors()}
          <DatesContainer
            searchAction={searchExpenses}
            userToken={userToken}
          />
          {renderExpenseList()}
          <button
            type="button"
            id="add"
            onClick={goExpenseForm}
            className="btn btn-success add-button"
          >
            Agregar gasto
          </button>
        </div>
      </div>
    </div>
  );
};

Expenses.propTypes = {
  categories: PropTypes.array,
  delExpenseRq: PropTypes.func.isRequired,
  expenseErrors: PropTypes.array,
  expenses: PropTypes.array,
  getAllExpensesRq: PropTypes.func.isRequired,
  getUserCategoriesByTypeRq: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  getAllExpensesRq,
  getUserCategoriesByTypeRq,
  delExpenseRq,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  expenseErrors: state.expense.expenseErrors,
  expenses: state.expense.expenses,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
