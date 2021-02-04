import UserAPI, {unreachedServerError} from './UserAPI';
import axios from './Index';
import { AxiosError } from 'axios';
import {
  UserCredentials,
  isRegisterSuccessResponse,
  isRegisterErrorResponse,
  RegistrationFailedResponse,
  UserLoginRequestData,
  LoginFailedResponse,
  LoginSuccessResponse,
} from '../lib/user/userTypes';
import { setLocalStorageData, removeLocalStorgeData } from '../lib/utils/LocalStorageUtil';


jest.mock('./Index.ts');
jest.mock('../lib/utils/LocalStorageUtil')

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
    mockedRegisterMethod.mockClear();
  });

  it("should return an AxiosError with the right credentials if server is can't be reached", async () => {
    mockedRegisterMethod.mockReturnValue(Promise.reject(new Error()));
    const data = (await UserAPI.register(fakeUserCredential)) as AxiosError<
      RegistrationFailedResponse
    >;
    expect(mockedRegisterMethod).toHaveBeenCalled();
    expect(JSON.stringify(data)).toMatch(JSON.stringify({
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
    }));
  });
});

describe('User Login Tests', () => {
  let mockedPostMethod: jest.Mock

  const dummyLoginData: UserLoginRequestData = {
    username: 'johndoe',
    password: 'password'
  }

  const dummyLoginFailedResponse: LoginFailedResponse = {
    username: 'kombinasi username & password tidak tepat',
    password: 'kombinasi username & password tidak tepat',
    otherMessage: 'other message'
  }

  const dummyLoginSuccessResponse: LoginSuccessResponse = {
    name: 'John Doe',
    username: 'johndoe',
    accessToken: 'azdawda',
    refreshToken: 'awdwadad'
  }

  beforeEach(() => {
    mockedPostMethod = axios.post as jest.Mock
  })

  afterEach(() => {
    mockedPostMethod.mockClear()
  })

  it('should call the post method', () => {
    expect(mockedPostMethod).toHaveBeenCalledTimes(1)
  })

  it('should call the post method to the right endpoint & with right arguments', () => {
    expect(mockedPostMethod).toHaveBeenCalledWith('/users/login', dummyLoginData)
  })

  it('should return a value regardless what happens', () => {
    expect(UserAPI.login).toHaveReturned()
  })

  it('should return the right response if the server can\'t be found', () => {
    mockedPostMethod.mockReturnValue(null)
    expect(UserAPI.login).toHaveReturnedWith(unreachedServerError)
  })

  it('should return the right response if login does not succeed', () => {
    mockedPostMethod.mockReturnValue(dummyLoginFailedResponse)
    expect(UserAPI.login).toHaveReturnedWith({response: {data: {dummyLoginFailedResponse}}})
    expect(removeLocalStorgeData).toHaveBeenCalled()
  })

  it('should return the right response if login succeed', () => {
    mockedPostMethod.mockReturnValue(dummyLoginSuccessResponse)
    expect(UserAPI.login).toHaveReturnedWith(dummyLoginSuccessResponse)
    expect(setLocalStorageData).toHaveBeenCalledTimes(2)
  })
})