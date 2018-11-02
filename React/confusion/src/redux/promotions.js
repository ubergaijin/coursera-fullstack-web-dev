import {PROMOTIONS} from '../shared/promotions';
import PropTypes from "prop-types";

export const Promotions = (state = PROMOTIONS, action) => {
  switch (action.state) {
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
