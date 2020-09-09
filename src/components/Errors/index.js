/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const NoResultsTable = () => {
  return (
    <div className="no-results-table">
      <p>No se encontraron resultados</p>
    </div>
  );
};

export const SimpleError = ({ callback, errors, timeout }) => {
  // const [open, setOpen] = useState(show);

  useEffect(() => {
    setTimeout(() => {
      if (callback) callback();
    }, timeout || 5000);
  }, []);

  if (!errors || errors.length < 1) return null;

  return (
    <div className="collapse" style={{display: (errors && errors.length > 0 ? "block" : "none")}}>
      <div>
        <div className="alert alert-danger">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

SimpleError.propTypes = {
  callback: PropTypes.func,
  errors: PropTypes.array,
  timeout: PropTypes.number,
};
