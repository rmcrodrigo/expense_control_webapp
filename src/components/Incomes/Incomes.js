import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import {delIncomeRq, getUserIncomeRq, resetIncomeErrors} from '../../actions/incomeActions';
import {NoResultsTable, SimpleError} from '../Errors'
import IncomeList from './IncomeList/IncomeList';
import DatesContainer from '../Util/DatesContainer/DatesContainer';

class Incomes extends React.Component {

    componentDidMount(){
        const {fetchedIncomeList, fetchingIncomeList} = this.props;
        if(!fetchedIncomeList && !fetchingIncomeList)
            this.callGetUserIncomeRq("month", null, null, new Date());
    }

    callGetUserIncomeRq = (type, endDate, startDate, startMonth) => { 
        let from = null, to = null;
        const {getUserIncomeRq, userId} = this.props;
        if(type==="month"){
            from = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
            to = new Date(from.getTime());
            to.setMonth(to.getMonth() + 1);
            to.setTime(to.getTime()-1);
            from = from.getTime();
            to = to.getTime();
        } else {
            from = startDate.getTime();
            to = endDate.getTime();
        }

        if(userId) {
            getUserIncomeRq(userId, from, to);
        }
    }

    goAddIncome = (e) => {
        e.preventDefault();
        this.props.history.push("/income/add");
    }

    renderIncomeList = () => {
        const {delIncomeRq, incomeList} = this.props;
        
        if(!incomeList || incomeList.length < 1)
            return (<NoResultsTable />);

        return (
            <IncomeList
                delIncomeRq={delIncomeRq}
                incomeList={incomeList} />
        )
    }

    searchIncome = (type, endDate, startDate, startMonth) => {
        this.callGetUserIncomeRq(type, endDate, startDate, startMonth);
    }

    render(){

        const {incomeErrors, resetIncomeErrors} = this.props;

        return (
            <Card className="card-container">
                <Card.Header>
                    <Card.Title>
                        <h1>Lista de ingresos</h1>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <SimpleError
                        callback={resetIncomeErrors}
                        errorObj={incomeErrors}
                        timeout={5000} />
                    <DatesContainer
                        searchAction={this.searchIncome} />
                    {this.renderIncomeList()}
                    <div className="add-category-button">
                        <Button type="button" variant="primary" onClick={this.goAddIncome}>Agregar ingreso</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

Incomes.propTypes = {
    delIncomeRq: PropTypes.func.isRequired,
    fetchedIncomeList: PropTypes.bool.isRequired,
    fetchingIncomeList: PropTypes.bool.isRequired,
    getUserIncomeRq: PropTypes.func.isRequired,
    incomeErrors: PropTypes.object,
    incomeList: PropTypes.array.isRequired,
    resetIncomeErrors: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    fetchedIncomeList: state.income.fetchedIncomeList,
    fetchingIncomeList: state.income.fetchingIncomeList,
    incomeErrors: state.income.incomeErrors,
    incomeList: state.income.incomeList,
    userId: state.sign.userId
});

export default connect(mapStateToProps, {delIncomeRq, getUserIncomeRq, resetIncomeErrors})(Incomes);