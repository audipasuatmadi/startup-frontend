import { WindowWidthReducer, WindowResizeAction } from './UtilTypes';
import { WINDOW_ACTION_TYPES } from './WindowActions';

const initialState: WindowWidthReducer = 'base';

export const WindowReducer = (
  state: WindowWidthReducer = initialState,
  action: WindowResizeAction
): WindowWidthReducer => {
  switch (action.type) {
    case WINDOW_ACTION_TYPES.SIZE_CHANGED:
      return action.payload;
    default:
      return state;
  }
};
