import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { SimpleError } from '../../Errors';

const NewUserForm = ({
  resetError,
  showNewUserForm,
  signErrors,
  signUpRq,
  switchForms,
}) => {
  const [birthday, setBirthday] = useState(new Date());
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

  const createUser = (e) => {
    e.preventDefault();

    const { lEmail } = e.target;

    let lBirthdayError = false,
      lCPwdError = false,
      lEmailError = false,
      lNameError = false,
      lLastnameError = false,
      lPwdError = false;

    if (!birthday.getTime()) lBirthdayError = true;
    if (!validateCPassword(cPwd)) lCPwdError = true;
    if (!validateEmail(lEmail)) lEmailError = true;
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
      birthday,
      email: email,
      genre,
      name,
      lastname,
      password: pwd,
    };

    signUpRq(user);
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
      stateSetters[name + 'Error'](true);
    } else {
      stateSetters[name](value);
      stateSetters[name + 'Error'](false);
    }
  };

  const handleChangeDate = (date) => {
    setBirthday(date);
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

  const showLoginForm = () => {
    switchForms('Login');
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
    <form
      autoComplete="off"
      className={`login100-form validate-form ${
        showNewUserForm ? '' : 'hidden'
      }`}
      onSubmit={createUser}
    >
      <p className="h2 text-center" style={{ paddingBottom: 20 }}>
        Registro de nuevo usuario
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
          placeholder="Nombre"
          type="text"
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
          placeholder="Apellidos"
          type="text"
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-calendar" />
          </span>
        </div>
        <DatePicker
          className={'form-control' + (birthdayError ? ' input-error' : '')}
          dateFormat="dd/MM/yyyy"
          name="birthday"
          onChange={handleChangeDate}
          placeholder="dd/mm/yyy"
          selected={birthday}
          showYearDropdown
        />
      </div>

      <div className="form-group form-check form-check-inline">
        <i
          className="fa fa-venus-mars"
          style={{ paddingLeft: 36, paddingRight: 10 }}
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
          placeholder="Correo electronico"
          type="email"
        />
        <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
          <p className={!emailError ? ' hidden' : ''} style={{ color: 'red' }}>
            Correo invalido
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
          placeholder="Contrasena"
          type="password"
        />
        <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
          <p className={!pwdError ? ' hidden' : ''} style={{ color: 'red' }}>
            Contrase&ntilde;a insegura
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
          placeholder="Repite la contrasena"
          type="password"
        />
        <div className="input-group" style={{ margin: '5px 0 0 45px' }}>
          <p className={showCPwdError ? '' : 'hidden'} style={{ color: 'red' }}>
            Las contrase&ntilde;as no coinciden
          </p>
        </div>
      </div>

      <div style={{ paddingTop: 13, paddingLeft: 7 }} className="row mx-auto">
        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
          <button
            className="btn btn-md btn-secondary"
            onClick={showLoginForm}
            type="button"
          >
            Regresar
          </button>
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
          <button className=" btn btn-md btn-primary" type="submit">
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
};

NewUserForm.propTypes = {
  resetError: PropTypes.func.isRequired,
  showNewUserForm: PropTypes.bool.isRequired,
  signErrors: PropTypes.array,
  signUpRq: PropTypes.func.isRequired,
  switchForms: PropTypes.func.isRequired,
};

export default NewUserForm;
