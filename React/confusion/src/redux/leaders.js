import {LEADERS} from '../shared/leaders';
import PropTypes from "prop-types";

export const Leaders = (state = LEADERS, action) => {
  switch (action.state) {
    default:
      return state;
  }
};

export const leaderPropTypes = PropTypes.shape({
  abbr: PropTypes.string,
  description: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  featured: PropTypes.bool,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});
