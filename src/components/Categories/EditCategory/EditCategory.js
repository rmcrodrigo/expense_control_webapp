/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  editCategoryRq,
  getCategoryByIdRq,
  resetCategoriesError,
} from '../../../actions/categoryActions';
import CategoryForm from '../CategoryForm/CategoryForm';
import '../Categories.css';
import { SimpleError } from '../../Errors';

const EditCategory = ({
  category,
  categoryErrors,
  editCategoryRq,
  getCategoryByIdRq,
  history,
  match,
  resetCategoriesError,
  userToken,
}) => {
  useEffect(() => {
    const categoryId = match.params.id;
    if (categoryId && !category) {
      getCategoryByIdRq(categoryId, userToken);
    }
  }, []);

  if (!category || !category.id)
    return (
      <div className="alert alert-danger">
        No se encontro la categoria que desea modificar
      </div>
    );

  const renderCategoryErrors = () => {
    if (categoryErrors && categoryErrors.length > 0)
      return (
        <SimpleError
          callback={resetCategoriesError}
          errors={categoryErrors}
          timeout={5000}
        />
      );

    return null;
  };

  return (
    <div className="card add-category-container">
      <div className="card-body">
        <div className="card-title h2 mb-4">Agregar categoria</div>
        {renderCategoryErrors()}
        <CategoryForm
          actionForm="edit"
          category={category}
          categoryErrors={categoryErrors}
          editCategoryRq={editCategoryRq}
          history={history}
          resetCategoriesError={resetCategoriesError}
          userToken={userToken}
        />
      </div>
    </div>
  );
};

EditCategory.propTypes = {
  category: PropTypes.object,
  categoryErrors: PropTypes.array,
  editCategoryRq: PropTypes.func.isRequired,
  getCategoryByIdRq: PropTypes.func.isRequired,
  resetCategoriesError: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
  categoryErrors: state.category.categoryErrors,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, {
  editCategoryRq,
  getCategoryByIdRq,
  resetCategoriesError,
})(EditCategory);
