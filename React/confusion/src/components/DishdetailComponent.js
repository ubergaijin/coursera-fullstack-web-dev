import PropTypes from 'prop-types';
import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

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
    const commentItems = comments.map(comment => {
      return (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
          </li>
      );
    });

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
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.dish.comments}/>
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
  dish: PropTypes.object
};