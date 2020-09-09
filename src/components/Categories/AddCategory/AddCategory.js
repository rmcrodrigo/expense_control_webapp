import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addCategoryRq, resetCategoriesError} from '../../../actions/categoryActions';
import CategoryForm from '../CategoryForm/CategoryForm';
import '../Categories.css';

const AddCategory = ({addCategoryRq, categoryErrors, history, resetCategoriesError, userToken}) => {

    return (
      <div className="card add-category-container">
        <div className="card-body">
          <div className="card-title h2 mb-4">Agregar categoria</div>
          <CategoryForm
            actionForm="add"
            addCategoryRq={addCategoryRq}
            categoryErrors={categoryErrors}
            history={history}
            resetCategoriesError={resetCategoriesError}
            userToken={userToken}
          />
        </div>
      </div>
    );
}

AddCategory.propTypes = {
  addCategoryRq: PropTypes.func.isRequired,
  categoryErrors: PropTypes.array,
  resetCategoriesError: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  categoryErrors: state.category.categoryErrors,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, {addCategoryRq, resetCategoriesError})(AddCategory);