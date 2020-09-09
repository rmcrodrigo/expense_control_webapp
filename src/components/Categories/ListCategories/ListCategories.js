import React from 'react';
import PropTypes from 'prop-types';
import Category from '../Category/Category';

const ListCategories = ({ categories, delCategoryRq, userToken }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Descripci&oacute;n</th>
            <th>Tipo</th>
            <th>Acci&oacute;n</th>
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
