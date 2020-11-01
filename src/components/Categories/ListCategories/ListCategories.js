import React from 'react';
import PropTypes from 'prop-types';
import Category from '../Category/Category';

const ListCategories = ({ categories, delCategoryRq, userToken }) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              delCategoryRq={delCategoryRq}
              userToken={userToken}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ListCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  delCategoryRq: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default React.memo(ListCategories);
