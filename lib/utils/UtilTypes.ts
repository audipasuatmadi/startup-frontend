import { BaseActionType } from '../../states/RootReducer';

export interface WindowResizeAction extends BaseActionType {
  payload: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'base';
}

export type TailwindBreakpoints = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'base';

export type WindowWidthReducer = TailwindBreakpoints;
