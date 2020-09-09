import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';
import { SimpleError } from '../../Errors';

const ExpenseForm = ({
  actionForm,
  addExpenseRq,
  categories,
  editExpenseRq,
  expense,
  expenseErrors,
  history,
  resetExpenseError,
  userToken,
}) => {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [expenseDateError, setExpenseDateError] = useState(false);
  const [formError, setFormError] = useState(null);
  const [hasFormError, setHasFormError] = useState(false);
  const [id, setId] = useState(0);

  const stateSetters = {
    amount: setAmount,
    amountError: setAmountError,
    category: setCategory,
    categoryError: setCategoryError,
    description: setDescription,
    descriptionError: setDescriptionError,
    expenseDate: setExpenseDate,
    expenseDateError: setExpenseDateError,
    id: setId,
  };

  useEffect(() => {
    if (expense && expense.id) {
      setAmount(expense.amount);
      setCategory(expense.categoryId);
      setDescription(expense.description);
      setExpenseDate(new Date(expense.expenseDate));
      setId(expense.id);
    }
  }, [expense]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  const addExpense = () => {
    const lExpense = getExpenseData();
    addExpenseRq(lExpense, history, userToken);
  };

  const cancelAction = (e) => {
    e.preventDefault();
    history.push('/expenses');
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

  const editExpense = () => {
    const lExpense = getExpenseData();
    lExpense['id'] = id;

    editExpenseRq(lExpense, history, userToken);
  };

  const getExpenseData = () => {
    const lExpense = {
      amount,
      categoryId: parseInt(category),
      description,
      expenseDate: expenseDate.getTime(),
    };

    return lExpense;
  };

  const handleChangeDate = (date) => {
    setExpenseDate(date);
  };

  const renderErrors = () => {
    if (hasFormError || (expenseErrors && expenseErrors.length > 0)) {
      const errors = hasFormError ? formError : expenseErrors;
      const resetError = hasFormError
        ? () => setFormError(null)
        : resetExpenseError;
      return (
        <SimpleError callback={resetError} errors={errors} timeout={5000} />
      );
    }
    return <></>;
  };

  const sendAction = (e) => {
    e.preventDefault();

    if (!validateForm()) return false;

    if (actionForm === 'add') addExpense();
    else editExpense();
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
      lExpenseDateError = false;

    if (!amount || validateAmount(amount)) lAmountError = true;
    if (!category) lCategoryError = true;
    if (!description) lDescriptionError = true;
    if (!expenseDate) lExpenseDateError = true;

    setAmountError(lAmountError);
    setCategoryError(lCategoryError);
    setDescriptionError(lDescriptionError);
    setExpenseDateError(lExpenseDateError);

    if (
      lAmountError ||
      lCategoryError ||
      lDescriptionError ||
      lExpenseDateError
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
      <div className="form-group">
        <label>Categoria</label>
        <select
          name="category"
          className={'form-control' + (categoryError ? ' input-error' : '')}
          onChange={changedInputValue}
          value={category}
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
      <div className="form-group">
        <label>Descripci&oacute;n</label>
        <input
          className={'form-control' + (descriptionError ? ' input-error' : '')}
          defaultValue={description}
          name="description"
          onChange={changedInputValue}
          placeholder="Descripcion"
          type="text"
        />
      </div>
      <div className="form-group">
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
      <div className="form-group">
        <label>Fecha</label>
        <br />
        <DatePicker
          className={'form-control' + (expenseDateError ? ' input-error' : '')}
          dateFormat="yyyy/MM/dd"
          onChange={handleChangeDate}
          placeholderText="yyyy/mm/dd"
          selected={expenseDate}
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
        <button className="add-button btn btn-primary" type="submit">
          {actionForm === 'add' ? 'Agregar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

ExpenseForm.propTypes = {
  actionForm: PropTypes.string.isRequired,
  addExpenseRq: PropTypes.func,
  categories: PropTypes.array.isRequired,
  editExpenseRq: PropTypes.func,
  expense: PropTypes.object,
  expenseErrors: PropTypes.array,
  resetExpenseError: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default ExpenseForm;
