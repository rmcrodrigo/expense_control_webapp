import React from 'react';
import PropTypes from 'prop-types';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';

import {getUserCategoriesRq} from '../../actions/categoryActions';
import './NavbarHeader.css';

class NavbarHeader extends React.Component {

    logout = (e) => {
        e.preventDefault();
        this.props.cookies.remove("userData");
        window.location.reload();
    }

    renderNavbar = () => {

        const {userData} = this.props;

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Control de gastos</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/categories">Categorias</Nav.Link>
                        <Nav.Link href="/">Gastos</Nav.Link>
                        <Nav.Link href="/income">Ingresos</Nav.Link>
                    </Nav>
                    <NavDropdown title={userData.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Mi cuenta</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.logout}>Cerrar sesi&oacute;n</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    render(){

        const lNavbar =  this.props.userData && this.props.userData.id ? this.renderNavbar() : null;

        return (
            <React.Fragment>
                { lNavbar }
            </React.Fragment>
        )
    }
}

NavbarHeader.propTypes = {
    userData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    userData: state.sign.userData
})

export default connect(mapStateToProps, {getUserCategoriesRq})(withCookies(NavbarHeader));