import { UserAction } from './userTypes';
import UserAPI, { UserData, UserCredentials } from '../../apis/UserAPI';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../states/RootReducer';
import { Action } from 'redux';

export const ACTION_TYPES = {
  IS_LOADING: 'user/IS_LOADING',
  HAS_LOGGED_IN: 'user/HAS_LOGGED_IN',
  HAS_LOGGED_OUT: 'user/HAS_LOGGED_OUT',
  ERROR_OCCURED: 'user/ERROR_OCCURED',
};

export const registerUser = (
  userCredentials: UserCredentials
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
  dispatch(userDataIsLoading());
  const registerServiceResponse = await UserAPI.register(userCredentials);
  if (typeof registerServiceResponse === 'number') {
    registerServiceResponse === 201
      ? dispatch(
          userHasLoggedIn({
            name: userCredentials.name,
            username: userCredentials.username,
          })
        )
      : dispatch(errorOccuredInGettingUser());
    return;
  }
  if ('errorStatus' in registerServiceResponse) {
    dispatch(errorOccuredInGettingUser());
    return;
  } else {
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
