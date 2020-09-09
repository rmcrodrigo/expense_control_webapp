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
      <table className="table table-bordered table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Fecha</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Monto</th>
            <th>Accion</th>
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