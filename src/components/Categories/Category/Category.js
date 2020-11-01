import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Category = ({ category, delCategoryRq, userToken }) => {
  const categoryTypeTitle = {
    1: 'Gasto',
    2: 'Ingreso',
  };

  const delCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this item?'))
      delCategoryRq(id, userToken);
  };

  return (
    <tr className="data-info">
      <td>
        <p>{category.name}</p>
      </td>
      <td>
        <p>{category.description}</p>
      </td>
      <td>
        <p>{categoryTypeTitle[category.type]}</p>
      </td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            delCategory(category.id);
          }}
        >
          Delete
        </button>
        <Link
          style={{ marginLeft: 5 }}
          to={`/categories/edit/${category.id}`}
          className="btn btn-sm btn-dark"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  delCategoryRq: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired
};

export default React.memo(Category);
