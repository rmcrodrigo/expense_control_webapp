/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addCategoryRq,
  delCategoryRq,
  getUserCategoriesRq,
  resetCategoriesError,
} from '../../actions/categoryActions';

import ListCategories from './ListCategories/ListCategories';
import { NoResultsTable, SimpleError } from '../Errors';

import './Categories.css';

const Categories = ({
  categories,
  categoryErrors,
  delCategoryRq,
  getUserCategoriesRq,
  history,
  resetCategoriesError,
  userToken,
}) => {
  useEffect(() => {
    getUserCategoriesRq(userToken);
  }, []);

  const goAddCategory = () => {
    history.push('/categories/add');
  };

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

  const renderCategoryList = () => {
    if (!categories || categories.length < 1) return <NoResultsTable />;
    return (
      <ListCategories
        categories={categories}
        delCategoryRq={delCategoryRq}
        userToken={userToken}
      />
    );
  };

  return (
    <div className="card category-list-container">
      <div className="card-body">
        <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 10 }}>
          <h1 className='h3 text-center'>Categories</h1>
        </div>
        <div className="pt-2">
          {renderCategoryErrors()}
          {renderCategoryList()}
          <div className="add-category-button">
            <button
              type="button"
              className="btn btn-primary"
              onClick={goAddCategory}
            >
              Add category
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Categories.propTypes = {
  addCategoryRq: PropTypes.func.isRequired,
  categories: PropTypes.array,
  categoryErrors: PropTypes.array,
  delCategoryRq: PropTypes.func.isRequired,
  getUserCategoriesRq: PropTypes.func.isRequired,
  resetCategoriesError: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  addCategoryRq,
  delCategoryRq,
  getUserCategoriesRq,
  resetCategoriesError,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  categoryErrors: state.category.categoryErrors,
  userToken: state.sign.userData.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
