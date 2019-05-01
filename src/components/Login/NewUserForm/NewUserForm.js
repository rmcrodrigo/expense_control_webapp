import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import {Button, Form} from 'react-bootstrap';
import {SimpleError} from '../../Errors';

class NewUserForm extends Component {

    state = {
        birthday: new Date(),
        birthdayError: false,
        cPwd: "",
        cPwdError: false,
        email: "",
        emailError: false,
        genre: "M",
        name: "",
        nameError: false,
        lastname: "",
        lastnameError: false,
        pwd: "",
        pwdError: false
    };

    strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

    createUser = (e) => {

        e.preventDefault();

        const {email} = e.target;

        const {
            birthday,
            cPwd,
            genre,
            name,
            lastname,
            pwd
        } = this.state;

        let birthdayError = false,
            cPwdError = false,
            emailError = false,
            nameError = false,
            lastnameError = false,
            pwdError = false;

        if(!birthday.getTime())
            birthdayError = true;
        if(!this.validateCPassword(cPwd))
            cPwdError = true;
        if(!this.validateEmail(email))
            emailError = true;
        if(!name)
            nameError = true;
        if(!lastname)
            lastnameError = true;
        if(!this.validatePassword(pwd))
            pwdError = true;

        this.setState({
            birthdayError,
            cPwdError,
            emailError,
            nameError,
            lastnameError,
            pwdError
        });

        if(birthdayError || cPwdError || emailError || nameError || lastnameError || pwdError)
            return false;

        const user = {
            birthday,
            email: this.state.email,
            genre,
            name,
            lastname,
            password: pwd
        }

        this.props.signUpRq(user);
    }

    handleChangeInput = e => {

        if(e.target.type !== "radio")
            e.preventDefault();
        
        const {name, value} = e.target;

        if(name === "email"){
            if(!this.validateEmail(e.target)){
                this.setState({
                    email: value,
                    emailError: true
                });
            } else {
                this.setState({
                    email: value,
                    emailError: false
                });
            }
            return;
        }

        if(name === "pwd"){
            this.handleChangePwd(e);
            return;
        }

        if(name === "cPwd"){
            this.handleChangeCPwd(e);
            return;
        }

        if(!value){
            this.setState({
                [name]: value,
                [name + "Error"]: true
            });
        } else {
            this.setState({
                [name]: value,
                [name + "Error"]: false
            });
        }
    }

    handleChangeDate = date => {
        this.setState({
            birthday: date
        });
    }

    handleChangePwd = e => {
        const pwd = e.target.value
        if(this.validatePassword(pwd)){
            this.setState({
                pwd: pwd,
                pwdError: false
            });
        } else {
            this.setState({
                pwd: pwd,
                pwdError: true
            });
        }
    }

    handleChangeCPwd = e => {
        const cPwd = e.target.value
        if(this.validateCPassword(cPwd)){
            this.setState({
                cPwd: cPwd,
                cPwdError: false
            });
        } else {
            this.setState({
                cPwd: cPwd,
                cPwdError: true
            });
        }
    }

    showLoginForm = () => {
        this.props.switchForms('Login');
    }

    validateEmail = input => {
        if(!input.value || !input.validity.valid)
            return false;

        return true;
    }

    validatePassword = pwd => {
        if(!pwd || !this.strongRegex.test(pwd))
            return false;
        return true;
    }

    validateCPassword = cPwd => {
        if(!cPwd || cPwd !== this.state.pwd.toString())
            return false;
        return true;
    }

