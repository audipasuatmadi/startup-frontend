import { BaseActionType } from '../../states/RootReducer';
import { AxiosResponse, AxiosError } from 'axios';

export interface UserCredentials {
  name: string;
  username: string;
  password: string;
}

export interface UserData {
  name: string;
  username: string;
  profilePicURL?: string;
}

export interface UserAction extends BaseActionType {
  payload?: UserData;
}

export interface RegisterErrorAction extends BaseActionType {
  payload: UserRegisterErrorData;
}

export interface UserRegisterSuccessData extends UserData {
  accessToken: string;
  refreshToken: string;
}

export interface UserRegisterForm extends UserCredentials {
  passwordConfirm: string;
}

export interface UserRegisterErrorData {
  name?: string;
  username?: string;
  password?: string;
  otherMessage?: string;
}

export type UserReducerType = UserData | 'loading' | 'error' | 'logged_out';

export const isRegisterSuccessResponse = (
  obj:
    | AxiosResponse<UserRegisterSuccessData>
    | AxiosError<UserRegisterErrorData>
): obj is AxiosResponse<UserRegisterSuccessData> =>
  (obj as AxiosResponse<UserRegisterSuccessData>).status >= 200 &&
  (obj as AxiosResponse<UserRegisterSuccessData>).status < 300;

export const isRegisterErrorResponse = (
  obj:
    | AxiosResponse<UserRegisterSuccessData>
    | AxiosError<UserRegisterErrorData>
): obj is AxiosError<UserRegisterErrorData> =>
  (obj as AxiosError<UserRegisterErrorData>).isAxiosError === true;
