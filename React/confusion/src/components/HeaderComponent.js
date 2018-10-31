import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavbarToggler, Collapse, Jumbotron, Container, Row, Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({isNavOpen: !this.state.isNavOpen});
  }

  render() {
    return (
        <>
          <Navbar dark expand="md">
            <Container>
              <NavbarToggler onClick={this.toggleNav}/>
              <NavbarBrand className="mr-auto" href="/">
                <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"/>
              </NavbarBrand>
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      <span className="fa fa-home fa-lg"/>Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/aboutus">
                      <span className="fa fa-info fa-lg"/>About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/menu">
                      <span className="fa fa-list fa-lg"/>Menu
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/contactus">
                      <span className="fa fa-address-card fa-lg"/>Contact Us
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <Jumbotron>
            <Container>
              <Row className="row-header">
                <Col sm={6}>
                  <h1>Ristorante Con Fusion</h1>
                  <p>We take inspiration from the World's best cuisines, and create a unique fusion experience.
                  Our lipsmacking creations will tickle your culinary senses!</p>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </>
    );
  }
}

export default Header;