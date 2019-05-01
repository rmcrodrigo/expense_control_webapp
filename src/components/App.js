import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { withCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import './App.css';

import routes from '../routes';
import Navbar from './Navbar/NavbarHeader';

class App extends React.Component {

    render(){

        return (
            <ConnectedRouter history={this.props.history}>
                <Navbar />
                {routes}
            </ConnectedRouter>
        );
    }
}

App.propTypes = {
    history: PropTypes.object.isRequired
}

export default withCookies(App);