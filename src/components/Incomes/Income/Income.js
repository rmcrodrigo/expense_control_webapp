import React from 'react';
import PropTypes from 'prop-types';

const Income = ({
  categories,
  delIncomeRq,
  goIncomeForm,
  income,
  userToken,
}) => {
  const category = categories.find((c) => c.id === income.categoryId);

  if (!category || !category.id)
    return (
      <tr className="data-info">
        <td colSpan="5" className="alert alert-danger">
          No se encuentra la categoria asociada al ingreso
        </td>
      </tr>
    );

  const delIncome = (id) => {
    if (window.confirm('Estas seguro de que deseas eliminar este ingreso?'))
      delIncomeRq(id, userToken);
  };

  const incomeDate = new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(income.incomeDate));

  return (
    <tr className="data-info">
      <td>
        <p>{incomeDate}</p>
      </td>
      <td>
        <p>{income.description}</p>
      </td>
      <td>
        <p>{category.name}</p>
      </td>
      <td>
        <p>{income.amount}</p>
      </td>
      <td className="text-center">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => delIncome(income.id)}
          type="button"
        >
          Eliminar
        </button>
        <button
          className="btn btn-info btn-sm"
          onClick={(e) => goIncomeForm(e, income.id)}
          style={{ marginLeft: 5 }}
          type="button"
        >
          Editar
        </button>
      </td>
    </tr>
  );
};

Income.propTypes = {
  categories: PropTypes.array.isRequired,
  delIncomeRq: PropTypes.func.isRequired,
  goIncomeForm: PropTypes.func.isRequired,
  income: PropTypes.object.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default Income;
