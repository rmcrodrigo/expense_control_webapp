import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {addIncomeRq, resetIncomeErrors} from '../../../actions/incomeActions';
import IncomeForm from '../IncomeForm/IncomeForm';

class AddIncome extends React.Component {

    render() {

        const {addIncomeRq, history, incomeErrors, resetIncomeErrors, userId} = this.props;

        return (
            <Card className="card-container">
                <Card.Body>
                    <Card.Title className="card-title">Agregar un ingreso</Card.Title>
                    <IncomeForm 
                        actionForm="add"
                        addIncomeRq={addIncomeRq}
                        history={history}
                        incomeErrors={incomeErrors}
                        resetIncomeErrors={resetIncomeErrors}
                        userId={userId} />
                </Card.Body>
            </Card>
        );
    }
}

AddIncome.propTypes = {
    addIncomeRq: PropTypes.func.isRequired,
    incomeErrors: PropTypes.object,
    resetIncomeErrors: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    incomeErrors: state.income.incomeErrors,
    userId: state.sign.userId
});

export default connect(mapStateToProps, {addIncomeRq, resetIncomeErrors})(AddIncome);