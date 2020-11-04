import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Button, Card } from 'react-bootstrap';

import { SimpleClosableError } from '../Errors';

import { getProfileRq, resetUserError, updatePasswordRq, updateProfileRq } from '../../actions/userActions';

import DatePicker from 'react-datepicker';

import './my-account.css';

function MyAccount({
  getProfileRq,
  profile,
  resetUserError,
  successRq,
  token,
  updatePasswordRq,
  updatePasswordRqFlag,
  updateProfileRq,
  updateProfileRqFlag,
  userErrors
}) {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const maxDate = new Date(year - 18, month, day);
  const minDate = new Date(year - 150, month, day);
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_$%^&*])(?=.{8,})'
  );

  const [birthday, setBirthday] = useState(maxDate);
  const [genre, setGenre] = useState('M');
  const [lastname, setLastname] = useState('');
  const [name, setName] = useState('');

  const [opwd, setOpwd] = useState('');
  const [npwd, setNpwd] = useState('');
  const [vnpwd, setVnpwd] = useState('');

  const [birthdayError, setBirthdayError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [npwdError, setNpwdError] = useState(false);
  const [vnpwdError, setVnpwdError] = useState(false);

  const [genericPrErrors, setGenericPrErrors] = useState(null);
  const [genericPaErrors, setGenericPaErrors] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(successRq);

  const stateSetters = {
    birthday: setBirthday,
    birthdayError: setBirthdayError,
    genre: setGenre,
    lastname: setLastname,
    lastnameError: setLastnameError,
    npwd: setNpwd,
    npwdError: setNpwdError,
    name: setName,
    nameError: setNameError,
    opwd: setOpwd,
    vnpwd: setVnpwd,
    vnpwdError: setVnpwdError
  };

  useEffect(function () {
    getProfileRq(token);
  }, [getProfileRq, token]);

  useEffect(function () {
    if (profile) {
      setBirthday(new Date(profile.birthday));
      setGenre(profile.genre);
      setLastname(profile.lastname);
      setName(profile.name);
    }
  }, [profile]);

  useEffect(function () {
    setShowSuccessMsg(updatePasswordRqFlag || updateProfileRqFlag);
    setNpwd('');
    setOpwd('');
    setVnpwd('');
  }, [setShowSuccessMsg, updatePasswordRqFlag, updateProfileRqFlag]);

  const handleChangeInput = (e) => {

    if (e.target.type !== 'radio') e.preventDefault();
    const { name, value } = e.target;

    if (name === 'npwd') {
      handleChangePwd(e);
      return;
    }

    if (name === 'vnpwd') {
      stateSetters[name](value);
      if (value !== npwd) {
        stateSetters[name + "Error"](true);
        return false;
      } else {
        stateSetters[name + "Error"](false);
      }

      return;
    }

    stateSetters[name](value);
    if (stateSetters[name + 'Error']) {
      if (!value)
        stateSetters[name + 'Error'](true);
      else
        stateSetters[name + 'Error'](false);
    }
    return;

  }

  const handleChangePwd = (e) => {
    const pwd = e.target.value;
    if (validatePassword(pwd)) {
      setNpwd(pwd);
      setNpwdError(false);
    } else {
      setNpwd(pwd);
      setNpwdError(true);
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();

    if (!lastname && !name) {
      setGenericPrErrors(["All fields are required"]);
      return false;
    }

    if (!birthday || !genre || !lastname || !name)
      return false;

    if (birthdayError || lastnameError || nameError)
      return false;

    updateProfileRq({
      birthday,
      genre,
      lastname,
      name
    }, token);

  }

  const updatePassword = (e) => {

    e.preventDefault();

    if (!opwd && !npwd && !vnpwd) {
      setGenericPaErrors(["All fields are required"])
      return false;
    }

    if (!opwd || !npwd || !vnpwd)
      return false;

    if (npwdError || vnpwdError)
      return false;

    if(npwd !== vnpwd) {
      setGenericPaErrors(["New passwords needs to be equals"]);
      return false;
    }

    if (opwd === npwd) {
      setGenericPaErrors(["New password needs to be different than the old one"]);
      return false;
    }

    updatePasswordRq({
      oldPassword: opwd,
      newPassword: npwd,
    }, token);

  }

  const validatePassword = (pwd) => {
    if (!pwd || !strongRegex.test(pwd)) return false;
    return true;
  };

  const renderFormErrors = (errors, onCloseFn) => {
    const closeFn = () => {
      onCloseFn(null);
    }
    return <SimpleClosableError errors={errors} onCloseFn={closeFn} visible={true} />;
  }

  const renderSuccessMsg = function (msg) {
    return (
      <Alert dismissible onClose={() => setShowSuccessMsg(false)} variant="success">
        {msg}
      </Alert>
    )
  }

  const renderResponseErrors = function () {
    return <SimpleClosableError errors={userErrors} onCloseFn={resetUserError} />;
  }

  return (
    <Card className="card-container">
      <Card.Body>
        <form className="profile-container" onSubmit={updateProfile}>
          <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 5 }}>
            <span className="h3">Update profile</span>
          </div>
          { userErrors ? renderResponseErrors() : null}
          {genericPrErrors ? renderFormErrors(genericPrErrors, setGenericPrErrors) : null}
          {showSuccessMsg ? renderSuccessMsg(updateProfileRqFlag ? "Profile updated successfully" : "Password updated successfully") : null}
          <div className="form-row pt-3">
            <div className="form-group col">
              <label htmlFor="name">Name</label>
              <input
                className={'form-control form-control-sm' + (nameError ? ' input-error' : '')}
                id="name"
                name="name"
                onChange={handleChangeInput}
                type="text"
                value={name} />
            </div>
            <div className="form-group col">
              <label htmlFor="lastname">Lastname</label>
              <input
                className={'form-control form-control-sm' + (lastnameError ? ' input-error' : '')}
                id="name"
                name="lastname"
                onChange={handleChangeInput}
                type="text"
                value={lastname}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="birthday">Birthday</label>
              <DatePicker
                className={'form-control form-control-sm' + (birthdayError ? ' input-error' : '')}
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
            <div className="col form-group">
              <label htmlFor="genre">Genre</label>
              <div>
                <div className="form-check form-check-inline">
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
                    style={{ paddingRight: 10, paddingTop: 3 }} >
                    M
                  </label>
                </div>
                <div className="form-check form-check-inline">
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
                    style={{ paddingTop: 3 }} >
                    F
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="submit" variant="success">Update profile</Button>
          </div>
        </form>
        <form className="password-container" onSubmit={updatePassword}>
          <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 5 }}>
            <span className="h3">Change password</span>
          </div>
          {genericPaErrors ? renderFormErrors(genericPaErrors, setGenericPaErrors) : null}
          <div className="form-row pt-3">
            <div className="form-group col-6">
              <label htmlFor="old-password">Old password</label>
              <input
                className="form-control form-control-sm"
                onChange={handleChangeInput}
                type="password"
                name="opwd"
                id="old-password"
                value={opwd} />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="new-pwd">New password</label>
              <input
                type="password"
                name="npwd"
                id="new-pwd"
                className={'form-control form-control-sm' + (npwdError ? ' input-error' : '')}
                onChange={handleChangeInput}
                value={npwd} />
              {npwdError ? <span className="error-msg">Insecure password</span> : null}
            </div>
            <div className="col form-group">
              <label htmlFor="vnew-pwd">Confirm new password</label>
              <input
                type="password"
                name="vnpwd"
                id="vn-pwd"
                className={'form-control form-control-sm' + (vnpwdError ? ' input-error' : '')}
                onChange={handleChangeInput}
                value={vnpwd} />
              {vnpwdError ? <span className="error-msg">Passwords don't match</span> : null}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="submit" variant="success">Update password</Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  )
}

MyAccount.propTypes = {
  getProfileRq: PropTypes.func.isRequired,
  profile: PropTypes.object,
  resetUserError: PropTypes.func.isRequired,
  successRq: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  updatePasswordRq: PropTypes.func.isRequired,
  updatePasswordRqFlag: PropTypes.bool.isRequired,
  updateProfileRq: PropTypes.func.isRequired,
  updateProfileRqFlag: PropTypes.bool.isRequired,
  userErrors: PropTypes.array
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  successRq: state.user.successRq,
  token: state.sign.userData.token,
  updatePasswordRqFlag: state.user.updatePasswordRqFlag,
  updateProfileRqFlag: state.user.updateProfileRqFlag,
  userErrors: state.user.userErrors
});

export default connect(mapStateToProps, { getProfileRq, resetUserError, updatePasswordRq, updateProfileRq })(MyAccount);