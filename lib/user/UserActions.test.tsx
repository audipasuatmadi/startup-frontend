import * as UserActions from './UserActions';
import UserAPI from '../../apis/UserAPI';
import {
  RegistrationFailedResponse,
  RegistrationSuccessResponse,
  LoginSuccessResponse,
  AuthenticationTokens,
} from './userTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../states/RootReducer';
import { Action } from 'redux';
import { setLocalStorageData, removeLocalStorgeData } from '../utils/LocalStorageUtil';

describe('UserActions Action Creator Tests', () => {
  it('should return the right action if user data is loading', () => {
    expect(UserActions.userDataIsLoading().type).toEqual(
      UserActions.ACTION_TYPES.IS_LOADING
    );
  });

  it('should return the right action if user has logged in', () => {
    const actionReturnData = UserActions.userHasLoggedIn({
      name: 'John Doe',
      username: 'johndoe',
    });
    expect(JSON.stringify(actionReturnData)).toMatch(
      JSON.stringify({
        type: UserActions.ACTION_TYPES.HAS_LOGGED_IN,
        payload: { name: 'John Doe', username: 'johndoe' },
      })
    );
  });

  it('should return the right action if user has logged out', () => {
    const actionReturnData = UserActions.userHasLoggedOut();
    expect(actionReturnData.type).toMatch(
      UserActions.ACTION_TYPES.HAS_LOGGED_OUT
    );
  });

  it('should return the right action if error occured in user registration', () => {
    const actionReturnData = UserActions.errorOccuredInRegisteringUser({
      name: '1',
      otherMessage: '2',
      password: '3',
      username: '4',
    });
    expect(JSON.stringify(actionReturnData)).toMatch(
      JSON.stringify({
        name: '1',
        otherMessage: '2',
        password: '3',
        username: '4',
      })
    );
  });
});

jest.mock('../../apis/UserAPI.ts');
jest.mock('../utils/LocalStorageUtil');

const dummyRegisterErrorReturnValue: RegistrationFailedResponse = {
  otherMessage: 'something is wrong',
};

const dummyRegisterSuccessReturnValue = {
  status: 200,
  data: {
    accessToken: 'dummy access token',
    refreshToken: 'dummy refresh token',
    name: 'John Doe',
    username: 'johndoe',
  },
};

