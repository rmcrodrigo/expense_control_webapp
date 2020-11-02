import React from 'react';
import PropTypes from 'prop-types';
import Income from '../Income/Income';

const IncomeList = ({ categores, delIncomeRq, goIncomeForm, incomes, userToken }) => {

  const total =
    incomes && incomes.length > 0
      ? incomes.reduce((total, gasto) => total + gasto.amount, 0)
      : 0;

  return (
    <React.Fragment>
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Fecha</th>
            <th>Descripci&oacute;n</th>
            <th>Categoria</th>
            <th>Monto</th>
            <th>Acci&oacute;n</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <Income
              categories={categores}
              delIncomeRq={delIncomeRq}
              goIncomeForm={goIncomeForm}
              income={income}
              key={income.id}
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

IncomeList.propTypes = {
  categores: PropTypes.array.isRequired,
  delIncomeRq: PropTypes.func.isRequired,
  goIncomeForm: PropTypes.func.isRequired,
  incomes: PropTypes.array.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default IncomeList;
