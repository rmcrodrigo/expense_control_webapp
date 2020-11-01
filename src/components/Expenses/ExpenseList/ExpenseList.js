import React from 'react';
import PropTypes from 'prop-types';

import Expense from '../Expense/Expense';

const ExpenseList = ({ categories, delExpenseRq, expenses, goExpenseForm, userToken }) => {

  const total =
    expenses && expenses.length > 0
      ? expenses.reduce((total, gasto) => total + gasto.amount, 0)
      : 0;

  return (
    <React.Fragment>
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <Expense
              categories={categories}
              delExpenseRq={delExpenseRq}
              expense={expense}
              goExpenseForm={goExpenseForm}
              key={expense.id}
              userToken={userToken}
            />
          ))}
        </tbody>
      </table>
      <div style={{ fontSize: 18, textAlign: 'right', marginBottom: 10 }}>
        <span style={{ fontWeight: 'bolder' }}>Total:</span> {total}
      </div>
    </React.Fragment>
  );
};

ExpenseList.propTypes = {
    categories: PropTypes.array.isRequired,
    delExpenseRq: PropTypes.func.isRequired,
    expenses: PropTypes.array.isRequired,
    goExpenseForm: PropTypes.func.isRequired,
    userToken: PropTypes.string.isRequired
}

export default ExpenseList;