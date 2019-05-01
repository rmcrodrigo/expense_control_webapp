import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import {addCategoryRq, delCategoryRq, getUserCategoriesRq, resetCategoriesError} from '../../actions/categoryActions';
import ListCategories from './ListCategories/ListCategories';
import './Categories.css';
import {NoResultsTable, SimpleError} from '../Errors';

class Categories extends React.Component {

    componentDidMount() {
        const {categoryErrors, fetchedCategories, fetchingCategories} = this.props;
        if(!categoryErrors && !fetchingCategories && !fetchedCategories)
            this.props.getUserCategoriesRq(this.props.userId);
    }
    
    goAddCategory = () => {
        this.props.history.push("/categories/add");
    }

    
    renderCategories = () => {

        const {categories, delCategoryRq} = this.props;

        if(!categories || categories.length < 1) 
            return (
                <NoResultsTable />
            );

        return (
            <ListCategories
                categories={categories}
                delCategoryRq={delCategoryRq} />
        );
    }

    render(){

        const {categoryErrors, resetCategoriesError} = this.props;

        return (
            <Card className="category-list-container">
                <Card.Header>
                    <Card.Title className="category-list-title">
                        <h1>Categorias</h1>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <SimpleError
                        callback={resetCategoriesError}
                        errorObj={categoryErrors}
                        timeout={5000} />
                    {this.renderCategories()}
                    <div className="add-category-button">
                        <Button type="button" variant="primary" onClick={this.goAddCategory}>Agregar categoria</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

Categories.propTypes = {
    addCategoryRq: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    categoryErrors: PropTypes.object,
    delCategoryRq: PropTypes.func.isRequired,
    fetchedCategories: PropTypes.bool.isRequired,
    fetchingCategories: PropTypes.bool.isRequired,
    getUserCategoriesRq: PropTypes.func.isRequired,
    resetCategoriesError: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    categoryErrors: state.category.categoryErrors,
    fetchedCategories: state.category.fetchedCategories,
    fetchingCategories: state.category.fetchingCategories,
    userId: state.sign.userId
});

export default connect(mapStateToProps, {addCategoryRq, delCategoryRq, getUserCategoriesRq, resetCategoriesError})(Categories);