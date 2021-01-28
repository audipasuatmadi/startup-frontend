import UserAPI from './UserAPI';
import axios from './Index';
import { AxiosError } from 'axios';
import {
  UserCredentials,
  isRegisterSuccessResponse,
  isRegisterErrorResponse,
} from '../lib/user/userTypes';

jest.mock('./Index.ts');

describe('User Register Tests', () => {
  let mockedRegisterMethod: jest.Mock;

  const fakeUserCredential: UserCredentials = {
    name: 'John Doe',
    username: ' johndoe',
    password: 'hashedpassword',
  };

  beforeEach(() => {
    mockedRegisterMethod = axios.post as jest.Mock;
  });

  afterEach(() => {
    mockedRegisterMethod.mockClear();
  });

  it('should return an AxiosResponse with data if it works', async () => {
    mockedRegisterMethod.mockReturnValue(Promise.resolve({ status: 200 }));

    const data = await UserAPI.register(fakeUserCredential);
    expect(mockedRegisterMethod).toHaveBeenCalled();
    expect(mockedRegisterMethod).toHaveBeenCalledWith(
      '/users',
      fakeUserCredential
    );
    expect(data).toEqual({ status: 200 });
  });

  it("should return an AxiosError if it doesn't works & error details supplied", async () => {
    mockedRegisterMethod.mockReturnValue(
      Promise.reject({ isAxiosError: true, response: { data: {} } })
    );
    const data = await UserAPI.register(fakeUserCredential);
    if (isRegisterErrorResponse(data)) {
      expect(mockedRegisterMethod).toHaveBeenCalled();
      expect(mockedRegisterMethod).toHaveBeenCalledWith(
        '/users',
        fakeUserCredential
      );
      expect(JSON.stringify(data.response)).toMatch(
        JSON.stringify({ data: {} })
      );
    } else if (isRegisterSuccessResponse(data)) {
      expect(true).toBe(false);
    }
  });
});
