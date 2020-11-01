import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setSpinnerVisibility } from '../actions/appActions';

function NotFound({ setSpinnerVisibility }) {

    useEffect(function() {
        setSpinnerVisibility(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Pagina no encontrada</h1>
        </div>
    );
}

NotFound.propTypes = {
    setSpinnerVisibility: PropTypes.func.isRequired
}

export default connect(null, {setSpinnerVisibility}) (NotFound);