describe('registerUser Thunk Tests', () => {
  let registerUserCall: ThunkAction<
    void,
    RootState,
    null,
    Action<string>
  > = UserActions.registerUser({
    name: 'John Doe',
    username: 'johndoe',
    password: 'password',
  });
  let mockedUserRegisterAPI = UserAPI.register as jest.Mock;

  it('should dispatch userDataIsLoding before everything', async () => {
    mockedUserRegisterAPI.mockReturnValue(
      Promise.resolve(dummyRegisterSuccessReturnValue)
    );
    const userDataIsLoadingMock = jest.spyOn(UserActions, 'userDataIsLoading');
    const dispatch = jest.fn();

    await registerUserCall(dispatch, jest.fn(), null);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(UserActions.userDataIsLoading());
    expect(userDataIsLoadingMock).toHaveBeenCalled();
    mockedUserRegisterAPI.mockClear();
  });

  it('should call the register API', async () => {
    await registerUserCall(jest.fn(), jest.fn(), null);
    expect(mockedUserRegisterAPI).toHaveBeenCalled();
    mockedUserRegisterAPI.mockClear();
  });

  it('should dispatch userHasLoggedIn if it succeed', async () => {
    mockedUserRegisterAPI.mockReturnValue(
      Promise.resolve(dummyRegisterSuccessReturnValue)
    );
    const userHasLoggedInMock = jest.spyOn(UserActions, 'userHasLoggedIn');

    const dispatch = jest.fn();
    await registerUserCall(dispatch, jest.fn(), null);

    expect(mockedUserRegisterAPI).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(userHasLoggedInMock).toHaveBeenCalled();

    mockedUserRegisterAPI.mockClear();
  });

  it('should call localstorage store function to store tokens to localStorage if succeed', async () => {
    mockedUserRegisterAPI.mockReturnValue(
      Promise.resolve(dummyRegisterSuccessReturnValue)
    );
    const setLocalStorageDataMock = setLocalStorageData as jest.Mock;
    setLocalStorageDataMock.mockClear();

    const dispatch = jest.fn();
    await registerUserCall(dispatch, jest.fn(), null);

    expect(setLocalStorageDataMock).toHaveBeenCalledTimes(2);
    mockedUserRegisterAPI.mockClear();
    setLocalStorageDataMock.mockClear();
  });

  it('should dispatch errorOccuredInRegisteringUser action if it fails to register', async () => {
    const mockedErrorOccuredInRegisteringUser = jest.spyOn(
      UserActions,
      'errorOccuredInRegisteringUser'
    );
    const dispatch = jest.fn();

    mockedUserRegisterAPI.mockReturnValue(
      Promise.resolve({ response: { data: dummyRegisterErrorReturnValue } })
    );
    await registerUserCall(dispatch, jest.fn(), null);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(
      UserActions.errorOccuredInRegisteringUser(dummyRegisterErrorReturnValue)
    );
    expect(mockedErrorOccuredInRegisteringUser).toHaveBeenCalled();
  });
});
describe('loginUser thunk tests', () => {
  let loginUserCall: ThunkAction<
    void,
    RootState,
    null,
    Action<string>
  > = UserActions.loginUser({
    username: 'johndoe',
    password: 'password',
  });

  const dummyLoginSuccessResponse: LoginSuccessResponse = {
    name: 'John Doe',
    username: 'johndoe',
    accessToken: 'azdawda',
    refreshToken: 'awdwadad',
  };

  let mockedUserLoginAPI: jest.Mock;
  let mockedDispatch: jest.Mock;

  beforeEach(() => {
    mockedUserLoginAPI = UserAPI.login as jest.Mock;
    mockedDispatch = jest.fn();
  });

  afterEach(() => {
    mockedUserLoginAPI.mockClear();
    mockedDispatch.mockClear();
  });

  it('should dispatch userDataIsLoding before everything', async () => {
    const userDataIsLoadingMock = jest.spyOn(UserActions, 'userDataIsLoading');

    await loginUserCall(mockedDispatch, jest.fn(), null);
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedDispatch).toHaveBeenCalledWith(
      UserActions.userDataIsLoading()
    );
    expect(userDataIsLoadingMock).toHaveBeenCalled();
  });

  it('should call the login API', async () => {
    await loginUserCall(mockedDispatch, jest.fn(), null);
    expect(mockedUserLoginAPI).toHaveBeenCalledTimes(1)
  })
  
  it('should call the login API with the right credentials', async () => {
    await loginUserCall(mockedDispatch, jest.fn(), null);
    expect(mockedUserLoginAPI).toHaveBeenCalledWith({username: 'johndoe', password: 'password'})
  })

  it('should call 2 setLocalStorage if successful login attempt', async () => {
    mockedUserLoginAPI.mockReturnValue(Promise.resolve({data: dummyLoginSuccessResponse}))

    const mockedSetLocalStorage: jest.Mock = setLocalStorageData as jest.Mock
    await loginUserCall(mockedDispatch, jest.fn(), null);
    expect(mockedSetLocalStorage).toHaveBeenCalledTimes(2);
    
    mockedSetLocalStorage.mockClear();
  })

  it('should dispatch user data if successful login attempt', async () => {
    mockedUserLoginAPI.mockReturnValue(Promise.resolve({data: {name: 'John Doe', username: 'johndoe', accessToken: 'adw', refreshToken: 'awdad'}}))

    await loginUserCall(mockedDispatch, jest.fn(), null);

    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedDispatch).toHaveBeenCalledWith(UserActions.userHasLoggedIn({name: 'John Doe', username: 'johndoe'}));
  })

  it('should call removeLocalStorage if unsuccessful login attempt', async () => {
    mockedUserLoginAPI.mockReturnValue(Promise.resolve({isAxiosError: true, response: {data: {username: 'username tidak valid'}}}))

    const mockedRemoveLocalStorage: jest.Mock = removeLocalStorgeData as jest.Mock;
    await loginUserCall(mockedDispatch, jest.fn(), null);
    expect(mockedRemoveLocalStorage).toHaveBeenCalledTimes(2);

    mockedRemoveLocalStorage.mockClear();
  })

  it('should dispatch userHasLoggedOut if unsuccessful login attempt', async () => {
    mockedUserLoginAPI.mockReturnValue(Promise.resolve({isAxiosError: true, response: {data: {username: 'username tidak valid'}}}))

    await loginUserCall(mockedDispatch, jest.fn(), null);
    
    expect(mockedDispatch).toHaveBeenCalled()
    expect(mockedDispatch).toHaveBeenCalledWith(UserActions.userHasLoggedOut());
  })
});

