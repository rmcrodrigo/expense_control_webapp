import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Category = props => {

    const {category, delCategoryRq} = props;

    const delCategory = id => {
        if(window.confirm("Estas seguro de que deseas eliminar este registro?"))
            delCategoryRq(id);
    }

    return (
        <tr className="data-info">
            <td><p>{category.name}</p></td>
            <td><p>{category.description}</p></td>
            <td className="text-center">
                <Button
                    type="button"
                    className="btn-sm"
                    variant="danger"
                    onClick={() => {delCategory(category.id)}}>
                    Eliminar
                </Button>
                <Link 
                    style={{marginLeft: 5}}
                    to={`/categories/edit/${category.id}`}
                    className="btn btn-sm btn-dark">
                    Editar
                </Link>
            </td>
        </tr>
    );
}

export default Category;