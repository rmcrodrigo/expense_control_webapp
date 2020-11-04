import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { setSpinnerVisibility } from '../../../actions/appActions';
import { resetPasswordRq } from '../../../actions/userActions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPasswordForm({ resetPasswordRq, setSpinnerVisibility, successRq, userErrors }) {

  const [npwd, setNpwd] = useState('');
  const [npwdError, setNpwdError] = useState(false);
  const [cnpwd, setcnpwd] = useState('');
  const [cnpwdError, setCnpwdError] = useState(false);
  const [token, setToken] = useState('');
  const [tokenError, setTokenError] = useState('');

  const queryFinder = useQuery();

  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_$%^&*])(?=.{8,})'
  );

  useEffect(function () {
    setSpinnerVisibility(false);

    const vToken = queryFinder.get("token");
    if (vToken)
      setToken(vToken);
    else
      setTokenError(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeNPwd = (e) => {
    const vPwd = e.target.value;
    validNpwd(vPwd);
  }

  const handleChangeCNPwd = (e) => {
    const vCnpwd = e.target.value;
    validCnpwd(vCnpwd);
  }

  const resetPassword = (e) => {
    e.preventDefault();
    const npwdInput = e.target.npwd;
    const cnpwdInput = e.target.cnpwd;
    if (!validNpwd(npwdInput.value) || !validCnpwd(cnpwdInput.value)) {
      return false;
    }
    resetPasswordRq(npwd, token);
    return false;
  }

  const validNpwd = (vPwd) => {
    setNpwd(vPwd);
    if (!vPwd || !strongRegex.test(vPwd)) {
      setNpwdError(true);
      return false;
    } else {
      setNpwdError(false);
    }
    return true;
  }

  const validCnpwd = (vCnpwd) => {
    setcnpwd(vCnpwd);
    if (vCnpwd !== npwd) {
      setCnpwdError(true);
      return false;
    } else {
      setCnpwdError(false);
    }
    return true;
  }

  const renderResetPasswordContent = function() {
    return (
      <form className="ml-3 mr-3 mt-4" onSubmit={resetPassword}>
          <div className="form-group">
            <label htmlFor="npwd">New password</label>
            <input
              type="password"
              onChange={handleChangeNPwd}
              name="npwd"
              id="npwd"
              className={"form-control" + (npwdError ? " input-error" : "")}
              value={npwd} />
          </div>
          <div className="form-group">
            <label htmlFor="cnpwd">Confirm new password</label>
            <input
              type="password"
              onChange={handleChangeCNPwd}
              name="cnpwd"
              id="cnpwd"
              className={"form-control" + (cnpwdError ? " input-error" : "")}
              value={cnpwd} />
          </div>
          <div className="mt-3">
            <Link to="/signin" className="btn btn-secondary mr-2">Cancel</Link>
            <input type="submit" value="Reset password" className="btn btn-success" />
          </div>
        </form>
    );
  }

  const renderResponseError = () => {
    if(!userErrors || userErrors.length <= 0)
      return null;

    return (
      <div className="mt-5">
        <Alert className="p4" variant="danger">
          {userErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Alert>
        <div className="text-center">
          <Link to="/signin" className="btn btn-secondary mt-3">Cancel</Link>
        </div>
      </div>
    )
  }

  const renderSuccessMsg = function() {
    return (
      <div className="mt-5">
        <Alert className="p-4" variant="success">
          Your password has been updated successfully.
        </Alert>
        <div className="text-center">
          <Link to="/signin" className="btn btn-success mt-3">Login</Link>
        </div>
      </div>
    )
  }

  const renderTokenError = function() {
    return (
      <div className="mt-5">
        <Alert className="p-4" variant="danger">
          An error has ocurred, please try again later
        </Alert>
        <div className="text-center">
          <Link to="/signin" className="btn btn-secondary mt-3">Cancel</Link>
        </div>
      </div>
    )
  }

  const renderComponent = function() {
    if(tokenError)
      return renderTokenError();
    if(userErrors && userErrors.length > 0)
      return renderResponseError();
    if(!userErrors && successRq)
      return renderSuccessMsg();
    return renderResetPasswordContent();
  }

  return (
    <div className="col mt-4">
      <p className="h2 font-weight-bold text-center">Reset your password</p>
      { renderComponent() }
    </div>
  )
}

ResetPasswordForm.propTypes = {
  resetPasswordRq: PropTypes.func.isRequired,
  setSpinnerVisibility: PropTypes.func.isRequired,
  successRq: PropTypes.bool,
  userErrors: PropTypes.array
};

const mapStateToProps = state => ({
  successRq: state.user.successRq,
  userErrors: state.user.userErrors
});

export default connect(mapStateToProps, { resetPasswordRq, setSpinnerVisibility })(ResetPasswordForm);