describe("validateToken thunk tests", () => {

  const dummyTokens: AuthenticationTokens = {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ2lsIiwibmFtZSI6IlJhZ2lsIiwiaWF0IjoxNjE2MTUzMDM0LCJleHAiOjE2MTYxNTY2MzR9.vxm1Nb11ZWloEtQ6mdPFiXethFkzRYEwTqmHnmfhYIM",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ2lsIiwibmFtZSI6IlJhZ2lsIiwiaWF0IjoxNjE2MTUzMDM0fQ.is3nFpIEzkw6Gatbxx4YUH94ev1hPiyFrLD4jSITdEQ"
  };

  let validateTokenThunk: ThunkAction<
    void,
    RootState,
    null,
    Action<string>
  > = UserActions.validateToken(dummyTokens);

  let validateTokenCall = () => validateTokenThunk(mockedDispatch, jest.fn(), null);

  let mockedDispatch: jest.Mock;
  let mockedValidateTokenAPI: jest.Mock;

  beforeEach(() => {
    mockedDispatch = jest.fn();
    mockedValidateTokenAPI = UserAPI.validateToken as jest.Mock;
  })

  beforeEach(() => {
    if (mockedDispatch) mockedDispatch.mockClear();
    if (mockedValidateTokenAPI) mockedValidateTokenAPI.mockClear();
  })


  it('should dispatch userDataIsLoading UserActions first', () => {
    validateTokenCall();
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
  })

  it('should dispatch the API to validates token', async () => {
    await validateTokenCall();
    expect(mockedValidateTokenAPI).toHaveBeenCalledTimes(1);
    expect(mockedValidateTokenAPI).toHaveBeenCalledWith(dummyTokens);
  })


})

describe("logout user thunk tests", () => {
  const pUsername = "johndoe";

  const logoutUserThunk: ThunkAction<
    void,
    RootState,
    null,
    Action<string>
  > = UserActions.logoutUser(pUsername);

  let mDispatch: jest.Mock;
  let mLogoutAPI: jest.Mock;

  const logoutThunkCall = () => logoutUserThunk(mDispatch, jest.fn(), null);

  beforeEach(() => {
    mDispatch = jest.fn();
    mLogoutAPI = UserAPI.logout as jest.Mock;
  })

  afterEach(() => {
    if (mDispatch) mDispatch.mockClear();
    if (mLogoutAPI) mLogoutAPI.mockClear();
  })

  it('should call dispatch with isLoading first and foremost', () => {
    const mUserDataisLoading = jest.spyOn(UserActions, 'userDataIsLoading');
    logoutThunkCall();
    expect(mDispatch).toHaveBeenCalled();
    expect(mUserDataisLoading).toHaveBeenCalled();
    expect(mDispatch).toHaveBeenCalledWith(UserActions.userDataIsLoading());
  })
})