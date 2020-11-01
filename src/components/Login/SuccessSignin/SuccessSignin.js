import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import { setSpinnerVisibility } from '../../../actions/appActions';

function SuccessSignin({ setSpinnerVisibility }) {

  useEffect(() => {
    setSpinnerVisibility(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col m-4">
      <Alert variant="success">
        Successful registration, please check your email to activate your account.
          <Link to="/signin"> Sign in</Link>
      </Alert>
    </div>
  )
}

SuccessSignin.propTypes = {
  setSpinnerVisibility: PropTypes.func.isRequired
}

export default connect(null, { setSpinnerVisibility })(SuccessSignin);