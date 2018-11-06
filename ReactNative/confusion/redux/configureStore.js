import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import { favorites } from './favorites';

export const ConfigureStore = () => {
  return createStore(
      combineReducers({
        dishes,
        comments,
        promotions,
        leaders,
        favorites
      }),
      applyMiddleware(thunk, logger)
  );
};