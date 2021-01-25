import { UserData } from '../../apis/UserAPI';
import { UserAction, UserReducerType } from './userTypes';
import { ACTION_TYPES } from './UserActions';

const initialState: UserReducerType = 'loading';

const UserReducer = (
  state: UserReducerType = initialState,
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

export default UserReducer;
