import { UserAction, UserReducerType, UserRegisterErrorData, RegisterErrorAction } from './userTypes';
import { ACTION_TYPES } from './UserActions';

const userReducerInitialState: UserReducerType = 'logged_out';
const registerErrorReducerInitialState: UserRegisterErrorData = {}

export const UserReducer = (
  state: UserReducerType = userReducerInitialState,
  action: UserAction
): UserReducerType => {
  switch (action.type) {
    case ACTION_TYPES.IS_LOADING:
      return 'loading';
    case ACTION_TYPES.HAS_LOGGED_IN:
      if (!action.payload) return 'error';
      return action.payload;
    case ACTION_TYPES.HAS_LOGGED_OUT:
      return 'logged_out';
    case ACTION_TYPES.ERROR_OCCURED:
      return 'error';
    default:
      return state;
  }
};

export const RegisterErrorReducer = (state: UserRegisterErrorData = registerErrorReducerInitialState, action: RegisterErrorAction): UserRegisterErrorData => {
  switch (action.type) {
    case ACTION_TYPES.REGISTER_ERROR_OCCURED:
      return action.payload
    case ACTION_TYPES.REGISTER_SUCCESS:
      return {}
    default:
      return state;
  }
}