import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';

import {addCategoryRq, resetCategoriesError} from '../../../actions/categoryActions';
import CategoryForm from '../CategoryForm/CategoryForm';
import '../Categories.css';
import {SimpleError} from '../../Errors';

class AddCategory extends React.Component {

    render() {

        const {addCategoryRq, categoryErrors, history, resetCategoriesError} = this.props;

        return (
            <Card className="add-category-container">
                <Card.Body>
                    <Card.Title className="card-title">Agregar categoria</Card.Title>
                    <SimpleError
                        callback={resetCategoriesError}
                        errorObj={categoryErrors}
                        timeout={5000} />
                    <CategoryForm
                        actionForm="add"
                        addCategoryRq={addCategoryRq}
                        history={history}
                        userId={this.props.userId}
                     />
                </Card.Body>
            </Card>
        );
    }
}

AddCategory.propTypes = {
    addCategoryRq: PropTypes.func.isRequired,
    categoryErrors: PropTypes.object,
    resetCategoriesError: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    categoryErrors: state.category.categoryErrors,
    userId: state.sign.userId
})

export default connect(mapStateToProps, {addCategoryRq, resetCategoriesError})(AddCategory);