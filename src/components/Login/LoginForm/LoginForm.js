import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Form} from 'react-bootstrap';
import SuccessMsg from '../../Util/SuccessMsg';
import {SimpleError} from '../../Errors';

class LoginForm extends Component {

  state = {
    email: "",
    emailError: false,
    password: "",
    passwordError: false
  }

  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

  changeEmail = (e) => {
    e.preventDefault();

    let emailError = false;

    if(!e.target.value || !e.target.validity.valid){
      emailError = true;
    }

    this.setState({
      emailError,
      email: e.target.value
    })
  }

  changePassword = (e) => {

    const {value} = e.target;
    let passwordError = false;

    if(!value/* || !this.strongRegex.test(value)*/)
      passwordError = true;

    this.setState({
      password: value,
      passwordError
    });
  }

  login = (e) => {
    e.preventDefault();
    const emailInput = e.target.email;
    
    const {email, password} = this.state;

    let emailError = false;
    let passwordError = false;

    if(!email || !emailInput.validity.valid){
      emailError = true;
    }

    if(!password/* || !this.strongRegex.test(password)*/){
      passwordError = true;
    }

    if(emailError || passwordError) {
      this.setState({
        emailError,
        passwordError
      });

      return false;
    }

    this.props.signInRq(email, password);

  }

  renderErrorMsgs = () => {
    const {resetError, signError} = this.props;

    if(signError && signError.hasOwnProperty("code"))
      return (
        <SimpleError
            callback={resetError}
            errorObj={signError}
            show={true}
            timeout={5000} />
      );
  }

  showNewUserForm = (e) => {
    e.preventDefault();
    this.props.switchForms('NewUser');
  }

  render() {

    const {resetSuccessMsg, showLoginForm, signUpMsg} = this.props;
    const {emailError, passwordError} = this.state;

    return (
      <React.Fragment>
        <Form autoComplete="off"
          className={`login100-form validate-form ${showLoginForm ? "": "hidden"}`}
          onSubmit={this.login}
          style={{paddingTop: "25%"}}>
        
          <p className="h2 text-center" style={{marginBottom: 30}}>Member Login</p>

          <SuccessMsg
              callback={resetSuccessMsg}
              msg={signUpMsg}
              show={true}
              timeout={5000} />

          {this.renderErrorMsgs()}

          <Form.Group className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-envelope"/>
              </span>
            </div>
            <Form.Control 
              className={emailError ? " input-error": ""}
              name="email"
              onChange={this.changeEmail}
              type="email"
              placeholder="Email"/>
          </Form.Group>

          <Form.Group className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"/>
              </span>
            </div>
            <Form.Control 
              className={passwordError ? " input-error": ""}
              name="password"
              onChange={this.changePassword}
              type="password"
              placeholder="Password"/>
          </Form.Group>
          
          <div className="text-center" style={{marginBottom: 10, marginTop: 25}}>
            <Button
                className="btn-lg"
                type="submit"
                variant="success">
              Login
            </Button>
          </div>

          <div className="text-center">
            <button className="btn btn-link"
                onClick={this.showNewUserForm}
              >
              Create your Account
            </button>
          </div>

        </Form>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  resetError: PropTypes.func.isRequired,
  resetSuccessMsg: PropTypes.func.isRequired,
  showLoginForm: PropTypes.bool.isRequired,
  signError: PropTypes.object,
  signInRq: PropTypes.func.isRequired,
  signUpMsg: PropTypes.string,
  switchForms: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
}

export default LoginForm;