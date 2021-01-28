import axios from './Index';
import { AxiosError, AxiosResponse } from 'axios';
import {
  UserRegisterSuccessData,
  UserRegisterErrorData,
  UserCredentials,
} from '../lib/user/userTypes';

const unreachedServerError: AxiosError<UserRegisterErrorData> = {
  config: {},
  isAxiosError: true,
  message: 'Service Unavailable',
  name: 'Service Unavailable',
  toJSON: () => ({}),
  response: {
    status: 503,
    statusText: 'Service Unavailable',
    data: { otherMessage: '503: Service Unavailable' },
    headers: {},
    config: {},
  },
};

export default {
  async register(userCredentials: UserCredentials) {
    let response:
      | AxiosResponse<UserRegisterSuccessData>
      | AxiosError<UserRegisterErrorData>;

    try {
      response = (await axios
        .post('/users', userCredentials)
        .then(
          (registerResponse: AxiosResponse<UserRegisterSuccessData>) =>
            registerResponse
        )) as AxiosResponse<UserRegisterSuccessData>;
    } catch (e) {
      response = e as AxiosError<UserRegisterErrorData>;
      if (!response.response) {
        response = unreachedServerError;
      }
    }
    return response;
  },
};
