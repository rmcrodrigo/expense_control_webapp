import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Alert } from 'react-bootstrap';

import { confirmAccount, resetError } from '../../../actions/signActions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ConfirmAccount({
  confirmAccount,
  resetError,
  signErrors
}) {

  const queryFinder = useQuery();

  useEffect(function () {
    const token = queryFinder.get("token");
    if (token) {
      confirmAccount(token);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (signErrors && signErrors.length > 0) {
      return (
        <Alert
          variant="danger"
        > {signErrors}
        </Alert>
      );
    }
    return (
      <Alert variant="success">
        The account has been activated successfully. Now you can
        <Link to="/signin">
          &nbsp; sign in
            </Link>
      </Alert>
    );
  };

  return (
    <div className="row">
      <div className="col">
        {renderContent()}
      </div>
    </div>
  )
}

ConfirmAccount.propTypes = {
  confirmAccount: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  signErrors: PropTypes.array
}

const mapStateToProps = state => ({
  signErrors: state.sign.signErrors
});

export default connect(mapStateToProps, { confirmAccount, resetError })(ConfirmAccount);