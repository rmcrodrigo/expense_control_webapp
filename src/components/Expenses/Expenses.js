import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card} from 'react-bootstrap';

import { getAllExpensesRq, delExpenseRq } from '../../actions/expensesActions';
import { getUserCategoriesRq } from '../../actions/categoryActions';
import { NoResultsTable } from '../Errors';
import ExpenseList from './ExpenseList/ExpenseList';
import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';
import DatesContainer from '../Util/DatesContainer/DatesContainer';
import './Expenses.css';

class Expenses extends React.Component {

    componentDidMount() {
        this.callGetExpensesRq("month", null, null, new Date(), true);
    }

    callGetExpensesRq = (type, endDate, startDate, startMonth, categoriesFlag) => {

        let from = null;
        let to = null;
        if(type==="month"){
            from = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
            to = new Date(from);
            to.setMonth(to.getMonth() + 1);
            to.setDate(to.getDate() - 1);
            from = from.getTime();
            to = to.getTime();
        } else {
            from = startDate.getTime();
            to = endDate.getTime();
        }

        const { userId, getAllExpensesRq, getUserCategoriesRq} = this.props;

        if (userId) {
            if(categoriesFlag)
                getUserCategoriesRq(userId, getAllExpensesRq, from, to);
            else
                getAllExpensesRq(userId, from, to);
        }
    }

    goAddExpenseForm = (e) => {
        e.preventDefault();
        this.props.history.push("/expenses/add");
    }

    renderExpenseList = () => {
        const { categories, delExpenseRq, expenseList } = this.props;

        if (!expenseList || expenseList.length < 1)
            return (
                <NoResultsTable />
            );

        return (
            <ExpenseList
                categories={categories}
                delExpenseRq={delExpenseRq}
                expenseList={expenseList}
            />
        )
    }

    searchExpenses = (type, endDate, startDate, startMonth) => {
        this.callGetExpensesRq(type, endDate, startDate, startMonth);
    }

    render() {

        const { categories } = this.props;

        return (
            <Card className="card-container">
                {
                    categories && categories.length > 0
                        ? <React.Fragment>
                            <Card.Header>
                                <Card.Title className="card-title">
                                    <h1>Lista de gastos</h1>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <DatesContainer
                                    searchAction={this.searchExpenses} />
                                {this.renderExpenseList()}
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={this.goAddExpenseForm}
                                    className="add-button">Agregar gasto</Button>
                            </Card.Body>
                        </React.Fragment>
                        : <NoCategoriesMsg />
                }
            </Card>
        );
    }
}

Expenses.propTypes = {
    categories: PropTypes.array.isRequired,
    delExpenseRq: PropTypes.func.isRequired,
    expenseErrors: PropTypes.object,
    expenseList: PropTypes.array.isRequired,
    fetchedCategories: PropTypes.bool.isRequired,
    fetchedExpenses: PropTypes.bool.isRequired,
    fetchingExpenses: PropTypes.bool.isRequired,
    getAllExpensesRq: PropTypes.func.isRequired,
    getUserCategoriesRq: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    expenseErrors: state.expense.expenseErrors,
    expenseList: state.expense.expenseList,
    fetchedCategories: state.category.fetchedCategories,
    fetchedExpenses: state.expense.fetchedExpenses,
    fetchingExpenses: state.expense.fetchingExpenses,
    userId: state.sign.userId
})

export default connect(mapStateToProps, { getAllExpensesRq, getUserCategoriesRq, delExpenseRq })(Expenses);