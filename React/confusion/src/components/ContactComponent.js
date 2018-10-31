import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contactType: 'Tel.',
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({[target.name]: value});
  }

  handleSubmit(event) {
    console.log("Current State is: " + JSON.stringify(this.state));
    alert("Current State is: " + JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    return (
        <Container>
          <Row>
            <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Contact Us</BreadcrumbItem>
            </Breadcrumb>
            <Col xs={12}>
              <h3>Contact Us</h3>
              <hr/>
            </Col>
          </Row>
          <Row className="row-content">
            <Col xs={12}>
              <h3>Location Information</h3>
            </Col>
            <Col xs={12} sm={{size: 4, offset: 1}}>
              <h5>Our Address</h5>
              <address>
                121, Clear Water Bay Road<br/>
                Clear Water Bay, Kowloon<br/>
                HONG KONG<br/>
                <i className="fa fa-phone"/>: +852 1234 5678<br/>
                <i className="fa fa-fax"/>: +852 8765 4321<br/>
                <i className="fa fa-envelope"/>: <a href="mailto:confusion@food.net">confusion@food.net</a>
              </address>
            </Col>
            <Col xs={12} sm={{size: 6, offset: 1}}>
              <h5>Map of our Location</h5>
            </Col>
            <Col xs={12} sm={{size: 11, offset: 1}}>
              <ButtonGroup>
                <Button tag="a" color="primary" href="tel:+85212345678">
                  <i className="fa fa-phone"/> Call</Button>
                <Button tag="a" color="info">
                  <i className="fa fa-skype"/> Skype</Button>
                <Button tag="a" color="success" href="mailto:confusion@food.net">
                  <i className="fa fa-envelope-o"/> Email</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row className="row-content">
            <Col xs={12}>
              <h3>Send us Your Feedback</h3>
            </Col>
            <Col xs={12} md={9}>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label htmlFor="firstname" md={2}>First Name</Label>
                  <Col md={10}>
                    <Input type="text" id="firstname" name="firstname" placeholder="First Name"
                           value={this.state.firstname} onChange={this.handleInputChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="lastname" md={2}>Last Name</Label>
                  <Col md={10}>
                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name"
                           value={this.state.lastname} onChange={this.handleInputChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                  <Col md={10}>
                    <Input type="text" id="telnum" name="telnum" placeholder="Tel. Number"
                           value={this.state.telnum} onChange={this.handleInputChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="email" md={2}>Email</Label>
                  <Col md={10}>
                    <Input type="text" id="email" name="email" placeholder="Email"
                           value={this.state.email} onChange={this.handleInputChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={{size: 6, offset: 2}}>
                    <FormGroup check>
                      <Label check>
                          <Input type="checkbox" name="agree"
                                 checked={this.state.agree} onChange={this.handleInputChange}/>{' '}
                          <strong>May we contact you?</strong>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={{size: 3, offset: 1}}>
                    <Input type="select" name="contactType"
                           value={this.state.contactType} onChange={this.handleInputChange}>
                      <option>Tel.</option>
                      <option>Email</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="message" md={2}>Your Feedback</Label>
                  <Col md={10}>
                    <Input type="textarea" id="message" name="message" rows="12"
                           value={this.state.message} onChange={this.handleInputChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={{size: 10, offset: 2}}>
                    <Button type="submit" color="primary">
                        Send Feedback
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Contact;