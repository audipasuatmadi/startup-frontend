import { combineReducers } from 'redux';
import {UserReducer, RegisterErrorReducer} from '../lib/user/UserReducer';

const RootReducer = combineReducers({
  userData: UserReducer,
  registerError: RegisterErrorReducer
});

export type RootState = ReturnType<typeof RootReducer>;

export interface BaseActionType {
  type: string;
  payload?: any;
  error?: boolean;
}

export default RootReducer;
