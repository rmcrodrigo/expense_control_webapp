import React from 'react';
import PropTypes from 'prop-types';

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
            <div className="collapse" in={this.state.open} unmountOnExit={true}>
                <div>
                    {this.hideMsg()}
                    <div className="alert alert-success">
                        <p>{msg}</p>
                    </div>
                </div>
            </div>
        )
    }
}

SuccessMsg.propTypes = {
    msg: PropTypes.string,
    show: PropTypes.bool
}

export default SuccessMsg;