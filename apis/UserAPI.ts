import axios from './Index';
import { AxiosError, AxiosResponse } from 'axios';
import {
  RegistrationSuccessResponse,
  RegistrationFailedResponse,
  UserCredentials,
  UserLoginRequestData,
  LoginSuccessResponse,
  LoginFailedResponse,
  isLoginSuccessResponse,
  AuthenticationTokens,
} from '../lib/user/userTypes';
import login from '../pages/login';
import { number } from 'yup/lib/locale';
import { validateToken } from '../lib/user/UserActions';

export const unreachedServerError: AxiosError<RegistrationFailedResponse> = {
  config: {},
  isAxiosError: true,
  message: 'Service Unavailable',
  name: 'Service Unavailable',
  toJSON: () => ({}),
  response: {
    status: 503,
    statusText: 'Service Unavailable',
    data: { otherMessage: '503: Server Unavailable' },
    headers: {},
    config: {},
  },
};

export default {
  async register(userCredentials: UserCredentials) {
    let response:
      | AxiosResponse<RegistrationSuccessResponse>
      | AxiosError<RegistrationFailedResponse>;

    try {
      response = (await axios
        .post('/users', userCredentials)
        .then(
          (registerResponse: AxiosResponse<RegistrationSuccessResponse>) =>
            registerResponse
        )) as AxiosResponse<RegistrationSuccessResponse>;
    } catch (e) {
      response = e as AxiosError<RegistrationFailedResponse>;
      if (!response.response) {
        response = unreachedServerError;
      }
    }
    return response;
  },

  async login(loginCredentials: UserLoginRequestData) {
    let response:
      | AxiosResponse<LoginSuccessResponse>
      | AxiosError<LoginFailedResponse>;
    
    try {
      response = await axios.post('/users/login', loginCredentials)
      return response
    } catch (e) {
      response = e as AxiosError<LoginFailedResponse>

      if (!response) {
        return unreachedServerError;
      }

      if (!response.response) {
        response = unreachedServerError
      }
      return response
    }
  },

  async validateToken() {
    let response:
      | AxiosResponse<LoginSuccessResponse>
      | AxiosError<LoginFailedResponse>;
    
    try {
      response = await axios.post('/users/validate');
      return response;
    } catch (e) {
      response = e as AxiosError<LoginFailedResponse>
      
      if (!response) {
        return unreachedServerError;
      }

      if (!response.response) {
        response = unreachedServerError
      }
      return response
    }
  },

  async logout(username: string) {
    try {
      await axios.post('/users/logout', { username: username })
    } catch (e) {
      console.log(e);
    }
  }
};
