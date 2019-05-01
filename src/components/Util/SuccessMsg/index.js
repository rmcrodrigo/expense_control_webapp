import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Collapse} from 'react-bootstrap';

class SuccessMsg extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: props.show || false,
            timeout: props.timeout || 3000
        } 
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.show
        });
    }

    hideMsg = () => {
        const {callback} = this.props;
        if(this.state.open)
            setTimeout(() => {
                this.setState({open: false});
                if(callback)
                    callback();
            }, this.state.timeout);
    }

    render(){
        const {msg} = this.props;
        if(!msg)
            return null;

        return (
            <Collapse in={this.state.open} unmountOnExit={true}>
                <div>
                    {this.hideMsg()}
                    <Alert variant="success">
                        <p>{msg}</p>
                    </Alert>
                </div>
            </Collapse>
        )
    }
}

SuccessMsg.propTypes = {
    msg: PropTypes.string,
    show: PropTypes.bool
}

export default SuccessMsg;