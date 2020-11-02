import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSpinnerVisibility } from '../../../actions/appActions';
import { addCategoryRq, resetCategoriesError } from '../../../actions/categoryActions';
import CategoryForm from '../CategoryForm/CategoryForm';
import '../Categories.css';

const AddCategory = ({
  addCategoryRq,
  categoryErrors,
  history,
  resetCategoriesError,
  setSpinnerVisibility,
  userToken }) => {

  useEffect(function() {
    setSpinnerVisibility(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card card-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray' }}>
          <h1 className='h3 font-weight-bold text-center'>Add new category</h1>
        </div>
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
  setSpinnerVisibility: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  categoryErrors: state.category.categoryErrors,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, { addCategoryRq, resetCategoriesError, setSpinnerVisibility })(AddCategory);