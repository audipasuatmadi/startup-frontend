import {
  UserAction,
  isRegisterSuccessResponse,
  UserCredentials,
  UserData,
  RegisterErrorAction,
  RegistrationFailedResponse,
} from './userTypes';
import UserAPI from '../../apis/UserAPI';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../states/RootReducer';
import { Action } from 'redux';
import { setLocalStorageData } from '../utils/LocalStorageUtil';

export const ACTION_TYPES = {
  IS_LOADING: 'user/IS_LOADING',
  HAS_LOGGED_IN: 'user/HAS_LOGGED_IN',
  HAS_LOGGED_OUT: 'user/HAS_LOGGED_OUT',
  ERROR_OCCURED: 'user/ERROR_OCCURED',

  REGISTER_ERROR_OCCURED: '/user/register/ERROR_OCCURED',
  REGISTER_SUCCESS: '/user/register/NO_ERROR_OCCURED',
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
      accessToken,
      refreshToken,
    } = registerServiceResponse.data;
    dispatch(userHasLoggedIn({ name, username, profilePicURL }));
    setLocalStorageData('at', accessToken);
    setLocalStorageData('rt', refreshToken);
  } else {
    dispatch(userHasLoggedOut());
    const errorData = registerServiceResponse.response.data;
    dispatch(errorOccuredInRegisteringUser(errorData));
  }
};

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
