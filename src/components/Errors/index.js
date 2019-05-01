import React from 'react';
import {Alert, Collapse} from 'react-bootstrap';

export const NoResultsTable = () => {
    return (
        <div className="no-results-table">
            <p>No se encontraron resultados</p>
        </div>
    )
};

export class SimpleError extends React.Component {

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

    hideSimpleError = () => {
        const {callback} = this.props;
        if(this.state.open)
            setTimeout(() => {
                this.setState({open:false});
                if(callback)
                    callback();
            }, this.state.timeout);
    }

    render() {

        const {errorObj} = this.props;
        const {open} = this.state;
        
        if(!errorObj) 
            return null;
        return (
            <Collapse in={open} unmountOnExit={true}>
                <div>
                    {this.hideSimpleError()}
                    <Alert variant="danger">
                        <p>{errorObj.description}</p>
                    </Alert>
                </div>
            </Collapse>
        )
    }
}