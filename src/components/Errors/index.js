/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
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
    <div className="collapse" style={{ display: (errors && errors.length > 0 ? "block" : "none") }}>
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

export const SimpleClosableError = ({ onCloseFn, errors }) => {

  if (!errors || errors.length < 1) return null;

  return (
    <Alert dismissible onClose={() => onCloseFn()} variant="danger">
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </Alert>
  )
}

SimpleError.propTypes = {
  callback: PropTypes.func,
  errors: PropTypes.array,
  timeout: PropTypes.number,
};
