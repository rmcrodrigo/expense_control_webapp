import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import './App.css';

import Routes from '../routes';
import Navbar from './Navbar/NavbarHeader';
import LoadingSpinner from './Util/LoadingSpinner';

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Navbar />
      <div className="main-container">
        <Routes />
      </div>
      <LoadingSpinner />
    </ConnectedRouter>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
