import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { getUserCategoriesRq } from '../../actions/categoryActions';
import './NavbarHeader.css';

const NavbarHeader = ({ userData }) => {

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userData');
    window.location.reload();
  };

  const renderNavbar = () => {
    return (
      <Navbar
        bg="light"
        expand="lg"
        fixed="top"
      >
        <Navbar.Brand href="/">
          Expenses control
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="mr-auto">
            <Nav.Link href="/categories">
              Categories
            </Nav.Link>
            <Nav.Link href="/expenses">
              Expenses
            </Nav.Link>
            <Nav.Link href="/incomes">
              Incomes
            </Nav.Link>
          </Nav>
          <NavDropdown title={userData.name} id="basic-nav-dropdown">
            <NavDropdown.Item href="/my-account">
              My account
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const lNavbar = userData && userData.token ? renderNavbar() : null;

  return <React.Fragment>{lNavbar}</React.Fragment>;
};

NavbarHeader.propTypes = {
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userData: state.sign.userData,
});

export default connect(mapStateToProps, { getUserCategoriesRq })(
  React.memo(NavbarHeader)
);
