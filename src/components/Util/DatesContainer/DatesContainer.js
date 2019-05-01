import React from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class DatesContainer extends React.Component {

    state = {
        startMonth: new Date(),
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1))
    }

    handleChangeEndDate = (date) => {
        const { startDate } = this.state;
        if (date < startDate)
            this.setState({
                startDate: date,
                endDate: date
            });
        else
            this.setState({
                endDate: date
            });
    }

    handleChangeMonth = (date) => {
        this.setState({
            startMonth: date
        });
    }

    handleChangeStartDate = (date) => {
        const { endDate } = this.state;
        if (date > endDate)
            this.setState({
                startDate: date,
                endDate: date
            });
        else
            this.setState({
                startDate: date
            });
    }

    searchAction = (e) => {
        const {endDate, startDate, startMonth} = this.state;
        this.props.searchAction(e.target.value, endDate, startDate, startMonth);
    }

    render(){

        const {endDate, startDate, startMonth} = this.state;

        return (
            <div className="tabs-container">
                <label>Filtrar movimientos por:</label>
                <div className="all-tab-content">
                    <Tabs bsPrefix="nav nav-tabs" defaultActiveKey="month" >
                        <Tab eventKey="month" title="Mes">
                            <DatePicker
                                className="form-control"
                                dateFormat="MM/yyyy"
                                onChange={this.handleChangeMonth}
                                selected={startMonth}
                                showMonthYearPicker
                            />
                            <Button
                                className="btn-sm"
                                onClick={this.searchAction}
                                style={{marginLeft: 10}}
                                type="button"
                                value="month"
                                variant="secondary">
                                Buscar
                            </Button>
                        </Tab>
                        <Tab className="range-inputs-container" eventKey="range" title="Rango de fechas">
                            <label>De:</label>
                            <DatePicker
                                className="form-control"
                                dateFormat="yyyy/MM/dd"
                                endDate={endDate}
                                name="fromDate"
                                onChange={this.handleChangeStartDate}
                                placeholderText="yyyy/mm/dd"
                                selected={startDate}
                                selectsStart
                                startDate={startDate}
                                showYearDropdown
                            />
                            <label>a:</label>
                            <DatePicker
                                className="form-control"
                                dateFormat="yyyy/MM/dd"
                                endDate={endDate}
                                name="toDate"
                                onChange={this.handleChangeEndDate}
                                placeholderText="yyyy/mm/dd"
                                selected={endDate}
                                selectsEnd
                                startDate={startDate}
                                showYearDropdown
                            />
                            <Button
                                className="btn-sm"
                                onClick={this.searchAction}
                                style={{marginLeft: 10}}
                                type="button"
                                variant="secondary">
                                Buscar
                            </Button>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

DatesContainer.propTypes = {
    searchAction: PropTypes.func.isRequired
}

export default DatesContainer;