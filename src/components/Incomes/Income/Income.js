import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default (props) => {
    const {income} = props;
    const incomeDate = new Intl.DateTimeFormat('es-MX', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }).format(new Date(income.incomeDate));

    const delIncome = id => {
        if(window.confirm("Estas seguro de que deseas eliminar este ingreso?"))
            props.delIncomeRq(id);
    }

    return (
        <tr className="data-info">
            <td><p>{incomeDate}</p></td>
            <td><p>{income.description}</p></td>
            <td><p>{income.amount}</p></td>
            <td className="text-center">
                <Button
                    className="btn-sm"
                    onClick={() => delIncome(income.id)}
                    type="button"
                    variant="danger">Eliminar</Button>
                <Link
                    className="btn btn-sm btn-dark"
                    to={`/income/edit/${income.id}`}
                    style={{marginLeft: 5}}>Editar</Link>
            </td>
        </tr>
    )
}