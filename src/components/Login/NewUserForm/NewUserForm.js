import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';

import { SimpleError } from '../../Errors';

import {
  githubSign,
  resetError,
  signUpRq
} from '../../../actions/signActions';
import { setSpinnerVisibility } from '../../../actions/appActions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NewUserForm = ({
  githubSign,
  resetError,
  setSpinnerVisibility,
  signErrors,
  signUpRq,
  userData
}) => {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const maxDate = new Date(year - 18, month, day);
  const minDate = new Date(year - 150, month, day);
  const history = useHistory();

  const [birthday, setBirthday] = useState(maxDate);
  const [birthdayError, setBirthdayError] = useState(false);
  const [cPwd, setCPwd] = useState('');
  const [cPwdError, setCPwdError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [genre, setGenre] = useState('M');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [lastname, setLastname] = useState('');
  const [lastnameError, setLastnameError] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState(false);

  const stateSetters = {
    birthday: setBirthday,
    birthdayError: setBirthdayError,
    cPwd: setCPwd,
    cPwdError: setCPwdError,
    email: setEmail,
    emailError: setEmailError,
    genre: setGenre,
    name: setName,
    nameError: setNameError,
    lastname: setLastname,
    lastnameError: setLastnameError,
    pwd: setPwd,
    pwdError: setPwdError,
  };

  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );

  const queryFinder = useQuery();

  useEffect(() => {
    const code = queryFinder.get("code");
    if (!code)
      setSpinnerVisibility(false);
    else {
      githubSign(code, history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData) {
      const { birthday, email, name } = userData;
      if (birthday) setBirthday(birthday);
      if (email) setEmail(email);
      if (name) setName(name);
    }
  }, [userData]);

  const createUser = (e) => {
    e.preventDefault();

    const { email } = e.target;

    let lBirthdayError = false,
      lCPwdError = false,
      lEmailError = false,
      lNameError = false,
      lLastnameError = false,
      lPwdError = false;

    const lBirthday = new Date(birthday);

    if (!lBirthday.getTime()) lBirthdayError = true;
    if (!validateCPassword(cPwd)) lCPwdError = true;
    if (!validateEmail(email)) lEmailError = true;
    if (!name) lNameError = true;
    if (!lastname) lLastnameError = true;
    if (!validatePassword(pwd)) lPwdError = true;

    setBirthdayError(lBirthdayError);
    setCPwdError(lCPwdError);
    setEmailError(lEmailError);
    setNameError(lNameError);
    setLastnameError(lLastnameError);
    setPwdError(lPwdError);

    if (
      lBirthdayError ||
      lCPwdError ||
      lEmailError ||
      lNameError ||
      lLastnameError ||
      lPwdError
    )
      return false;

    const user = {
      birthday: lBirthday.getTime(),
      email: email.value,
      genre,
      name,
      lastname,
      password: pwd,
    };

    signUpRq(user, history);
  };

  const handleChangeInput = (e) => {
    if (e.target.type !== 'radio') e.preventDefault();

    const { name, value } = e.target;

    if (name === 'email') {
      if (!validateEmail(e.target)) {
        setEmail(value);
        setEmailError(true);
      } else {
        setEmail(value);
        setEmailError(false);
      }
      return;
    }

    if (name === 'pwd') {
      handleChangePwd(e);
      return;
    }

    if (name === 'cPwd') {
      handleChangeCPwd(e);
      return;
    }

    if (!value) {
      stateSetters[name](value);
      if (stateSetters[name + 'Error'])
        stateSetters[name + 'Error'](true);
    } else {
      stateSetters[name](value);
      if (stateSetters[name + 'Error'])
        stateSetters[name + 'Error'](false);
    }
  };

  const handleChangePwd = (e) => {
    const pwd = e.target.value;
    if (validatePassword(pwd)) {
      setPwd(pwd);
      setPwdError(false);
    } else {
      setPwd(pwd);
      setPwdError(true);
    }
  };

  const handleChangeCPwd = (e) => {
    const cPwd = e.target.value;
    if (validateCPassword(cPwd)) {
      setCPwd(cPwd);
      setCPwdError(false);
    } else {
      setCPwd(cPwd);
      setCPwdError(true);
    }
  };

  const renderErrors = () => {
    if (signErrors && signErrors.length > 0)
      return (
        <SimpleError errors={signErrors} callback={resetError} timeout={5000} />
      );
    return null;
  };

  const validateEmail = (input) => {
    if (!input.value || !input.validity.valid) return false;
    return true;
  };

  const validatePassword = (pwd) => {
    if (!pwd || !strongRegex.test(pwd)) return false;
    return true;
  };

  const validateCPassword = (cPwd) => {
    if (!cPwd || cPwd !== pwd.toString()) return false;
    return true;
  };

  let showCPwdError = false;
  if (pwd.length > 0 && cPwdError) showCPwdError = true;

  return (
    <div className="col m-4">
      <form
        autoComplete="off"
        className='login100-form validate-form'
        onSubmit={createUser}
      >
        <p className="h2 text-center" style={{ paddingBottom: 20 }}>
          Sign up
        </p>
        {renderErrors()}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user" />
            </span>
          </div>
          <input
            className={'form-control ' + (nameError ? ' input-error' : '')}
            name="name"
            onChange={handleChangeInput}
            placeholder="Name"
            type="text"
            value={name}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user" />
            </span>
          </div>
          <input
            className={'form-control ' + (lastnameError ? ' input-error' : '')}
            name="lastname"
            onChange={handleChangeInput}
            placeholder="Lastname"
            type="text"
          />
        </div>

        <div className="form-row">

          <div className="col-7 col-sm-7 col-md-7 form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-calendar" />
              </span>
            </div>
            <DatePicker
              className={'form-control' + (birthdayError ? ' input-error' : '')}
              dateFormat="dd/MM/yyyy"
              maxDate={maxDate}
              minDate={minDate}
              name="birthday"
              onChange={date => setBirthday(date)}
              placeholder="dd/mm/yyy"
              selected={birthday}
              showYearDropdown
            />

          </div>

          <div className="col-5 col-sm-5 col-md-5 form-group form-check form-check-inline">
            <i
              className="fa fa-venus-mars"
              style={{ paddingLeft: 5, paddingRight: 10 }}
            />
            <input
              checked={genre === 'M'}
              className="form-check-input"
              name="genre"
              onChange={handleChangeInput}
              type="radio"
              value="M"
            />
            <label
              className="radio-inline form-check-label"
              style={{ paddingRight: 10, paddingTop: 3 }}
            >
              M
            </label>
            <input
              checked={genre === 'F'}
              className="form-check-input"
              name="genre"
              onChange={handleChangeInput}
              type="radio"
              value="F"
            />
            <label
              className="radio-inline form-check-label"
              style={{ paddingTop: 3 }}
            >
              F
            </label>
          </div>

        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
          </div>
          <input
            className={'form-control ' + (emailError ? ' input-error' : '')}
            name="email"
            onChange={handleChangeInput}
            placeholder="Email"
            type="email"
            value={email}
          />
          <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
            <p className={!emailError ? ' hidden' : ''} style={{ color: 'red' }}>
              Invalid email
          </p>
          </div>
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock" />
            </span>
          </div>
          <input
            className={'form-control ' + (pwdError ? ' input-error' : '')}
            name="pwd"
            onChange={handleChangeInput}
            placeholder="Password"
            type="password"
          />
          <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
            <p className={!pwdError ? ' hidden' : ''} style={{ color: 'red' }}>
              Insecure password
          </p>
          </div>
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock" />
            </span>
          </div>
          <input
            className={'form-control ' + (showCPwdError ? ' input-error' : '')}
            name="cPwd"
            onChange={handleChangeInput}
            placeholder="Confirm password"
            type="password"
          />
          <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
            <p className={showCPwdError ? '' : 'hidden'} style={{ color: 'red' }}>
              Passwords do not match
          </p>
          </div>
        </div>

        <div style={{ paddingTop: 13, paddingLeft: 7 }} className="row mx-auto">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <Link
              className="btn btn-md btn-secondary"
              to="/signin"
            >
              Return
          </Link>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <button className=" btn btn-md btn-primary" type="submit">
              Sign up
          </button>
          </div>
        </div>
      </form>
    </div>
  );
    
};

NewUserForm.propTypes = {
  githubSign: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  setSpinnerVisibility: PropTypes.func.isRequired,
  signErrors: PropTypes.array,
  signUpRq: PropTypes.func.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = (state) => ({
  signErrors: state.sign.signErrors,
  userData: state.sign.userData
});

export default connect(mapStateToProps, { githubSign, resetError, setSpinnerVisibility, signUpRq })(NewUserForm);