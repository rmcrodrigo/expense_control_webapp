import React from 'react';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';
import PropTypes from 'prop-types';

import './Login.css';
import LoginForm from './LoginForm/LoginForm';
import NewUserForm from './NewUserForm/NewUserForm';
import {resetError, resetSuccessMsg, signInRq, signUpRq, switchForms} from '../../actions/signActions';

class Login extends React.Component {

  componentDidMount(){
    const {userData, signedIn} = this.props;
    if(signedIn || (userData && userData.id)){
      this.props.history.push("/");
    }
  }

  componentDidUpdate(){
    const {cookies, userData, signedIn} = this.props;
    if(signedIn && userData && userData.id){
      const myDate = new Date();
      myDate.setTime(myDate.getTime() + (2 * 60 * 60 * 1000));
      cookies.set("userData", this.props.userData, {expires: myDate});
      this.props.history.push("/");
    }
  }

  render(){

    const {resetError, resetSuccessMsg, showLoginForm, showNewUserForm, userData, signInRq, signUpMsg, signUpRq, switchForms, signError} = this.props;

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
              signError={signError}
              signInRq={signInRq}
              signUpMsg={signUpMsg}
              switchForms={switchForms}
              userData={userData}
            />
            <NewUserForm
              resetError={resetError}
              showNewUserForm={showNewUserForm}
              signError={signError}
              signUpRq={signUpRq}
              switchForms={switchForms}
            />
          </div>

        </div>

      </div>
    );
  }

}

Login.propTypes = {
  resetError: PropTypes.func.isRequired,
  resetSuccessMsg: PropTypes.func.isRequired,
  showLoginForm: PropTypes.bool.isRequired,
  showNewUserForm: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired,
  signError: PropTypes.object,
  signInRq: PropTypes.func.isRequired,
  signUpMsg: PropTypes.string,
  signUpRq: PropTypes.func.isRequired,
  switchForms: PropTypes.func.isRequired,
  userData: PropTypes.object,
}

const mapStateToProps = state => ({
  showLoginForm: state.sign.signData.showLoginForm,
  showNewUserForm: state.sign.signData.showNewUserForm,
  signError: state.sign.signError,
  signedIn: state.sign.signedIn,
  signUpMsg: state.sign.signUpMsg,
  userData: state.sign.userData
});

export default connect(mapStateToProps, {resetError, resetSuccessMsg, signInRq, signUpRq, switchForms})(withCookies(Login));