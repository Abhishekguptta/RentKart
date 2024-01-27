import { combineReducers } from 'redux';
import commonReducer from './common';
import roomReducer from './room';
import userReducer from './user';

const reducer = combineReducers({
  userStore: userReducer,
  roomStore: roomReducer,
  commonStore: commonReducer,
});

export default reducer;
