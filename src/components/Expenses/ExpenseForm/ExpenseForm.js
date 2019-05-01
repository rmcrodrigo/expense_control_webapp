import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import {SimpleError} from '../../Errors'

class ExpenseForm extends React.Component {

    state = {
        amount: "",
        amountError: false,
        category: "",
        categoryError: false,
        description: "",
        descriptionError: false,
        expenseDate: new Date(),
        expenseDateError: false,
        id: 0
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {expense} = nextProps;
        if(expense && expense.id){
            this.setState({
                amount: expense.amount,
                category: expense.category.id,
                description: expense.description,
                expenseDate: new Date(expense.expenseDate),
                id: expense.id
            });
        }
    }

    addExpense = () => {

        const expense = this.getExpenseData();

        this.props.addExpenseRq(expense, this.props.history);
    }

    cancelAction = (e) => {
        e.preventDefault();
        this.props.history.push("/");
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

    editExpense = () => {

        const expense = this.getExpenseData();
        expense["id"] = this.state.id;

        this.props.editExpenseRq(expense, this.props.history);
    }

    getExpenseData = () => {

        const {amount, category, description, expenseDate} = this.state;
        
        const expense = {
            amount,
            category: {
                id: parseInt(category)
            },
            description,
            expenseDate: expenseDate.getTime(),
            user: {
                id: this.props.userId
            }
        }

        return expense;

    }

    handleChangeDate = (date) => {
        this.setState({
            expenseDate: date
        });
    }

    renderCategories() {

        const {categories} = this.props;
        const categoryId = this.state.category;

        if(!categories || categories.length < 1)
            return null;
        
        return (
            <Form.Group>
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    as="select"
                    name="category"
                    className={"form-control" + (this.state.categoryError ? " input-error": "")}
                    onChange={this.changedInputValue}
                    value={categoryId} >
                    <option key="-1" value="">Selecciona una opci&oacute;n</option>
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
        );
    }

    sendAction = (e) => {

        e.preventDefault();

        if(!this.validateForm())
            return false;

        if(this.props.actionForm === "add")
            this.addExpense();
        else
            this.editExpense();
    }

    validateAmount = (amount) => {
        amount = "" + amount;
        if(amount.charAt(amount.length -1 ) === "." || !(/^\d+\.?(\d{0,2})$/.test(amount)))
            return true;
        return false;
    }

    validateForm = () => {

        let amountError = false, categoryError = false, descriptionError = false, expenseDateError = false;
        const {amount, category, description, expenseDate} = this.state;

        if(!amount || this.validateAmount(amount))
            amountError = true;
        if(!category)
            categoryError = true;
        if(!description)
            descriptionError = true;
        if(!expenseDate)
            expenseDateError = true;

        this.setState({
            amountError,
            categoryError,
            descriptionError,
            expenseDateError
        });

        if(amountError|| categoryError || descriptionError || expenseDateError )
            return false;

        return true;
    }

    render() {

        const {
            amount,
            amountError,
            description,
            descriptionError,
            expenseDate,
            expenseDateError
        } = this.state;

        const {expenseErrors, resetExpenseError} = this.props;

        return(
            <Form autoComplete="off" onSubmit={this.sendAction}>
                <SimpleError
                    callback={resetExpenseError}
                    errorObj={expenseErrors}
                    timeout={5000} />
                <Form.Group>
                    <Form.Label>Descripci&oacute;n</Form.Label>
                    <Form.Control
                        className={"form-control" + (descriptionError ? " input-error": "")}
                        defaultValue={description}
                        name="description"
                        onChange={this.changedInputValue}
                        placeholder="Descripcion"
                        type="text" />
                </Form.Group>
                {this.renderCategories()}
                <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <br/>
                    <DatePicker
                        className={"form-control" + (expenseDateError ? " input-error": "")}
                        dateFormat="yyyy/MM/dd"
                        onChange={this.handleChangeDate}
                        placeholderText="yyyy/mm/dd"
                        selected={expenseDate}
                        showYearDropdown
                    />
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

                <div className="add-action-buttons">
                    <Button variant="dark"
                        className="cancel-add"
                        onClick={this.cancelAction}
                        type="button">Cancelar</Button>
                    <Button variant="primary" className="add-button" type="submit">{this.props.actionForm === "add" ? "Agregar" : "Guardar"}</Button>
                </div>
            </Form>
        )
    }
}

ExpenseForm.propTypes = {
    actionForm: PropTypes.string.isRequired,
    addExpenseRq: PropTypes.func,
    categories: PropTypes.array.isRequired,
    editExpenseRq: PropTypes.func,
    expense: PropTypes.object,
    expenseErrors: PropTypes.object,
    resetExpenseError: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

export default ExpenseForm;