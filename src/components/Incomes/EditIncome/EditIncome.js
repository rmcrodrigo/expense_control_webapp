import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {editIncomeRq, getIncomeByIdRq, resetIncomeErrors} from '../../../actions/incomeActions';
import IncomeForm from '../IncomeForm/IncomeForm';

class EditIncome extends React.Component {

    componentDidMount() {
        const {fetchedIncome, fetchingIncome, getIncomeByIdRq} = this.props;
        const incomeId = this.props.match.params.id;
        if(!fetchedIncome && !fetchingIncome && incomeId)
            getIncomeByIdRq(incomeId);
    }

    render() {

        const {editIncomeRq, history, income, incomeErrors, resetIncomeErrors, userId} = this.props;

        return (
            <Card className="card-container">
                <Card.Body>
                    <Card.Title className="card-title">Editar un ingreso</Card.Title>
                    <IncomeForm 
                        actionForm="edit"
                        editIncomeRq={editIncomeRq}
                        history={history}
                        income={income}
                        incomeErrors={incomeErrors}
                        resetIncomeErrors={resetIncomeErrors}
                        userId={userId} />
                </Card.Body>
            </Card>
        );
    }
}

EditIncome.propTypes = {
    editIncomeRq: PropTypes.func.isRequired,
    fetchedIncome: PropTypes.bool.isRequired,
    fetchingIncome: PropTypes.bool.isRequired,
    income: PropTypes.object,
    incomeErrors: PropTypes.object,
    resetIncomeErrors: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    fetchedIncome: state.income.fetchedIncome,
    fetchingIncome: state.income.fetchingIncome,
    income: state.income.income,
    incomeErrors: state.income.incomeErrors,
    userId: state.sign.userId
});

export default connect(mapStateToProps, {editIncomeRq, getIncomeByIdRq, resetIncomeErrors})(EditIncome);