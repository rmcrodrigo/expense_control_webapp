import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import Category from '../Category/Category';

class ListCategories extends React.Component {

    goAddCategory = () => {
        this.props.history.push("/categories/add");
    }

    render(){

        const {categories, delCategoryRq} = this.props;

        return (
            
            <Table striped bordered hover>
                <thead className="thead-dark">
                    <tr>
                    <th>Nombre</th>
                    <th>Descripci&oacute;n</th>
                    <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(category => (
                            <Category
                                key={category.id}
                                category={category}
                                delCategoryRq={delCategoryRq}
                            />
                        ))
                    }
                </tbody>
            </Table>
        )
    }
}

ListCategories.propTypes = {
    categories: PropTypes.array.isRequired,
    delCategoryRq: PropTypes.func.isRequired
}

export default ListCategories;