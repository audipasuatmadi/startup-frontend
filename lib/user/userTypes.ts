import { BaseActionType } from '../../states/RootReducer';
import { AxiosResponse, AxiosError } from 'axios';

export interface UserCredentials {
  name: string;
  username: string;
  password: string;
}

export interface UserLoginRequestData {
  username: string;
  password: string;
}

export interface LoginSuccessResponse extends RegistrationSuccessResponse {}

export interface LoginFailedResponse {
  username?: string
  password?: string
  otherMessage?: string
}

export interface UserData {
  id: number;
  name: string;
  username: string;
  profilePicURL?: string;
}

export interface UserAction extends BaseActionType {
  payload?: UserData;
}

export interface RegisterErrorAction extends BaseActionType {
  payload: RegistrationFailedResponse;
}

export interface LoginErrorAction extends BaseActionType {
  payload: RegistrationFailedResponse
}

export type RegistrationSuccessResponse = UserData;

export interface UserRegisterForm extends UserCredentials {
  passwordConfirm: string;
}

export interface RegistrationFailedResponse {
  name?: string;
  username?: string;
  password?: string;
  otherMessage?: string;
}

export type UserReducerType = UserData | 'loading' | 'error' | 'logged_out';

export const isRegisterSuccessResponse = (
  obj: any
): obj is AxiosResponse<RegistrationSuccessResponse> => {
  if (typeof obj !== 'object') return false;
  if ('status' in obj || 'data' in obj) {
    if (obj.status === 200 || obj.status === 201) {
      if ('name' in obj.data && 'username' in obj.data) return true;
    }
    return false;
  }
  return false;
}

export const isLoginSuccessResponse = isRegisterSuccessResponse

export const isRegisterErrorResponse = (
  obj: any
): obj is AxiosError<RegistrationFailedResponse> => {
  if (typeof obj !== 'object') return false;
  if ('isAxiosError' in obj && 'response' in obj) {
    if ('username' in obj.response.data || 'password' in obj.response.data || 'name' in obj.response.data || 'otherMessage' in obj.response.data) return true;
    return false 
  }
  return false
}

export const isLoginErrorResponse = (obj: any): obj is AxiosError<LoginFailedResponse> => {
  if (typeof obj !== 'object') return false;
  if ('isAxiosError' in obj && 'response' in obj) {
    if ('username' in obj.response.data || 'password' in obj.response.data || 'otherMessage' in obj.response.data) return true;
    return false 
  }
  return false
}

export const isUserDataType = (obj: any): obj is UserData => {
  if (typeof obj !== 'object') return false;
  if ('name' in obj && 'username' in obj) return true;
  return false;
};