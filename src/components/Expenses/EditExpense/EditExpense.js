import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../AddExpense/AddExpense.css';
import {editExpenseRq, getExpenseById, resetExpenseError} from '../../../actions/expensesActions';
import {getUserCategoriesRq} from '../../../actions/categoryActions';
import ExpenseForm from '../ExpenseForm/ExpenseForm';

class EditExpense extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        if(id)
            this.props.getExpenseById(id);
    }

    render() {

        const {editExpenseRq, categories, expense, expenseErrors, getUserCategoriesRq, history, resetExpenseError} = this.props;

        return(
            <div className="add-expense-container card">
                <p className="card-title h1">Edici&oacute;n de gastos</p>
                <ExpenseForm
                    actionForm="edit"
                    categories={categories}
                    editExpenseRq={editExpenseRq}
                    expense={expense}
                    expenseErrors={expenseErrors}
                    getUserCategoriesRq={getUserCategoriesRq}
                    history={history}
                    resetExpenseError={resetExpenseError}
                    userId={this.props.userId} />
            </div>
        )
    }
}

EditExpense.propTypes = {
    categories: PropTypes.array.isRequired,
    editExpenseRq: PropTypes.func.isRequired,
    expense: PropTypes.object,
    expenseErrors: PropTypes.object,
    getExpenseById: PropTypes.func.isRequired,
    getUserCategoriesRq: PropTypes.func.isRequired,
    resetExpenseError: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    categories: state.category.categories,
    expense: state.expense.expense,
    expenseErrors: state.expense.expenseErrors,
    userId: state.sign.userId
});

export default connect(mapStateToProps, {editExpenseRq, getExpenseById, getUserCategoriesRq, resetExpenseError})(EditExpense);