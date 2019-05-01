import React from 'react';
import PropTypes from 'prop-types';
import Expense from '../Expense/Expense';
import { Table } from 'react-bootstrap';

class ExpenseList extends React.Component {

    render() {
        const {categories, delExpenseRq, expenseList} = this.props;
        return (
            <Table striped bordered hover>
                <thead className="thead-dark">
                    <tr>
                        <th>Fecha</th>
                        <th>Descripcion</th>
                        <th>Monto</th>
                        <th>Categoria</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                {
                    expenseList.map(expense => (
                        <Expense
                            categories={categories}
                            delExpenseRq={delExpenseRq}
                            expense={expense}
                            key={expense.id} />
                    ))
                }
                </tbody>
            </Table>
        );
    }
}

ExpenseList.propTypes = {
    categories: PropTypes.array.isRequired,
    delExpenseRq: PropTypes.func.isRequired,
    expenseList: PropTypes.array.isRequired
}

export default ExpenseList;