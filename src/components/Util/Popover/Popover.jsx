import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Popover extends React.Component {

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('click', this.stopProp);
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).addEventListener('click', this.stopProp);
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = (e) => {
    const { onClose } = this.props;
    if (onClose) onClose(e);
  };

  stopProp = (e) => {
    e.stopPropagation();
  };

  render() {
    const { children, position, style, title } = this.props;
    return (
      <div
        className={`popover fade show bs-popover-${
          position ? position : 'right'
        }`}
        style={style ? style : {}}
        onClick={this.stopProp}
      >
        <div className="arrow"></div>
        <h3 className="popover-header">{title}</h3>
        <div className="popover-body">{children}</div>
      </div>
    );
  }
}

Popover.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
};

export default Popover;
