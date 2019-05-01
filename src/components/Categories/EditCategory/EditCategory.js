import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';

import {editCategoryRq, getCategoryByIdRq, resetCategoriesError} from '../../../actions/categoryActions';
import CategoryForm from '../CategoryForm/CategoryForm';
import '../Categories.css';
import {SimpleError} from '../../Errors';

class EditCategory extends React.Component {

    componentDidMount() {
        
        const categoryId = this.props.match.params.id;
        const {fetchingCategory, getCategoryByIdRq} = this.props;

        if(!fetchingCategory)
            getCategoryByIdRq(categoryId);
    }

    render() {

        const {editCategoryRq, category, categoryErrors, history, resetCategoriesError} = this.props;

        return (
            <Card className="add-category-container">
                <Card.Body>
                    <Card.Title className="card-title">Agregar categoria</Card.Title>
                    <SimpleError
                        callback={resetCategoriesError}
                        errorObj={categoryErrors}
                        timeout={5000} />
                    <CategoryForm
                        actionForm="edit"
                        editCategoryRq={editCategoryRq}
                        category={category}
                        history={history}
                        userId={this.props.userId}
                     />
                </Card.Body>
            </Card>
        );
    }
}

EditCategory.propTypes = {
    category: PropTypes.object.isRequired,
    categoryErrors: PropTypes.object,
    editCategoryRq: PropTypes.func.isRequired,
    fetchingCategory: PropTypes.bool.isRequired,
    getCategoryByIdRq: PropTypes.func.isRequired,
    resetCategoriesError: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    category: state.category.category,
    categoryErrors: state.category.categoryErrors,
    fetchingCategory: state.category.fetchingCategory,
    userId: state.sign.userId
})

export default connect(mapStateToProps, {editCategoryRq, getCategoryByIdRq, resetCategoriesError})(EditCategory);