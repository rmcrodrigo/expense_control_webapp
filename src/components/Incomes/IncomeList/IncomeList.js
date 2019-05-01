import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import Income from '../Income/Income';

class IncomeList extends React.Component {

    render() {
        const {delIncomeRq, incomeList} = this.props;

        return (
            <Table striped bordered hover>
                <thead className="thead-dark">
                    <tr>
                        <th>Fecha</th>
                        <th>Descripci&oacute;n</th>
                        <th>Monto</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        incomeList.map(income => (
                            <Income
                                delIncomeRq={delIncomeRq}
                                income={income}
                                key={income.id} />
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

IncomeList.propTypes = {
    delIncomeRq: PropTypes.func.isRequired,
    incomeList: PropTypes.array.isRequired
}

export default IncomeList;