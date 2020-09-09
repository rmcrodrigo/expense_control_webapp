/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserCategoriesByTypeRq } from '../../../actions/categoryActions';
import {
  editIncomeRq,
  getIncomeByIdRq,
  resetIncomeErrors,
} from '../../../actions/incomeActions';

import IncomeForm from '../IncomeForm/IncomeForm';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

const EditIncome = ({
  categories,
  editIncomeRq,
  getIncomeByIdRq,
  getUserCategoriesByTypeRq,
  history,
  income,
  incomeErrors,
  match,
  resetIncomeErrors,
  userToken,
}) => {
  useEffect(() => {
    getUserCategoriesByTypeRq(2, userToken);
  }, []);

  useEffect(() => {
    const incomeId = match.params.id;
    if (categories && categories.length > 0 && incomeId && !income)
      getIncomeByIdRq(incomeId, userToken);
  }, [categories]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  if (!income || !income.id)
    return (
      <div className="alert alert-danger">
        El ingreso que desea modificar no existe
      </div>
    );

  return (
    <div className="card card-container">
      <div className="card-body">
        <div className="card-title h2 mb-4">Editar un ingreso</div>
        <IncomeForm
          actionForm="edit"
          categories={categories}
          editIncomeRq={editIncomeRq}
          history={history}
          income={income}
          incomeErrors={incomeErrors}
          resetIncomeErrors={resetIncomeErrors}
          userToken={userToken}
        />
      </div>
    </div>
  );
};

EditIncome.propTypes = {
  categories: PropTypes.array,
  editIncomeRq: PropTypes.func.isRequired,
  getIncomeByIdRq: PropTypes.func.isRequired,
  getUserCategoriesByTypeRq: PropTypes.func.isRequired,
  income: PropTypes.object,
  incomeErrors: PropTypes.array,
  resetIncomeErrors: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  editIncomeRq,
  getIncomeByIdRq,
  getUserCategoriesByTypeRq,
  resetIncomeErrors,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  income: state.income.income,
  incomeErrors: state.income.incomeErrors,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditIncome);
