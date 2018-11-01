import {createStore} from 'redux';
import {Reducer, initialState} from './reducer';

export const ConfigureStore = () => {
  return createStore(Reducer, initialState);
};