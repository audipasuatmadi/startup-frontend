import { WindowResizeAction, TailwindBreakpoints } from './UtilTypes';

export const WINDOW_ACTION_TYPES = {
  SIZE_CHANGED: 'window/SIZE_CHANGED',
};

export const windowSizeChanged = (
  size: TailwindBreakpoints
): WindowResizeAction => ({
  type: WINDOW_ACTION_TYPES.SIZE_CHANGED,
  payload: size,
});
