import { BaseActionType } from '../../states/RootReducer';

export interface ArticleAction extends BaseActionType {
  payload?: string;
}

export interface RawArticleData {
  id?: number;
  writerId?: number;
  title: string;
  content: string;
}

export interface BriefArticleData extends RawArticleData {}