/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import { TabPanel, Tabs } from '../../Util/Tabs/Tabs';

const DatesContainer = ({ searchAction, userToken }) => {

  const [mode, setMode] = useState('month');
  const [startMonth, setStartMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  const tabs = [
    {
      disabled: false,
      id: 'month',
      title: 'Month'
    },
    {
      disabled: false,
      id: 'range',
      title: 'Date range'
    }
  ]

  useEffect(() => {
    const datesFormData = JSON.parse(localStorage.getItem('datesFormData'));
    if (
      datesFormData &&
      datesFormData.mode &&
      datesFormData.values &&
      datesFormData.values.endDate &&
      datesFormData.values.startDate &&
      datesFormData.values.startMonth
    ) {
      setMode(datesFormData.mode);
      setEndDate(new Date(datesFormData.values.endDate));
      setStartMonth(new Date(datesFormData.values.startMonth));
      setStartDate(new Date(datesFormData.values.startDate));
    }
  }, []);

  const handleChangeEndDate = (date) => {
    if (date < startDate) {
      setStartDate(date);
      setEndDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleChangeMonth = (date) => {
    setStartMonth(date);
  };

  const handleChangeStartDate = (date) => {
    if (date > endDate) {
      setStartDate(date);
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };

  const handleTabChange = (event, newValue) => {
    event.preventDefault();
    setMode(newValue);
  };

  const _searchAction = (e) => {
    searchAction(e.target.value, endDate, startDate, startMonth, userToken);
  };

  return (
    <div className="tabs-container">
      <label>Filter movements by:</label>
      <Tabs tabs={tabs} value={mode} onChange={handleTabChange} />
      <div className="all-tab-content">
        <TabPanel className="month-inputs-container" id="month" value={mode}>
          <>
            <DatePicker
              className="form-control"
              dateFormat="MM/yyyy"
              onChange={handleChangeMonth}
              selected={startMonth}
              showMonthYearPicker
            />
            <button
              className="btn btn-sm btn-info"
              onClick={_searchAction}
              style={{ marginLeft: 10 }}
              type="button"
              value="month"
            >
              Search
            </button>
          </>
        </TabPanel>
        <TabPanel className="range-inputs-container" id="range" value={mode}>
          <>
            <label>De:</label>
            <DatePicker
              className="form-control"
              dateFormat="yyyy/MM/dd"
              endDate={endDate}
              name="fromDate"
              onChange={handleChangeStartDate}
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
              onChange={handleChangeEndDate}
              placeholderText="yyyy/mm/dd"
              selected={endDate}
              selectsEnd
              startDate={startDate}
              showYearDropdown
            />
            <button
              className="btn btn-sm btn-info"
              onClick={_searchAction}
              style={{ marginLeft: 10 }}
              type="button"
              value="range"
            >
              Buscar
            </button>
          </>
        </TabPanel>
      </div>
    </div>
  );
};

DatesContainer.propTypes = {
  searchAction: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired
};

export default DatesContainer;
