import PropTypes, { InferProps } from 'prop-types';
import { useCallback, useState } from 'react';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import { connect } from 'react-redux';
import { RootState } from '../services/store';
import { authSelectors, logout } from '../services/auth';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { userPropType } from '../services/utils/propTypes';

function NavBar({ user, logout }: InferProps<typeof NavBar.propTypes>) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !!user;
  const toggle = () => setIsOpen(!isOpen);
  const onLoginClick = useCallback(() => {
    navigate('login');
  }, []);
  const logoutWithRedirect = useCallback(() => {
    logout({
      returnTo: window.location.origin
    });
  }, []);

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={RouterNavLink} to="/">
                  Home
                </NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink tag={RouterNavLink} to="/transctions">
                    Transactions
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={onLoginClick}>
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    {user && user.avatar && (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="nav-user-profile rounded-circle"
                        width="50"
                      />
                    )}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user?.email}</DropdownItem>
                    <DropdownItem tag={RouterNavLink} to="/profile" className="dropdown-profile">
                      <FontAwesomeIcon icon={faUser} className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem id="qsLogoutBtn" onClick={() => logoutWithRedirect()}>
                      <FontAwesomeIcon icon={faPowerOff} className="mr-3" /> Log out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {isAuthenticated && (
              <Nav className="d-md-none justify-content-between" navbar style={{ minHeight: 170 }}>
                <NavItem>
                  <span className="user-info">
                    {user?.avatar && (
                      <img
                        src={user?.avatar}
                        alt="Profile"
                        className="nav-user-profile d-inline-block rounded-circle mr-3"
                        width="50"
                      />
                    )}
                    <h6 className="d-inline-block">{user?.email}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon={faUser} className="mr-3" />
                  <RouterNavLink to="/profile">Profile</RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon={faPowerOff} className="mr-3" />
                  <RouterNavLink to="#" id="qsLogoutBtn" onClick={() => logoutWithRedirect()}>
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

NavBar.propTypes = {
  user: userPropType,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state: RootState) => ({
  user: authSelectors.getUser(state)
});

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
