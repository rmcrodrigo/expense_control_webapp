import React from 'react';
import PropTypes from 'prop-types';

export const Tabs = ({ tabs, onChange, value }) => {
  if(!tabs || tabs.length < 1) return <></>;

  const handleClick = (event) => {
    let newValue = '';
    if (
      event.target &&
      event.target.parentElement &&
      event.target.parentElement.id
    )
      newValue = event.target.parentElement.id.replace('tab-', '');
    if(onChange) onChange(event, newValue);
  }

  return (
    <ul className="nav nav-tabs">
      {tabs.map(tab => {
        const {disabled, id, title} = tab;
        return (
          <li className="nav-item" id={`tab-${id}`} key={id}>
            <span
              className={`
                nav-link
                ${value === id ? ' active' : ''}
                ${disabled ? ' disabled' : ''}
              `}
              onClick={handleClick}
            >
              {title}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  value: PropTypes.string,
};

export const TabPanel = ({
  children,
  className,
  id,
  value
}) => {
  return (
    <div className={`${className ? className + ' ': ''}tabpanel${id !== value ? ' hidden' : ''}`} id={`tabpanel-${id}`}>
      {children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired
}