import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ history, userData, visible = true }) => {
  // if ( (history && history.location && history.location.pathname.indexOf('/sign/oauth') < 0) && (!userData || !userData.token)) return null;
  const topPosition = window.innerHeight / 2 - 40;
  return (
    <div
      style={{
        background: '#A7CFE8',
        display: visible ? 'block' : 'none',
        float: 'left',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: ' 100%',
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: topPosition }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: 80, height: 80 }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  userData: PropTypes.object,
  visible: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userData: state.sign.userData,
  visible: state.app.spinnerVisibility,
});

export default connect(mapStateToProps, null)(LoadingSpinner);
