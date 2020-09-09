import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SuccessMsg from '../../Util/SuccessMsg';
import { SimpleError } from '../../Errors';

function LoginForm({
  resetError,
  resetSuccessMsg,
  showLoginForm,
  signErrors,
  signInRq,
  signUpMsg,
  switchForms,
}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const changeEmail = (e) => {
    e.preventDefault();

    let emailError = false;

    if (!e.target.value || !e.target.validity.valid) {
      emailError = true;
    }

    setEmailError(emailError);
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    const { value } = e.target;
    let passwordError = false;

    if (!value) passwordError = true;

    setPassword(value);
    setPasswordError(passwordError);
  };

  const login = (e) => {
    e.preventDefault();
    const emailInput = e.target.email;

    let _emailError = false;
    let _passwordError = false;

    if (!email || !emailInput.validity.valid) {
      _emailError = true;
    }

    if (!password) {
      _passwordError = true;
    }

    if (_emailError || _passwordError) {
      setEmailError(_emailError);
      setPasswordError(passwordError);

      return false;
    }

    signInRq(email, password);
  };

  const renderErrorMsgs = () => {
    if (signErrors && signErrors.length > 0) {
      return (
        <SimpleError
          callback={resetError}
          errors={signErrors}
          timeout={10000}
        />
      );
    }
    return null;
  };

  const showNewUserForm = (e) => {
    e.preventDefault();
    switchForms('NewUser');
  };

  return (
    <React.Fragment>
      <form
        autoComplete="off"
        className={`login100-form validate-form ${
          showLoginForm ? '' : 'hidden'
        }`}
        onSubmit={login}
        style={{ paddingTop: '25%' }}
      >
        <p className="h2 text-center" style={{ marginBottom: 30 }}>
          Member Login
        </p>

        <SuccessMsg
          callback={resetSuccessMsg}
          msg={signUpMsg}
          show={true}
          timeout={5000}
        />

        {renderErrorMsgs()}

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope" />
            </span>
          </div>
          <input
            className={'form-control ' + (emailError ? ' input-error' : '')}
            name="email"
            onChange={changeEmail}
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock" />
            </span>
          </div>
          <input
            className={'form-control ' + (passwordError ? ' input-error' : '')}
            name="password"
            onChange={changePassword}
            type="password"
            placeholder="Password"
          />
        </div>

        <div
          className="text-center"
          style={{ marginBottom: 10, marginTop: 25 }}
        >
          <button className="btn btn-lg btn-success" type="submit">
            Login
          </button>
        </div>

        <div className="text-center">
          <button className="btn btn-link" type="button" onClick={showNewUserForm}>
            Create your Account
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

LoginForm.propTypes = {
  resetError: PropTypes.func.isRequired,
  resetSuccessMsg: PropTypes.func.isRequired,
  showLoginForm: PropTypes.bool.isRequired,
  signErrors: PropTypes.array,
  signInRq: PropTypes.func.isRequired,
  signUpMsg: PropTypes.string,
  switchForms: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

export default LoginForm;
