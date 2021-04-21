import { ArticleReducerType } from './ArticleReducer.types';
import { ArticleAction } from './ArticleActions.types';
import { ARTICLE_ACTION_TYPES } from './ArticleActions';

const initialState: ArticleReducerType = 'no_action';

export const ArticleReducer = (
  state: ArticleReducerType = initialState,
  action: ArticleAction
): ArticleReducerType => {
  switch (action.type) {
    case ARTICLE_ACTION_TYPES.HAS_SAVED:
      return 'success';
    case ARTICLE_ACTION_TYPES.IS_LOADING:
      return 'loading';
    case ARTICLE_ACTION_TYPES.SAVE_FAILED:
      return 'error';
    case ARTICLE_ACTION_TYPES.NO_ACTION:
      return 'no_action';
    default:
      return state;
  }
};
