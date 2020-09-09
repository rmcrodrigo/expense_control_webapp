/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Login.css';
import LoginForm from './LoginForm/LoginForm';
import NewUserForm from './NewUserForm/NewUserForm';
import {
  resetError,
  resetSuccessMsg,
  signInRq,
  signUpRq,
  switchForms,
} from '../../actions/signActions';

const Login = ({
  history,
  resetError,
  resetSuccessMsg,
  showLoginForm,
  showNewUserForm,
  signInRq,
  signUpMsg,
  signUpRq,
  switchForms,
  signErrors,
  userData,
}) => {

  useEffect(() => {
    if (userData && userData.token) {
      const myDate = new Date();
      myDate.setTime(myDate.getTime() + 2 * 60 * 60 * 1000);
      localStorage.setItem('userData', JSON.stringify(userData));
      history.push('/');
    }
  }, [userData]);

  return (
    <div id="login-container">
      <div id="login-box" className="row">
        <div className="login100-pic js-tilt col-0 col-sm-0 col-md-6 col-lg-6">
          <img src="/images/img-01.png" alt="IMG"></img>
        </div>

        <div className="col-12 col-sm-12 col-md-6 col-lg-6 login-data">
          <LoginForm
            resetError={resetError}
            resetSuccessMsg={resetSuccessMsg}
            showLoginForm={showLoginForm}
            signErrors={signErrors}
            signInRq={signInRq}
            signUpMsg={signUpMsg}
            switchForms={switchForms}
            userData={userData}
          />
          <NewUserForm
            resetError={resetError}
            showNewUserForm={showNewUserForm}
            signErrors={signErrors}
            signUpRq={signUpRq}
            switchForms={switchForms}
          />
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  resetError: PropTypes.func.isRequired,
  resetSuccessMsg: PropTypes.func.isRequired,
  showLoginForm: PropTypes.bool.isRequired,
  showNewUserForm: PropTypes.bool.isRequired,
  signErrors: PropTypes.array,
  signInRq: PropTypes.func.isRequired,
  signUpMsg: PropTypes.string,
  signUpRq: PropTypes.func.isRequired,
  switchForms: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  showLoginForm: state.sign.signData.showLoginForm,
  showNewUserForm: state.sign.signData.showNewUserForm,
  signErrors: state.sign.signErrors,
  signUpMsg: state.sign.signUpMsg,
  userData: state.sign.userData,
});

export default connect(mapStateToProps, {
  resetError,
  resetSuccessMsg,
  signInRq,
  signUpRq,
  switchForms,
})(Login);