    render() {

        const {showNewUserForm} = this.props;
        const {
            birthday, birthdayError,
            cPwdError,
            emailError,
            nameError,
            lastnameError,
            pwdError
        }  = this.state

        let showCPwdError = false;
        if(this.state.pwd.length > 0 && cPwdError)
            showCPwdError = true;

        return (
            <Form autoComplete="off"
                className={`login100-form validate-form ${showNewUserForm ? "": "hidden"}`}
                ref={form => this.form = form}
                onSubmit={this.createUser}>
            
                <p className="h2 text-center" style={{paddingBottom: 20}}>Registro de nuevo usuario</p>
                
                <SimpleError
                    errorObj={this.props.signError}
                    callback={this.props.resetError}
                    show={true}
                    timeout={5000}/>

                <Form.Group className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-user"/>
                        </span>
                    </div>
                    <Form.Control
                        className={nameError ? " input-error": ""}
                        name="name"
                        onChange={this.handleChangeInput}
                        placeholder="Nombre"
                        type="text"/>
                </Form.Group>

                <Form.Group className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-user"/>
                        </span>
                    </div>
                    <Form.Control
                        className={lastnameError ? " input-error": ""}
                        name="lastname"
                        onChange={this.handleChangeInput}
                        placeholder="Apellidos"
                        type="text"/>
                </Form.Group>

                <Form.Group className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-calendar"/>
                        </span>
                    </div>
                    <DatePicker
                        className={"form-control" + (birthdayError ? " input-error": "")}
                        dateFormat="dd/MM/yyyy"
                        name="birthday"
                        onChange={this.handleChangeDate}
                        placeholder="dd/mm/yyy"
                        selected={birthday}
                        showYearDropdown />
                </Form.Group>

                <Form.Group className="form-check form-check-inline">
                    <i className="fa fa-venus-mars" style={{paddingLeft: 36, paddingRight: 10}}/>
                    <input checked={this.state.genre === "M"}
                        className="form-check-input" 
                        name="genre"
                        onChange={this.handleChangeInput}
                        type="radio"
                        value="M"/>
                    <label className="radio-inline form-check-label" style={{paddingRight: 10, paddingTop: 3}}>M</label>
                    <input checked={this.state.genre === "F"}
                        className="form-check-input"
                        name="genre"
                        onChange={this.handleChangeInput}
                        type="radio"
                        value="F"/>
                    <label className="radio-inline form-check-label" style={{paddingTop: 3}}>F</label>
                </Form.Group>

                <Form.Group className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-envelope" aria-hidden="true"/>
                        </span>
                    </div>
                    <Form.Control
                        className={emailError ? " input-error": ""}
                        name="email"
                        onChange={this.handleChangeInput}
                        placeholder="Correo electronico"
                        type="email" />
                    <div className="input-group" style={{margin: "5px 0 0 45px"}}>
                        <p className={!emailError ? " hidden": ""}
                            style={{color: "red"}}>Correo invalido
                        </p>
                    </div>
                </Form.Group>

                <Form.Group className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock"/>
                        </span>
                    </div>
                    <Form.Control
                        className={pwdError ? " input-error": ""}
                        name="pwd"
                        onChange={this.handleChangeInput}
                        placeholder="Contrasena"
                        type="password"/>
                    <div className="input-group" style={{margin: "5px 0 0 45px"}}>
                        <p className={!pwdError ? " hidden": ""}
                            style={{color: "red"}}>Contrase&ntilde;a insegura
                        </p>
                    </div>
                </Form.Group>

                <Form.Group className="input-group" >
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock"/>
                        </span>
                    </div>
                    <Form.Control
                        className={showCPwdError ? " input-error": ""}
                        name="cPwd"
                        onChange={this.handleChangeInput}
                        placeholder="Repite la contrasena"
                        type="password"/>
                        <div className="input-group" style={{margin: "5px 0 0 45px"}}>
                            <p className={showCPwdError ? "": "hidden"}
                                style={{color: "red"}}>Las contrase&ntilde;as no coinciden
                            </p>
                        </div>
                </Form.Group>

                <div style={{paddingTop: 13, paddingLeft: 7}}
                    className="row mx-auto">
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                        <Button
                            className="btn-md"
                            onClick={this.showLoginForm}
                            type="button"
                            variant="secondary">
                            Regresar
                        </Button>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                        <Button
                            className="btn-md"
                            type="submit"
                            variant="primary">
                            Registrar
                        </Button>
                    </div>
                </div>
            </Form>
        );
    }
}

NewUserForm.propTypes = {
    resetError: PropTypes.func.isRequired,
    showNewUserForm: PropTypes.bool.isRequired,
    signError: PropTypes.object,
    signUpRq: PropTypes.func.isRequired,
    switchForms: PropTypes.func.isRequired
}

export default NewUserForm;