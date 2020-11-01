import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { getProfile } from '../../actions/userActions';

import DatePicker from 'react-datepicker';

import './my-account.css';

function MyAccount({
  getProfile,
  profile,
  token
}) {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const maxDate = new Date(year - 18, month, day);
  const minDate = new Date(year - 150, month, day);
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );

  const [birthday, setBirthday] = useState(maxDate);
  const [email, setEmail] = useState('');
  const [genre, setGenre] = useState('M');
  const [lastname, setLastname] = useState('');
  const [name, setName] = useState('');

  const [opwd, setOpwd] = useState('');
  const [npwd, setNpwd] = useState('');
  const [vnpwd, setVnpwd] = useState('');

  const [birthdayError, setBirthdayError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [npwdError, setNpwdError] = useState(false);
  const [vnpwdError, setVnpwdError] = useState(false);

  const stateSetters = {
    birthday: setBirthday,
    birthdayError: setBirthdayError,
    email: setEmail,
    emailError: setEmailError,
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
    getProfile(token);
  }, [token]);

  useEffect(function () {
    if (profile) {
      setBirthday(new Date(profile.birthday));
      setEmail(profile.email);
      setGenre(profile.genre);
      setLastname(profile.lastname);
      setName(profile.name);
    }
  }, [profile]);

  const handleChangeInput = (e) => {

    if (e.target.type !== 'radio') e.preventDefault();
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
      if (!validateEmail(e.target)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      return;
    }

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

  const updateProfile = () => {

  }

  const updatePassword = () => {
  }

  const validateEmail = (input) => {
    if (!input.value || !input.validity.valid) return false;
    return true;
  };

  const validatePassword = (pwd) => {
    if (!pwd || !strongRegex.test(pwd)) return false;
    return true;
  };

  return (
    <Card className="my-account-container">
      <Card.Body>
        <form className="profile-container" onSubmit={updateProfile}>
          <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 10 }}>
            <span className="h3">Update profile</span>
          </div>
          <div className="form-row" style={{ marginTop: 15 }}>
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
              <label htmlFor="email">Email</label>
              <input
                className={'form-control form-control-sm' + (emailError ? ' input-error' : '')}
                id="email"
                name="email"
                onChange={handleChangeInput}
                type="text"
                value={email} />
            </div>
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
          </div>
          <div className="form-row">
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
          <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 10 }}>
            <span className="h3">Change password</span>
          </div>
          <div className="form-row">
            <div className="form-group col-6" style={{ marginTop: 15 }}>
              <label htmlFor="old-password">Old password</label>
              <input
                className="form-control form-control-sm"
                onChange={handleChangeInput}
                type="text"
                name="opwd"
                id="old-password" />
            </div>
          </div>
          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="new-pwd">New password</label>
              <input
                type="text"
                name="npwd"
                id="new-pwd"
                className={'form-control form-control-sm' + (npwdError ? ' input-error' : '')}
                onChange={handleChangeInput} />
            </div>
            <div className="col form-group">
              <label htmlFor="vnew-pwd">Confirm new password</label>
              <input
                type="text"
                name="vnpwd"
                id="vn-pwd"
                className={'form-control form-control-sm' + (vnpwdError ? ' input-error' : '')}
                onChange={handleChangeInput} />
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
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  token: state.sign.userData.token
});

export default connect(mapStateToProps, { getProfile })(MyAccount);