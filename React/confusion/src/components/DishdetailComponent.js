import PropTypes from 'prop-types';
import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

const RenderDish = ({dish}) => (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}/>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
);

function RenderComments({comments}) {
  if (comments != null) {
    const dtf = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'});

    const commentItems = comments.map(comment => (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>-- {comment.author}, {dtf.format(Date.parse(comment.date))}</p>
        </li>
    );

    return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {commentItems}
          </ul>
        </div>
    );
  } else {
    return <div/>;
  }
}

function DishDetail(props) {
  if (props.dish != null) {
    return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr/>
            </div>
          </div>
          <div className="row">
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.comments}/>
          </div>
        </div>
    );
  } else {
    return <div/>;
  }
}

export default DishDetail;

RenderDish.propTypes = {
  dish: PropTypes.object.isRequired
};

RenderComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

DishDetail.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  dish: PropTypes.object.isRequired
};