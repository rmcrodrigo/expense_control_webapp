/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserCategoriesRq } from '../../actions/categoryActions';
import { getAllExpensesRq } from '../../actions/expensesActions';
import { getUserIncomesRq } from '../../actions/incomeActions';

import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';
import CreateChart from '../Util/Chart';
import DatesContainer from '../Util/DatesContainer/DatesContainer';

const Dashboard = ({
  categories,
  categoryErrors,
  expenses,
  expensesRD,
  incomes,
  incomesRD,
  getAllExpensesRq,
  getUserCategoriesRq,
  getUserIncomesRq,
  userToken,
}) => {
  const _tempDate = new Date().getTime();
  const [endDate, setEndDate] = useState(_tempDate);
  const [startDate, setStartDate] = useState(_tempDate);
  const [startMonth, setStartMonth] = useState(_tempDate);

  // getting categories
  useEffect(() => {
    getUserCategoriesRq(userToken);
  }, []);

  // getting expenses and incomes
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
        callGetDataRq(
          datesFormData.mode,
          new Date(datesFormData.values.endDate),
          new Date(datesFormData.values.startDate),
          new Date(datesFormData.values.startMonth),
          userToken
        );
        setEndDate(datesFormData.values.endDate);
        setStartDate(datesFormData.values.startDate);
        setStartMonth(datesFormData.values.startMonth);
        localStorage.removeItem('datesFormData');
      } else {
        callGetDataRq(
          'month',
          new Date(endDate),
          new Date(startDate),
          new Date(startMonth),
          userToken
        );
      }
    }
  }, [categories]);

  const callGetDataRq = (mode, endDate, startDate, startMonth, userToken) => {
    let from = null;
    let to = null;

    if (mode === 'month') {
      from = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
      to = new Date(from);
      to.setMonth(to.getMonth() + 1);
      to.setDate(to.getDate() - 1);
      from = from.getTime();
      to = to.getTime();
    } else {
      from = startDate.getTime();
      to = endDate.getTime();
    }
    getAllExpensesRq(userToken, from, to);
    getUserIncomesRq(userToken, from, to);
  };

  if (categoryErrors)
    return <div className="alert alert-danger" style={{ marginTop: 40 }}>{categoryErrors}</div>;

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  // expenses chart
  const createExpensesChart = () => {
    if (
      categories &&
      categories.length > 0 &&
      expenses &&
      expenses.length > 0
    ) {
      const expenseCategories = categories.filter((c) => c.type === 1);
      const chartValues = [];
      const chartColors = [];
      const chartLabels = [];
      expenseCategories.forEach((c) => {
        const categoryExpenses = expenses.filter((e) => e.categoryId === c.id);
        if (categoryExpenses) {
          const total = categoryExpenses.reduce(
            (total, expense) => total + expense.amount,
            0
          );
          if (total > 0) {
            chartColors.push(c.color || '#fff');
            chartLabels.push(c.name);
            chartValues.push(total);
          }
        }
      });
      return (
        <CreateChart
          chartColors={chartColors}
          chartLabels={chartLabels}
          chartType="bar"
          chartValues={chartValues}
          title="Gastos"
        />
      );
    }
  };

  // income chart
  const createIncomeChart = () => {
    if (categories && categories.length > 0 && incomes && incomes.length > 0) {
      const incomeCategories = categories.filter((c) => c.type === 2);
      const chartValues = [];
      const chartColors = [];
      const chartLabels = [];
      incomeCategories.forEach((c) => {
        const categoryIncomes = incomes.filter((e) => e.categoryId === c.id);
        if (categoryIncomes) {
          const total = categoryIncomes.reduce(
            (total, income) => total + income.amount,
            0
          );
          if (total > 0) {
            chartColors.push(c.color || '#fff');
            chartLabels.push(c.name);
            chartValues.push(total);
          }
        }
      });

      return (
        <CreateChart
          chartColors={chartColors}
          chartLabels={chartLabels}
          chartType="bar"
          chartValues={chartValues}
          title="Ingresos"
        />
      );
    }
  };

  // balance chart
  const createBalanceChart = () => {
    if (
      categories &&
      categories.length > 0 &&
      expensesRD &&
      incomesRD &&
      ((expenses && expenses.length > 0) || (incomes && incomes.length > 0))
    ) {
      const chartValues = [];
      if (incomes && incomes.length > 0)
        chartValues.push(
          incomes.reduce((total, income) => total + income.amount, 0)
        );
      else chartValues.push(0);

      if (expenses && expenses.length > 0)
        chartValues.push(
          expenses.reduce((total, expense) => total + expense.amount, 0)
        );
      else chartValues.push(0);

      return (
        <CreateChart
          chartColors={['rgba(9, 159, 16, 1)', 'rgba(150, 7, 7 ,1)']}
          chartLabels={['Ingresos', 'Gastos']}
          chartType="pie"
          chartValues={chartValues}
        />
      );
    }
  };

  return (
    <div className="card card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 10 }}>
          <h1 className='h3 font-weight-bold text-center'>Statistics</h1>
        </div>
        <div className="pt-2">
          <div className="row">
            <div className="col-sm-12 col-12">
              <DatesContainer
                searchAction={callGetDataRq}
                userToken={userToken}
              />
            </div>
          </div>
          {(!expenses || expenses.length < 1) && (!incomes || incomes.length < 1) ? (
            <div className="alert alert-info">
              No hay informacion para mostrar
            </div>
          ) : (
              <>
                <div
                  id="balance-chart"
                  className="row mb-5"
                  style={{ margin: '0 0 30px 0', minHeight: 400, width: '100%' }}
                >
                  <div className="col-sm-12 col-12">
                    <div className="row" width="100%">
                      <div className="col-sm-12 col-12">
                        <p className="h2 text-center">Balance mensual</p>
                      </div>
                    </div>
                    <div className="row">
                      <div style={{ marginLeft: '25%', width: '50%' }}>
                        {createBalanceChart()}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="comp-charts"
                  className="row"
                  style={{ margin: 0, minHeight: 400, width: '100%' }}
                >
                  <div className="col-sm-12 col-12">
                    <div className="row" width="100%">
                      <div className="col-sm-12 col-12">
                        <p className="h2 text-center">Desgloce por categoria</p>
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{ margin: 0, minHeight: '100%', width: '100%' }}
                    >
                      <div id="expenses" className="col-sm-6 col-6">
                        {createExpensesChart()}
                      </div>
                      <div id="incomes" className="col-sm-6 col-6">
                        {createIncomeChart()}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  categories: PropTypes.array,
  categoryErrors: PropTypes.array,
  expenses: PropTypes.array,
  expensesRD: PropTypes.bool.isRequired,
  incomes: PropTypes.array,
  incomesRD: PropTypes.bool.isRequired,
  getUserCategoriesRq: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  getAllExpensesRq,
  getUserCategoriesRq,
  getUserIncomesRq,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  categoryErrors: state.category.categoryErrors,
  expenses: state.expense.expenses,
  expensesRD: state.expense.requestDone,
  incomes: state.income.incomes,
  incomesRD: state.income.requestDone,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
