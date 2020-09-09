import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';

import { SimpleError } from '../../Errors';
import Popover from '../../Util/Popover/Popover';

const CategoryForm = ({
  actionForm,
  addCategoryRq,
  category,
  categoryErrors,
  editCategoryRq,
  history,
  resetCategoriesError,
  userToken,
}) => {
  const [color, setColor] = useState('#fff');
  const [colorError, setColorError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [formError, setFormError] = useState(null);
  const [hasFormError, setHasFormError] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const stateSetters = {
    color: setColor,
    description: setDescription,
    descriptionError: setDescriptionError,
    name: setName,
    nameError: setNameError,
    type: setType,
    typeError: setTypeError,
  };

  useEffect(() => {
    if (category && category.id) {

      let tempColor = "#fff"
      if (category.color && category.color.startsWith('#'))
        tempColor = category.color;

      setColor(tempColor);
      setDescription(category.description);
      setName(category.name);
      setType(category.type);
    }
  }, [category]);

  const addCategory = (category) => {
    addCategoryRq(category, history, userToken);
  };

  const cancelAdd = (e) => {
    e.preventDefault();
    history.push('/categories');
  };

  const changedInputValue = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (!value) {
      stateSetters[name + 'Error'](true);
      stateSetters[name](value);
    }
    stateSetters[name + 'Error'](false);
    stateSetters[name](value);
  };

  const editCategory = (category) => {
    editCategoryRq(category, history, userToken);
  };

  const getCategoryData = () => {
    const lCategory = {
      color,
      description,
      name,
      type,
    };
    if (category && category.id) lCategory['id'] = category.id;

    return lCategory;
  };
  
  const getStyles = () => {
    const styles = {
      borderColor: color,
      borderWidth: 3
    };
    return styles
  }

  const handleChangeColor = (newColor) => {
    if(newColor && newColor.hex)
      setColor(newColor.hex);
  }

  const handleClosePopup = (e) => {
    setShowPopup(!showPopup);
  };

  const renderErrors = () => {
    if (hasFormError || (categoryErrors && categoryErrors.length > 0)) {
      const errors = hasFormError ? formError : categoryErrors;
      const resetError = hasFormError
        ? () => setFormError(null)
        : resetCategoriesError;
      return (
        <SimpleError callback={resetError} errors={errors} timeout={5000} />
      );
    }
    return <></>;
  };

  const renderPopup = () => {
    if (!showPopup) return null;
    return (
      <Popover
        onClose={handleClosePopup}
        position="left"
        style={{ top: 38, left: -282 }}
      >
        <ChromePicker color={color} onChange={handleChangeColor} />
      </Popover>
    );
  };

  const sendAction = (e) => {
    e.preventDefault();
    if (!validateForm()) return false;

    const category = getCategoryData();

    if (actionForm === 'add') addCategory(category, userToken);
    else editCategory(category, userToken);
  };

  const validateForm = () => {
    let lColorError = false,
      lDescriptionError = false,
      lNameError = false,
      lTypeError = false;

    if (!color) lColorError = true;
    if (!description) lDescriptionError = true;
    if (!name) lNameError = true;
    if (!type) lTypeError = true;

    setColorError(lColorError);
    setDescriptionError(lDescriptionError);
    setNameError(lNameError);
    setTypeError(lTypeError);

    if (lDescriptionError || lNameError || lTypeError) {
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
        <label>Nombre</label>
        <input
          className={'form-control ' + (nameError ? ' input-error' : '')}
          defaultValue={name}
          id="name"
          name="name"
          onChange={changedInputValue}
          placeholder="Ej. Comida"
          type="text"
        />
      </div>
      <div className="form-group">
        <label>Descripcion</label>
        <input
          className={'form-control ' + (descriptionError ? ' input-error' : '')}
          defaultValue={description}
          name="description"
          onChange={changedInputValue}
          placeholder="Ej. Gastos derivados de compras de comida"
          type="text"
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-8">
          <label>Tipo de categoria</label>
          <select
            className={'form-control ' + (typeError ? ' input-error' : '')}
            name="type"
            onChange={changedInputValue}
            value={type}
          >
            <option value="">Selecciona una opci&oacute;n</option>
            <option value="1">Gasto</option>
            <option value="2">Ingresos</option>
          </select>
        </div>
        <div className="form-group col-md-4">
          <label>Color</label>
          <button
            className={
              'btn btn-info form-control ' + (colorError ? 'input-error' : '')
            }
            name="color"
            onClick={() => {
              setShowPopup(!showPopup);
            }}
            style={getStyles()}
            type="button"
          >
            Elije un color
          </button>
          {renderPopup()}
        </div>
      </div>
      <div className="add-action-buttons">
        <button className="btn btn-dark cancel-button" onClick={cancelAdd}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary add-button">
          {actionForm === 'add' ? 'Agregar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

CategoryForm.propTypes = {
  actionForm: PropTypes.string.isRequired,
  addCategoryRq: PropTypes.func,
  category: PropTypes.object,
  categoryErrors: PropTypes.array,
  editCategoryRq: PropTypes.func,
  resetCategoriesError: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default CategoryForm;
