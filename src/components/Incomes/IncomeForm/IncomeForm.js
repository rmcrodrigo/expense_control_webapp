/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { SimpleError } from '../../Errors';

import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

const IncomeForm = ({
  actionForm,
  addIncomeRq,
  categories,
  editIncomeRq,
  history,
  income,
  incomeErrors,
  resetIncomeErrors,
  userToken,
}) => {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [formError, setFormError] = useState(null);
  const [hasFormError, setHasFormError] = useState(false);
  const [incomeDate, setIncomeDate] = useState(new Date());
  const [incomeDateError, setIncomeDateError] = useState(false);

  const stateSetters = {
    amount: setAmount,
    amountError: setAmountError,
    category: setCategory,
    categoryError: setCategoryError,
    description: setDescription,
    descriptionError: setDescriptionError,
    incomeDate: setIncomeDate,
    incomeDateError: setIncomeDateError,
  };

  useEffect(() => {
    if (income && income.id) {
      setAmount(income.amount);
      setCategory(income.categoryId);
      setDescription(income.description);
      setIncomeDate(new Date(income.incomeDate));
    }
  }, [income]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  const cancelAction = (e) => {
    e.preventDefault();
    history.push('/incomes');
  };

  const changedInputValue = (e) => {
    const { name, value } = e.target;

    if (!value) {
      stateSetters[name](value);
      stateSetters[name + 'Error'](true);
      return;
    }

    if (name === 'amount') {
      if (validateAmount(value)) {
        stateSetters[name](value);
        stateSetters[name + 'Error'](true);
        return;
      }
    }

    stateSetters[name](value);
    stateSetters[name + 'Error'](false);
  };

  const handleChangeDate = (date) => {
    setIncomeDate(date);
  };

  const getIncome = () => {
    return {
      amount,
      categoryId: category,
      description,
      incomeDate,
    };
  };

  const renderCategories = () => {
    const categoryId = category;

    if (!categories || categories.length < 1) return null;

    return (
      <div className="form-group">
        <label>Categoria</label>
        <select
          as="select"
          name="category"
          className={'form-control' + (categoryError ? ' input-error' : '')}
          onChange={changedInputValue}
          value={categoryId}
        >
          <option key="-1" value="">
            Selecciona una opci&oacute;n
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderErrors = () => {
    if (hasFormError || (incomeErrors && incomeErrors.length > 0)) {
      const errors = hasFormError ? formError : incomeErrors;
      const resetError = hasFormError
        ? () => setFormError(null)
        : resetIncomeErrors;
      return (
        <SimpleError callback={resetError} errors={errors} timeout={5000} />
      );
    }
    return <></>;
  };

  const sendAction = (e) => {
    e.preventDefault();
    const lIncome = getIncome();

    if (!validateForm()) return false;

    if (actionForm === 'add') addIncomeRq(lIncome, history, userToken);
    else {
      lIncome['id'] = income.id;
      editIncomeRq(lIncome, history, userToken);
    }
  };

  const validateAmount = (amount) => {
    amount = '' + amount;
    if (
      amount.charAt(amount.length - 1) === '.' ||
      !/^\d+\.?(\d{0,2})$/.test(amount)
    )
      return true;
    return false;
  };

  const validateForm = () => {
    let lAmountError = false,
      lCategoryError = false,
      lDescriptionError = false,
      lIncomeDateError = false;

    if (!amount || validateAmount(amount)) lAmountError = true;
    if (!category) lCategoryError = true;
    if (!description) lDescriptionError = true;
    if (!incomeDate) lIncomeDateError = true;

    setAmountError(lAmountError);
    setCategoryError(lCategoryError);
    setDescriptionError(lDescriptionError);
    setIncomeDateError(lIncomeDateError);

    if (
      lAmountError ||
      lCategoryError ||
      lDescriptionError ||
      lIncomeDateError
    ) {
      setHasFormError(true);
      setFormError(['Los campos marcados en rojo son obligatorios']);
      return false;
    }

    setHasFormError(false);
    setFormError(null);

    return true;
  };

  return (
    <form autoComplete="off" onSubmit={sendAction}>
      {renderErrors()}
      {renderCategories()}
      <div className="form-gorup">
        <label>Descripci&oacute;n</label>
        <input
          className={'form-control' + (descriptionError ? ' input-error' : '')}
          defaultValue={description}
          name="description"
          onChange={changedInputValue}
          placeholder="Quincena"
          type="text"
        />
      </div>
      <div className="form-gorup">
        <label>Monto</label>
        <input
          className={'form-control' + (amountError ? ' input-error' : '')}
          defaultValue={amount}
          name="amount"
          onChange={changedInputValue}
          placeholder="0.00"
          type="text"
        />
      </div>
      <div className="form-gorup">
        <label>Fecha</label>
        <br />
        <DatePicker
          className={'form-control' + (incomeDateError ? ' input-error' : '')}
          dateFormat="yyyy/MM/dd"
          onChange={handleChangeDate}
          placeholderText="yyyy/mm/dd"
          selected={incomeDate}
          showYearDropdown
        />
      </div>

      <div className="add-action-buttons">
        <button
          className="btn btn-dark cancel-add"
          onClick={cancelAction}
          type="button"
        >
          Cancelar
        </button>
        <button className="btn btn-primary add-button" type="submit">
          {actionForm === 'add' ? 'Agregar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

IncomeForm.propTypes = {
  actionForm: PropTypes.string.isRequired,
  addIncomeRq: PropTypes.func,
  categories: PropTypes.array.isRequired,
  editIncomeRq: PropTypes.func,
  income: PropTypes.object,
  incomeErrors: PropTypes.array,
  resetIncomeErrors: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default IncomeForm;
