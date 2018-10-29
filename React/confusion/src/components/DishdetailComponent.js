import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class Dishdetail extends Component {

  renderDish(dish) {
    return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name}/>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
    );
  }

  renderComments(comments) {
    if (comments != null) {
      const commentItems = comments.map(comment => {
        return (
            <li>
              <p>{comment.comment}</p>
              <p>-- {comment.author}, {comment.date}</p>
            </li>
        );
      });

      return (
          <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {commentItems}
            </ul>
          </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    if (this.props.dish != null) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Dishdetail;

Dishdetail.propTypes = {
  dish: PropTypes.object.isRequired
};