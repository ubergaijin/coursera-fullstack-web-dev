import * as ActionTypes from './ActionTypes';
import PropTypes from "prop-types";

export const Comments = (
    state = {
      errMess: null,
      comments: []
    }, action) => {

  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state,  errMess: action.payload, comments: []};

    case ActionTypes.ADD_COMMENT:
      let comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      return {...state, comments: state.comments.concat(comment)};

    default:
      return state;
  }
};

export const commentPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  dishId: PropTypes.number,
  rating: PropTypes.number,
  comment: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
});

export const commentsPropTypes = PropTypes.shape({
  errMess: PropTypes.string,
  comments: PropTypes.arrayOf(commentPropTypes).isRequired
});