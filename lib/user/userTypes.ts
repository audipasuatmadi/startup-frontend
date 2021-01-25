import { BaseActionType } from '../../states/RootReducer';
import { UserData, UserCredentials } from '../../apis/UserAPI';

export interface UserAction extends BaseActionType {
  payload?: UserData;
}

export interface UserAPIErrorResponse {
  errorData: string | {};
  errorStatus: number;
}

export interface UserRegisterForm extends UserCredentials {
  passwordConfirm: string
}

export type UserReducerType = UserData | 'loading' | 'error' | 'logged_out';
