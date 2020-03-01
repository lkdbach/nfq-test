import { combineReducers } from 'redux';
import collection from './collection.reducer';

const createRootReducer = () =>
  combineReducers({
    collection
  });

export default createRootReducer;
