/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  delIncomeRq,
  getUserIncomesRq,
  resetIncomeErrors,
} from '../../actions/incomeActions';

import { getUserCategoriesByTypeRq } from '../../actions/categoryActions';

import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';
import { NoResultsTable, SimpleError } from '../Errors';
import IncomeList from './IncomeList/IncomeList';
import DatesContainer from '../Util/DatesContainer/DatesContainer';

const Incomes = ({
  categories,
  delIncomeRq,
  getUserCategoriesByTypeRq,
  getUserIncomesRq,
  history,
  incomeErrors,
  incomes,
  resetIncomeErrors,
  userToken,
}) => {
  const _tempDate = new Date().getTime();
  const [endDate, setEndDate] = useState(_tempDate);
  const [mode, setMode] = useState('month');
  const [startDate, setStartDate] = useState(_tempDate);
  const [startMonth, setStartMonth] = useState(_tempDate);

  useEffect(() => {
    getUserCategoriesByTypeRq(2, userToken);
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
        callGetUserIncomesRq(
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
      } else callGetUserIncomesRq('month', null, null, new Date());
    }
  }, [categories]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  const callGetUserIncomesRq = (type, endDate, startDate, startMonth) => {
    let from = null,
      to = null;
    if (type === 'month') {
      from = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
      to = new Date(from.getTime());
      to.setMonth(to.getMonth() + 1);
      to.setTime(to.getTime() - 1);
      from = from.getTime();
      to = to.getTime();
    } else {
      from = startDate.getTime();
      to = endDate.getTime();
    }

    getUserIncomesRq(userToken, from, to);
  };

  const goIncomeForm = (e, incomeId) => {
    e.preventDefault();
    const _tempData = {
      mode,
      values: {
        endDate,
        startDate,
        startMonth,
      },
    };
    localStorage.setItem('datesFormData', JSON.stringify(_tempData));

    if (incomeId) history.push(`/incomes/edit/${incomeId}`);
    else history.push('/incomes/add');
  };

  const renderErrors = () => {
    if (incomeErrors && incomeErrors.length > 0)
      return (
        <SimpleError
          callback={resetIncomeErrors}
          errors={incomeErrors}
          timeout={5000}
        />
      );
    return null;
  };

  const renderIncomeList = () => {
    if (!incomes || incomes.length < 1) return <NoResultsTable />;
    return (
      <IncomeList
        categores={categories}
        delIncomeRq={delIncomeRq}
        goIncomeForm={goIncomeForm}
        incomes={incomes}
        userToken={userToken}
      />
    );
  };

  const searchIncome = (_mode, _endDate, _startDate, _startMonth) => {
    setEndDate(_endDate.getTime());
    setMode(_mode);
    setStartDate(_startDate.getTime());
    setStartMonth(_startMonth.getTime());
    callGetUserIncomesRq(_mode, _endDate, _startDate, _startMonth);
  };

  return (
    <div className="card card-container">
      <div className="card-header">
        <div className="card-title">
          <h1>Lista de ingresos</h1>
        </div>
      </div>
      <div className="card-body">
        {renderErrors()}
        <DatesContainer searchAction={searchIncome} userToken={userToken} />
        {renderIncomeList()}
        <div className="add-category-button">
          <button
            className="btn btn-primary"
            type="button"
            onClick={goIncomeForm}
          >
            Agregar ingreso
          </button>
        </div>
      </div>
    </div>
  );
};

Incomes.propTypes = {
  delIncomeRq: PropTypes.func.isRequired,
  getUserCategoriesByTypeRq: PropTypes.func.isRequired,
  getUserIncomesRq: PropTypes.func.isRequired,
  incomeErrors: PropTypes.array,
  incomes: PropTypes.array,
  resetIncomeErrors: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  delIncomeRq,
  getUserCategoriesByTypeRq,
  getUserIncomesRq,
  resetIncomeErrors,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  incomeErrors: state.income.incomeErrors,
  incomes: state.income.incomes,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);
