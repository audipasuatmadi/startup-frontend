import { ArticleAction } from './ArticleActions.types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../states/RootReducer';
import { Action } from 'redux';
import EditorAPI from '../../apis/EditorAPI';
import { isEditorApiSuccessResponse } from '../../apis/EditorApi.types';

export const ARTICLE_ACTION_TYPES = {
  IS_LOADING: 'article/IS_LOADING',
  HAS_SAVED: 'article/HAS_SAVED',
  SAVE_FAILED: 'article/SAVE_FAILED',
  NO_ACTION: 'article/NO_ACTION',
};

export const articleIsLoading = (): ArticleAction => ({
  type: ARTICLE_ACTION_TYPES.IS_LOADING,
  payload: 'loading',
});

export const articleHasSaved = (): ArticleAction => ({
  type: ARTICLE_ACTION_TYPES.HAS_SAVED,
  payload: 'saved',
});

export const articleErrorInSaving = (): ArticleAction => ({
  type: ARTICLE_ACTION_TYPES.SAVE_FAILED,
  payload: 'error',
});

export const articleNoAction = (): ArticleAction => ({
  type: ARTICLE_ACTION_TYPES.NO_ACTION,
  payload: 'no_action',
});

export default {
  saveArticle: (
    content: string
  ): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    dispatch(articleIsLoading());

    const response = await EditorAPI.saveArticle(content);

    if (isEditorApiSuccessResponse(response)) {
      dispatch(articleHasSaved());
      return;
    }

    dispatch(articleErrorInSaving());
  },
};
