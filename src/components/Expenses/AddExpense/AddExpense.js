/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './AddExpense.css';
import {
  addExpenseRq,
  resetExpenseError,
} from '../../../actions/expensesActions';
import { getUserCategoriesByTypeRq } from '../../../actions/categoryActions';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

const AddExpense = ({
  addExpenseRq,
  categories,
  expenseErrors,
  getUserCategoriesByTypeRq,
  history,
  resetExpenseError,
  userToken,
}) => {
  
  useEffect(() => {
    getUserCategoriesByTypeRq(1, userToken);
  }, []);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  return (
    <div className="add-expense-container card">
      <p className="card-title h2 mb-4">Agregar nuevo gasto</p>
      <ExpenseForm
        actionForm="add"
        addExpenseRq={addExpenseRq}
        categories={categories}
        expenseErrors={expenseErrors}
        history={history}
        resetExpenseError={resetExpenseError}
        userToken={userToken}
      />
    </div>
  );
};

AddExpense.propTypes = {
  addExpenseRq: PropTypes.func.isRequired,
  categories: PropTypes.array,
  expenseErrors: PropTypes.array,
  getUserCategoriesByTypeRq: PropTypes.func.isRequired,
  resetExpenseError: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  expenseErrors: state.expense.expenseErrors,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, {
  addExpenseRq,
  getUserCategoriesByTypeRq,
  resetExpenseError,
})(AddExpense);
