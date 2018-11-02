import PropTypes from "prop-types";
import * as ActionTypes from "./ActionTypes";

export const Promotions = (
    state = {
      isLoading: true,
      errMess: null,
      promotions: []
    }, action) => {

  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {...state, isLoading: false, errMess: null, promotions: action.payload};

    case ActionTypes.PROMOS_LOADING:
      return {...state, isLoading: true, errMess: null, promotions: []};

    case ActionTypes.PROMOS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, promotions: []};

    default:
      return state;
  }
};

export const promotionPropTypes = PropTypes.shape({
  description: PropTypes.string,
  featured: PropTypes.bool,
  id: PropTypes.number,
  image: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string
});

export const promotionsPropTypes = PropTypes.shape({
  isLoading: PropTypes.bool,
  errMess: PropTypes.string,
  promotions: PropTypes.arrayOf(promotionPropTypes).isRequired
});