import React from 'react';
import {Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';

class CategoryForm extends React.Component {

    state = {
        description: "",
        descriptionError: false,
        name: "",
        nameError: false
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {category, userId} = nextProps;
        if(category && category.id){
            this.setState({
                description: category.description,
                id: category.id,
                name: category.name,
                user: {
                    id: userId
                }
            });
        }
    }

    addCategory = (category) => {
        this.props.addCategoryRq(category, this.props.history);
    }

    cancelAdd = (e) => {
        e.preventDefault();
        this.props.history.push("/categories");
    }

    changedInputValue = (e) => {
        e.preventDefault();

        const {name, value} = e.target;

        if(!value) {
            this.setState({
                [name+"Error"]: true,
                [name]: value
            })
        }

        this.setState({
            [name+"Error"]: false,
            [name]: value
        })
    }

    editCategory = (category) => {
        this.props.editCategoryRq(category, this.props.history);
    }

    getCategoryData = () => {

        const {description, name} = this.state;
        const {category} = this.props;
        const lCategory = {
            description,
            name,
            user: {
                id: this.props.userId
            }
        }
        if(category && category.id)
            lCategory["id"] = category.id;

        return lCategory;

    }

    sendAction = (e) => {
        e.preventDefault();
        if(!this.validateForm())
            return false;
        
        const category = this.getCategoryData();
        

        if(this.props.actionForm === "add")
            this.addCategory(category);
        else
            this.editCategory(category);
    }

    validateForm = () => {

        const {description, name} = this.state;
        let {descriptionError, nameError} = this.state;

        if(!description)
            descriptionError= true;
        if(!name)
            nameError= true;

        this.setState({
            descriptionError,
            nameError
        });

        if(descriptionError || nameError)
            return false;
        
        return true;
    }

    render() {

        const {description, descriptionError, name, nameError} = this.state;
        return (
            <Form autoComplete="off"
                onSubmit={this.sendAction}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        className={"form-control" + (nameError ? " input-error": "")}
                        defaultValue={name}
                        name="name"
                        onChange={this.changedInputValue}
                        placeholder="Ej. Comida"
                        type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        className={"form-control" + (descriptionError ? " input-error": "")}
                        defaultValue={description}
                        name="description"
                        onChange={this.changedInputValue}
                        placeholder="Ej. Gastos derivados de compras de comida"
                        type="text" />
                </Form.Group>
                <div className="add-action-buttons">
                    <Button variant="dark" className="cancel-button" onClick={this.cancelAdd}>Cancel</Button>
                    <Button type="submit" variant="primary" className="add-button" >{this.props.actionForm === "add" ? "Agregar": "Guardar"}</Button>
                </div>
            </Form>
        )
    }
}

CategoryForm.propTypes = {
    actionForm: PropTypes.string.isRequired,
    addCategoryRq: PropTypes.func,
    category: PropTypes.object,
    editCategoryRq: PropTypes.func,
    userId: PropTypes.number
}

export default CategoryForm;