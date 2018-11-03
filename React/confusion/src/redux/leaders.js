import PropTypes from "prop-types";
import * as ActionTypes from "./ActionTypes";

export const Leaders = (
    state = {
      isLoading: true,
      errMess: null,
      leaders: []
    }, action) => {

  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return {...state, isLoading: false, errMess: null, leaders: action.payload};

    case ActionTypes.LEADERS_LOADING:
      return {...state, isLoading: true, errMess: null, leaders: []};

    case ActionTypes.LEADERS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, leaders: []};

    default:
      return state;
  }
};
export const leaderPropTypes = PropTypes.shape({
  abbr: PropTypes.string,
  description: PropTypes.string.isRequired,
  designation: PropTypes.string,
  featured: PropTypes.bool,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});

export const leadersPropTypes = PropTypes.shape({
  isLoading: PropTypes.bool,
  errMess: PropTypes.string,
  leaders: PropTypes.arrayOf(leaderPropTypes).isRequired
});