import * as ActionTypes from './ActionTypes';
import PropTypes from "prop-types";

export const Dishes = (
    state = {
      isLoading: true,
      errMess: null,
      dishes: []
    }, action) => {

  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {...state,  isLoading: false, errMess: null, dishes: action.payload};

    case ActionTypes.DISHES_LOADING:
      return {...state, isLoading: true,  errMess: null, dishes: []};

    case ActionTypes.DISHES_FAILED:
      return {...state, isLoading: false,  errMess: action.payload, dishes: []};

    default:
      return state;
  }
};

export const dishPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});

export const dishesPropTypes = PropTypes.shape({
  isLoading: PropTypes.bool,
  errMess: PropTypes.string,
  dishes: PropTypes.arrayOf(dishPropTypes).isRequired
});