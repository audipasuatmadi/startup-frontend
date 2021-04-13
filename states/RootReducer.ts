import { combineReducers } from 'redux';
import {
  UserReducer,
  RegisterErrorReducer,
  LoginErrorReducer,
} from '../lib/user/UserReducer';
import { WindowReducer } from '../lib/utils/WindowReducer';

const RootReducer = combineReducers({
  userData: UserReducer,
  registerError: RegisterErrorReducer,
  loginError: LoginErrorReducer,
  windowWidth: WindowReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

export interface BaseActionType {
  type: string;
  payload?: any;
  error?: boolean;
}

export default RootReducer;
