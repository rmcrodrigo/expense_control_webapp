import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setSpinnerVisibility } from '../../../actions/appActions';
import { requestResetPassword } from '../../../actions/userActions';

function ResetPassword({
  setSpinnerVisibility
}) {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [requestSended, setRequestSended] = useState(false);

  useEffect(function () {
    setSpinnerVisibility(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    validEmail(e.target);
  }

  const handleResetPassword = (e) => {
    e.preventDefault();
    const emailInput = e.target.email;
    if(validEmail(emailInput)) {
      setRequestSended(true);
      requestResetPassword(email);
    }
  }

  const validEmail = (emailInput) => {
    setEmail(emailInput.value);
    if(!emailInput.value || !emailInput.validity.valid) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
    }
    return true;
  }

  return (
    <div className="col mt-4">
      <p className="h2 font-weight-bold text-center">Reset password</p>
      { !requestSended ?
      <form className="mt-3 ml-4 mr-4" onSubmit={handleResetPassword}>
        <span>Input the email you have used to register to the page</span>
        <div className="mt-2">
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className={"form-control" + (emailError ? " input-error" : "")}
            placeholder="email@example.com"
            value={email} />
        </div>
        { emailError ?
          <p className="error" style={{color: "red"}}>Invalid email format</p>
          : null
        }
        <div className="mt-2">
          <Link className="btn btn-secondary mr-2" to="/signin">Cancel</Link>
          <input className="btn btn-success" type="submit" value="Submit"/>
        </div>
      </form>
      : <span>We have sent and email with the instructions to reset your password. <Link to="/sign">Go back</Link>.</span> }
    </div>
  )
}

ResetPassword.propTypes = {
  setSpinnerVisibility: PropTypes.func.isRequired
}

export default connect(null, { setSpinnerVisibility })(ResetPassword);