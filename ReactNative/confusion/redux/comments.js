import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.ADD_COMMENT:
      const newComment = { ...action.payload, id: state.comments.length };
      return { ...state, comments: state.comments.concat(newComment) };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload, comments: [] };

    default:
      return state;
  }
};