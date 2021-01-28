import axios from './Index';
import { AxiosError, AxiosResponse } from 'axios';
import {
  UserRegisterSuccessData,
  UserRegisterErrorData,
  UserCredentials,
} from '../lib/user/userTypes';

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
    }
    return response;
  },
};
