import React from 'react';
import {Link} from 'react-router-dom';

const Expense = (props) => {
    const {categories, delExpenseRq, expense} = props;

    const delExpense = id => {
        if(window.confirm("Estas seguro que deseas borrar este elemento?"))
            delExpenseRq(id);
    }
    const expenseDate = new Intl.DateTimeFormat('es-MX', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }).format(new Date(expense.expenseDate));

    let category = {
        name:""
    };
    
    if(categories && categories.length > 0)
        category = categories.find(category => category.id === (expense.category.id || expense.category));

    return (

        <tr className="data-info">
            <td><p>{expenseDate}</p></td>
            <td><p>{expense.description}</p></td>
            <td><p>{expense.amount}</p></td>
            <td><p>{category.name}</p></td>
            <td className="text-center">
                <button type="button" onClick={() => delExpense(expense.id)}
                    className="del-expense-button btn btn-sm btn-danger">
                    Eliminar
                </button>
                <Link className="edit-expense-button btn btn-sm btn-dark" to={`/expenses/edit/${expense.id}`}>
                    Editar
                </Link>
            </td>
        </tr>
    );
}

export default Expense;