import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';
import PropTypes from "prop-types";

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      let comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log("Add Comment: ", comment);
      return state.concat(comment);
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