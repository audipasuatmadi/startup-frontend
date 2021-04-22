import axios from './Index';
import { AxiosResponse, AxiosError } from 'axios';
import {
  EditorApiErrorResponse,
  isEditorApiErrorResponse,
  isEditorApiSuccessResponse,
} from './EditorApi.types';
import { unreachedServerError } from './UserAPI';
import { RawArticleData } from '../lib/article/ArticleActions.types';

export default {
  async saveArticle(content: RawArticleData) {
    let response: AxiosResponse | AxiosError<EditorApiErrorResponse>;

    try {
      response = await axios.post('/articles', content);
    } catch (e) {
      response = e;
      if (isEditorApiErrorResponse(response)) {
        return response;
      }
      return unreachedServerError;
    }
    return response;
  },

  async getArticlesBySelfUser() {
    let response: AxiosResponse | AxiosError<EditorApiErrorResponse>;

    try {
      response = await axios.get('articles/u/1');
    } catch (e) {
      response = e;
      if (isEditorApiErrorResponse(response)) {
        console.log(e)
      }
      console.log(e)
      return false;
    }

    if (isEditorApiSuccessResponse(response)) {
      return response;
    } else {
      return false;
    }
  }
};
