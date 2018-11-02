import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

function Footer() {
  return (
      <div className="footer">
        <Container>
          <Row className="justify-content-center">
            <Col xs={{size: 4, offset: 1}} sm={2}>
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/contactus">Contact Us</Link></li>
              </ul>
            </Col>
            <Col xs={7} sm={5}>
              <h5>Our Address</h5>
              <address>
                121, Clear Water Bay Road<br/>
                Clear Water Bay, Kowloon<br/>
                HONG KONG<br/>
                <i className="fa fa-phone fa-lg"/>: +852 1234 5678<br/>
                <i className="fa fa-fax fa-lg"/>: +852 8765 4321<br/>
                <i className="fa fa-envelope fa-lg"/>: <a href="mailto:confusion@food.net">
                confusion@food.net</a>
              </address>
            </Col>
            <Col xs={12} sm={4} className="align-self-center">
              <div className="text-center">
                <a className="btn btn-social-icon btn-google" href="http://google.com/+">
                  <i className="fa fa-google-plus"/></a>
                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id=">
                  <i className="fa fa-facebook"/></a>
                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/">
                  <i className="fa fa-linkedin"/></a>
                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/">
                  <i className="fa fa-twitter"/></a>
                <a className="btn btn-social-icon btn-google" href="http://youtube.com/">
                  <i className="fa fa-youtube"/></a>
                <a className="btn btn-social-icon" href="mailto:">
                  <i className="fa fa-envelope-o"/></a>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <p>© Copyright 2018 Ristorante Con Fusion</p>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Footer;