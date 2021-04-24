import { AxiosResponse } from 'axios';
import { RawArticleData } from '../lib/article/ArticleActions.types';

export interface EditorApiErrorResponse {
  message: string;
}

export const isEditorApiErrorResponse = (
  testedObj: any
): testedObj is EditorApiErrorResponse => {
  if ('data' in testedObj) return false;
  if ('response' in testedObj === false) return false;
  return true;
};

export const isEditorApiSuccessResponse = (
  testedObj: any
): testedObj is AxiosResponse => {
  if ('isAxiosError' in testedObj) return false;
  if ('data' in testedObj) if (typeof testedObj.data === 'object') return true;
  return false;
};

export const isTypeRawArticle = (testObj: any): testObj is RawArticleData => {
  if ('title' in testObj && 'content' in testObj) return true;
  return false;
}