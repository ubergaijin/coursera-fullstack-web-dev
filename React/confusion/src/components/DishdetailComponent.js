import PropTypes from 'prop-types';
import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
  Container, Row, Col, Button, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';

const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
  }

  toggle = () => this.setState({modal: !this.state.modal});

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
  }

  render() {
    return (
        <>
          <Button outline color="secondary" onClick={this.toggle}>
            <span className="fa fa-pencil"/> Submit Comment
          </Button>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
            <ModalBody>
              <Container>
                <LocalForm onSubmit={this.handleSubmit}>
                  <Row className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" id="rating" className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="author">Your Name</Label>
                    <Control.text model=".author" id="author"
                                  placeholder="Your Name" className="form-control"
                                  validators={{
                                    minLength: minLength(3),
                                    maxLength: maxLength(15)}}/>
                    <Errors className="text-danger" model=".author" show="touched"
                            messages={{
                              minLength: 'Must be greater than 2 characters',
                              maxLength: 'Must be 15 characters or less'
                            }}/>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="comment">Comment</Label>
                    <Control.textarea model=".comment" id="comment" rows="5" className="form-control"/>
                  </Row>
                  <Row className="form-group">
                    <Button color="primary" type="submit">Submit</Button>
                  </Row>
                </LocalForm>
              </Container>
            </ModalBody>
          </Modal>
        </>
    );
  }
}

const RenderDish = ({dish}) => (
    <Col md={5} className="m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}/>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </Col>
);

function RenderComments({comments}) {
  if (comments != null) {
    const dtf = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'});

    const commentItems = comments.map(comment =>
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>-- {comment.author}, {dtf.format(Date.parse(comment.date))}</p>
        </li>
    );

    return (
        <Col md={5} className="m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {commentItems}
          </ul>
          <CommentForm/>
        </Col>
    );
  } else {
    return <div/>;
  }
}

function DishDetail({dish, comments}) {
  if (dish != null) {
    return (
        <Container>
          <Row>
            <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <Col xs={12}>
              <h3>{dish.name}</h3>
              <hr/>
            </Col>
          </Row>
          <Row>
            <RenderDish dish={dish}/>
            <RenderComments comments={comments}/>
          </Row>
        </Container>
    );
  } else {
    return <div/>;
  }
}

export default DishDetail;

RenderDish.propTypes = {
  dish: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

RenderComments.propTypes = {
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
  ).isRequired
};

DishDetail.propTypes = {
  comments: PropTypes.arrayOf().isRequired,
  dish: PropTypes.object.isRequired
};