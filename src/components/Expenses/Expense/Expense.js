import React from 'react';
import PropTypes from 'prop-types';

const Expense = ({
  categories,
  delExpenseRq,
  expense,
  goExpenseForm,
  userToken,
}) => {
  const category = categories.find((c) => c.id === expense.categoryId);

  if (!category || !category.id)
    return (
      <tr className="data-info">
        <td colSpan="5" className="alert alert-danger">
          No se encuentra la categoria asociada al ingreso
        </td>
      </tr>
    );

  const delExpense = (id) => {
    if (window.confirm('Estas seguro que deseas borrar este elemento?'))
      delExpenseRq(id, userToken);
  };

  const expenseDate = new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(expense.expenseDate));

  return (
    <tr className="data-info">
      <td>
        <p>{expenseDate}</p>
      </td>
      <td>
        <p>{expense.description}</p>
      </td>
      <td>
        <p>{category.name}</p>
      </td>
      <td>
        <p>{expense.amount}</p>
      </td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => delExpense(expense.id)}
          type="button"
        >
          Eliminar
        </button>
        <button
          className="btn btn-sm btn-dark"
          onClick={(e) => goExpenseForm(e, expense.id)}
          style={{ marginLeft: 5 }}
          type="button"
        >
          Editar
        </button>
      </td>
    </tr>
  );
};

Expense.propTypes = {
  categories: PropTypes.array.isRequired,
  delExpenseRq: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired,
  goExpenseForm: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default React.memo(Expense);
