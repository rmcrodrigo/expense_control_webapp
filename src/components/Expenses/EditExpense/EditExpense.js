/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../AddExpense/AddExpense.css';
import {
  editExpenseRq,
  getExpenseById,
  resetExpenseError,
} from '../../../actions/expensesActions';
import { getUserCategoriesByTypeRq } from '../../../actions/categoryActions';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

const EditExpense = ({
  editExpenseRq,
  categories,
  expense,
  expenseErrors,
  getExpenseById,
  getUserCategoriesByTypeRq,
  history,
  match,
  resetExpenseError,
  userToken,
}) => {
  
  useEffect(() => {
    getUserCategoriesByTypeRq(1, userToken);
  }, []);

  useEffect(() => {
    const id = match.params.id;
    if (categories && categories.length > 0 && id && !expense) {
      getExpenseById(id, userToken);
    }
  }, [categories]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  if (!expense || !expense.id)
    return (
      <div className="alert alert-danger">
        No se encontro el gasto que desea modificar
      </div>
    );

  return (
    <div className="add-expense-container card">
      <p className="card-title h2 mb-4">Edici&oacute;n de gastos</p>
      <ExpenseForm
        actionForm="edit"
        categories={categories}
        editExpenseRq={editExpenseRq}
        expense={expense}
        expenseErrors={expenseErrors}
        getUserCategoriesByTypeRq={getUserCategoriesByTypeRq}
        history={history}
        resetExpenseError={resetExpenseError}
        userToken={userToken}
      />
    </div>
  );
};

EditExpense.propTypes = {
  categories: PropTypes.array,
  editExpenseRq: PropTypes.func.isRequired,
  expense: PropTypes.object,
  expenseErrors: PropTypes.array,
  getExpenseById: PropTypes.func.isRequired,
  getUserCategoriesByTypeRq: PropTypes.func.isRequired,
  resetExpenseError: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  expense: state.expense.expense,
  expenseErrors: state.expense.expenseErrors,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, {
  editExpenseRq,
  getExpenseById,
  getUserCategoriesByTypeRq,
  resetExpenseError,
})(EditExpense);
