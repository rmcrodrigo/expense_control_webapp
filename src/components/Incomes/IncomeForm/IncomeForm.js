import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {SimpleError} from '../../Errors';

class IncomeForm extends React.Component {

    state = {
        amount: "",
        amountError: false,
        description: "",
        descriptionError: false,
        incomeDate: new Date(),
        incomeDateError: false
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        const {income} = nextProps;
        
        if(income && income.id)
            this.setState({
                amount: income.amount,
                description: income.description,
                incomeDate: new Date(income.incomeDate)
            });
    }

    cancelAction = (e) => {
        e.preventDefault();
        this.props.history.push("/income");
    }

    changedInputValue = (e) => {

        const {name, value} = e.target;

        if(!value){
            this.setState({
                [name]: value,
                [name + "Error"]: true
            });
            return;
        }

        if(name === "amount"){
            if(this.validateAmount(value)){
                this.setState({
                    [name]: value,
                    [name + "Error"]: true
                });
                return;
            }
        }

        this.setState({
            [name]: value,
            [name + "Error"]: false
        })
    }

    handleChangeDate = (date) => {
        this.setState({
            incomeDate: date
        });
    }

    getIncome = () => {
        const {amount, description, incomeDate} = this.state;
        return {
            amount,
            description,
            incomeDate,
            user: {
                id: this.props.userId
            }
        };
    }

    sendAction = (e) => {
        e.preventDefault();
        const {actionForm, addIncomeRq, editIncomeRq, history, income} = this.props;
        const lIncome = this.getIncome();
        if(!this.validateForm())
            return false;

        if(actionForm === "add")
            addIncomeRq(lIncome, history);
        else {
            lIncome["id"] = income.id;
            editIncomeRq(lIncome, history);
        }
    }

    validateAmount = (amount) => {
        amount = "" + amount;
        if(amount.charAt(amount.length -1 ) === "." || !(/^\d+\.?(\d{0,2})$/.test(amount)))
            return true;
        return false;
    }

    validateForm = () => {

        let amountError = false, descriptionError = false, incomeDateError = false;
        const {amount, description, incomeDate} = this.state;

        if(!amount || this.validateAmount(amount))
            amountError = true;
        if(!description)
            descriptionError = true;
        if(!incomeDate)
            incomeDateError = true;

        this.setState({
            amountError,
            descriptionError,
            incomeDateError
        });

        if(amountError || descriptionError || incomeDateError)
            return false;

        return true;
    }

    render(){

        const {
            amount,
            amountError,
            description,
            descriptionError, 
            incomeDate,
            incomeDateError
        } = this.state;

        const {incomeErrors, resetIncomeErrors} = this.props;

        return (
            <Form autoComplete="off"
                onSubmit={this.sendAction}>

                <SimpleError
                    callback={resetIncomeErrors}
                    errorObj={incomeErrors}
                    timeout={5000} />
                <Form.Group>
                    <Form.Label>Descripci&oacute;n</Form.Label>
                    <Form.Control
                        className={"form-control" + (descriptionError ? " input-error": "")}
                        defaultValue={description}
                        name="description"
                        onChange={this.changedInputValue}
                        placeholder="Quincena"
                        type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Monto</Form.Label>
                    <Form.Control
                        className={"form-control" + (amountError ? " input-error": "")}
                        defaultValue={amount}
                        name="amount"
                        onChange={this.changedInputValue}
                        placeholder="0.00"
                        type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <br/>
                    <DatePicker
                        className={"form-control" + (incomeDateError ? " input-error": "")}
                        dateFormat="yyyy/MM/dd"
                        onChange={this.handleChangeDate}
                        placeholderText="yyyy/mm/dd"
                        selected={incomeDate}
                        showYearDropdown
                    />
                </Form.Group>

                <div className="add-action-buttons">
                    <Button variant="dark"
                        className="cancel-add"
                        onClick={this.cancelAction}
                        type="button">Cancelar</Button>
                    <Button variant="primary"
                        className="add-button"
                        type="submit">
                        {this.props.actionForm === "add" ? "Agregar" : "Guardar"}
                    </Button>
                </div>
            </Form>
        );
    }
}

IncomeForm.propTypes = {
    actionForm: PropTypes.string.isRequired,
    addIncomeRq: PropTypes.func,
    editIncomeRq: PropTypes.func,
    income: PropTypes.object,
    incomeErrors: PropTypes.object,
    resetIncomeErrors: PropTypes.func.isRequired,
    userId: PropTypes.number
}

export default IncomeForm;