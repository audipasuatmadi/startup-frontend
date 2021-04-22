import { BaseActionType } from '../../states/RootReducer';

export interface ArticleAction extends BaseActionType {
  payload?: string;
}

export interface RawArticleData {
  title: string;
  content: string;
}
