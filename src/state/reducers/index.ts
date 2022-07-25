import { combineReducers } from 'redux';
import userReducer from './userReducer';

const reducers = combineReducers({
  userState: userReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
