import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './AddExpense.css';
import {addExpenseRq, resetExpenseError} from '../../../actions/expensesActions';
import {getUserCategoriesRq} from '../../../actions/categoryActions';
import ExpenseForm from '../ExpenseForm/ExpenseForm';

class AddExpense extends React.Component {

    render() {

        const {addExpenseRq, categories, expenseErrors, getUserCategoriesRq, history, resetExpenseError} = this.props;

        return(
            <div className="add-expense-container card">
                <p className="card-title h1">Agregar nuevo gasto</p>
                <ExpenseForm
                    actionForm="add"
                    addExpenseRq={addExpenseRq}
                    categories={categories}
                    expenseErrors={expenseErrors}
                    getUserCategoriesRq={getUserCategoriesRq}
                    history={history}
                    resetExpenseError={resetExpenseError}
                    userId={this.props.userId}
                />
            </div>
        )
    }
}

AddExpense.propTypes = {
    addExpenseRq: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    expenseErrors: PropTypes.object,
    getUserCategoriesRq: PropTypes.func.isRequired,
    resetExpenseError: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    categories: state.category.categories,
    expenseErrors: state.expense.expenseErrors,
    userId: state.sign.userId
});

export default connect(mapStateToProps, {addExpenseRq, getUserCategoriesRq, resetExpenseError})(AddExpense);