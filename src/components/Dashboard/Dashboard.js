import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {getUserCategoriesRq} from '../../actions/categoryActions';
import NoCategoriesMsg from '../Categories/NoCategoriesMsg/NoCategoriesMsg';

class Dashboard extends React.Component {

    componentDidMount() {
        const {userId, fetchingCategories, getUserCategoriesRq} = this.props;
        if(userId && !fetchingCategories) {
            getUserCategoriesRq(userId);
        }
    }

    render() {

        const {categories} = this.props;

        return (
            <React.Fragment>
                <Card className="dashboard-container card-container">
                    <Card.Body>
                        {
                            categories.length < 1 ?
                            <NoCategoriesMsg />
                            :
                            <Card.Title className="card-title">Balance mensual</Card.Title>
                        }
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    categories: PropTypes.array.isRequired,
    fetchingCategories: PropTypes.bool.isRequired,
    getUserCategoriesRq: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    fetchingCategories: state.category.fetchingCategories,
    userId: state.sign.userId
})

export default connect(mapStateToProps, {getUserCategoriesRq})(Dashboard);