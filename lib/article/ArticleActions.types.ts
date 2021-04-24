import { BaseActionType } from '../../states/RootReducer';
import { UserData } from '../user/userTypes';

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

export interface ViewArticleData extends RawArticleData {
  writerData: UserData
  createdAt: string
  updatedAt: string
}