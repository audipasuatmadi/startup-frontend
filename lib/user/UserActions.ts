import {
  UserAction,
  isRegisterSuccessResponse,
  UserCredentials,
  UserData,
  RegisterErrorAction,
  RegistrationFailedResponse,
  UserLoginRequestData,
  isLoginSuccessResponse,
  isLoginErrorResponse,
  LoginFailedResponse,
  LoginErrorAction,
} from './userTypes';
import UserAPI from '../../apis/UserAPI';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../states/RootReducer';
import { Action } from 'redux';
import {
  setLocalStorageData,
  removeLocalStorgeData,
} from '../utils/LocalStorageUtil';

export const ACTION_TYPES = {
  IS_LOADING: 'user/IS_LOADING',
  HAS_LOGGED_IN: 'user/HAS_LOGGED_IN',
  HAS_LOGGED_OUT: 'user/HAS_LOGGED_OUT',
  ERROR_OCCURED: 'user/ERROR_OCCURED',

  REGISTER_ERROR_OCCURED: '/user/register/ERROR_OCCURED',
  REGISTER_SUCCESS: '/user/register/NO_ERROR_OCCURED',

  LOGIN_ERROR_OCCURED: '/user/login/ERROR_OCCURED',
  LOGIN_SUCCESS: '/user/login/SUCCESS',
};

export const registerUser = (
  userCredentials: UserCredentials
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
  dispatch(userDataIsLoading());

  const registerServiceResponse = await UserAPI.register(userCredentials);
  if (isRegisterSuccessResponse(registerServiceResponse)) {
    const {
      name,
      username,
      profilePicURL,
    } = registerServiceResponse.data;
    dispatch(userHasLoggedIn({ name, username, profilePicURL }));
  } else {
    dispatch(userHasLoggedOut());
    const errorData = registerServiceResponse.response.data;
    dispatch(errorOccuredInRegisteringUser(errorData));
  }
};

export const loginUser = (
  loginCredentials: UserLoginRequestData
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
  dispatch(userDataIsLoading());

  const loginReturnData = await UserAPI.login(loginCredentials);
  if (isLoginSuccessResponse(loginReturnData)) {
    const { name, username } = loginReturnData.data;
    dispatch(userHasLoggedIn({ name, username }));

  }

  if (isLoginErrorResponse(loginReturnData)) {
    dispatch(userHasLoggedOut());
    dispatch(errorOccuredInUserLogin(loginReturnData.response.data));

  }
};

export const validateToken = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  dispatch(userDataIsLoading());

  const validateReturnData = await UserAPI.validateToken();
  if ('status' in validateReturnData) {
    if (validateReturnData.status !== 200 && validateReturnData.status !== 201) {
      dispatch(userHasLoggedOut());
    } else {
      dispatch(userHasLoggedIn(validateReturnData.data));
    }
  } else {
    dispatch(userHasLoggedOut());
  }
};

export const logoutUser = (
  username: string
): ThunkAction<void, RootState, null, Action<string>> => (dispatch) => {
  dispatch(userDataIsLoading());

  UserAPI.logout(username);

  removeLocalStorgeData('at');
  removeLocalStorgeData('rt');

  dispatch(userHasLoggedOut());
}

export const userDataIsLoading = (): UserAction => ({
  type: ACTION_TYPES.IS_LOADING,
});

export const userHasLoggedIn = (userData: UserData): UserAction => ({
  type: ACTION_TYPES.HAS_LOGGED_IN,
  payload: userData,
});

export const userHasLoggedOut = (): UserAction => ({
  type: ACTION_TYPES.HAS_LOGGED_OUT,
});

export const errorOccuredInGettingUser = (): UserAction => ({
  type: ACTION_TYPES.ERROR_OCCURED,
  error: true,
});

export const errorOccuredInRegisteringUser = (
  errorDetails: RegistrationFailedResponse
): RegisterErrorAction => ({
  type: ACTION_TYPES.REGISTER_ERROR_OCCURED,
  payload: errorDetails,
  error: true,
});

export const errorOccuredInUserLogin = (
  errorDetails: LoginFailedResponse
): LoginErrorAction => ({
  type: ACTION_TYPES.LOGIN_ERROR_OCCURED,
  payload: errorDetails,
  error: true,
});
