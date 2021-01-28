import * as UserActions from './UserActions';
import UserAPI from '../../apis/UserAPI';
import { UserRegisterErrorData } from './userTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../states/RootReducer';
import { Action } from 'redux';
import { setLocalStorageData } from '../utils/LocalStorageUtil';

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

describe('UserActions Thunk Tests', () => {
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
        Promise.resolve({ response: { data: {} } })
      );
      const userDataIsLoadingMock = jest.spyOn(
        UserActions,
        'userDataIsLoading'
      );
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
        Promise.resolve({
          data: { name: '', username: '', accessToken: '', refreshToken: '' },
          status: 200,
        })
      );
      const userHasLoggedInMock = jest.spyOn(UserActions, 'userHasLoggedIn');

      const dispatch = jest.fn();
      await registerUserCall(dispatch, jest.fn(), null);

      expect(mockedUserRegisterAPI).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalled();
      expect(userHasLoggedInMock).toHaveBeenCalled();

      mockedUserRegisterAPI.mockClear()
    });

    it('should call localstorage store function to store tokens to localStorage if succeed', async () => {
      mockedUserRegisterAPI.mockReturnValue(
        Promise.resolve({
          data: { name: '', username: '', accessToken: '', refreshToken: '' },
          status: 200,
        })
      );
      const setLocalStorageDataMock = setLocalStorageData as jest.Mock;
      setLocalStorageDataMock.mockClear();

      const dispatch = jest.fn();
      await registerUserCall(dispatch, jest.fn(), null);

      expect(setLocalStorageDataMock).toHaveBeenCalledTimes(2);
      mockedUserRegisterAPI.mockClear();
    });

    it('should dispatch errorOccuredInRegisteringUser action if it fails to register', async () => {
      const dummyErrorRegisterData: UserRegisterErrorData = {
        name: 'error nama',
        username: 'error username',
        password: 'error password',
        otherMessage: 'error lainnya',
      };
      const mockedErrorOccuredInRegisteringUser = jest.spyOn(
        UserActions,
        'errorOccuredInRegisteringUser'
      );
      const dispatch = jest.fn();

      mockedUserRegisterAPI.mockReturnValue(
        Promise.resolve({isAxiosError: true, response: {data: dummyErrorRegisterData}})
      );
      await registerUserCall(dispatch, jest.fn(), null);

      expect(dispatch).toHaveBeenCalledTimes(3)
      expect(dispatch).toHaveBeenCalledWith(UserActions.errorOccuredInRegisteringUser(dummyErrorRegisterData))
      expect(mockedErrorOccuredInRegisteringUser).toHaveBeenCalled()
    });
  });
});
