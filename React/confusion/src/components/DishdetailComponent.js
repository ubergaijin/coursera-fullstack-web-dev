import PropTypes from 'prop-types';
import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';

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