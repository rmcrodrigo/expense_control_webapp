import React from 'react';
import { Link } from 'react-router-dom';

const NoCategoriesMsg = () => {
  return (
    <div className="alert alert-danger">
      Para comenzar necesitamos agregar al menos una categoria, vallamos a
      agregar una desde
      <Link
        to="/categories/add"
        style={{ marginLeft: 5, fontSize: 16, color: 'blue' }}
        className="font-weight-bold font-italic"
      >
        aqu&iacute;
      </Link>
    </div>
  );
};

export default NoCategoriesMsg;
