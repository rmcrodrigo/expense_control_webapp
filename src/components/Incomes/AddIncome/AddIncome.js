/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserCategoriesByTypeRq } from '../../../actions/categoryActions';
import { addIncomeRq, resetIncomeErrors } from '../../../actions/incomeActions';
import IncomeForm from '../IncomeForm/IncomeForm';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

const AddIncome = ({
  addIncomeRq,
  categories,
  getUserCategoriesByTypeRq,
  history,
  incomeErrors,
  resetIncomeErrors,
  userToken,
}) => {
  useEffect(() => {
    getUserCategoriesByTypeRq(2, userToken);
  }, []);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  return (
    <div className="card card-container">
      <div className="card-body">
        <p className="card-title mb-4 h2">Agregar un ingreso</p>
        <IncomeForm
          actionForm="add"
          addIncomeRq={addIncomeRq}
          categories={categories}
          history={history}
          incomeErrors={incomeErrors}
          resetIncomeErrors={resetIncomeErrors}
          userToken={userToken}
        />
      </div>
    </div>
  );
};

AddIncome.propTypes = {
  addIncomeRq: PropTypes.func.isRequired,
  categories: PropTypes.array,
  getUserCategoriesByTypeRq: PropTypes.func.isRequired,
  incomeErrors: PropTypes.array,
  resetIncomeErrors: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  addIncomeRq,
  getUserCategoriesByTypeRq,
  resetIncomeErrors,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  incomeErrors: state.income.incomeErrors,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddIncome);
