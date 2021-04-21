import axios from './Index';
import { AxiosResponse, AxiosError } from 'axios';
import {
  EditorApiErrorResponse,
  isEditorApiErrorResponse,
} from './EditorApi.types';
import { unreachedServerError } from './UserAPI';

export default {
  async saveArticle(content: string) {
    let response: AxiosResponse | AxiosError<EditorApiErrorResponse>;

    try {
      response = await axios.post('/articles', {
        content: content,
      });
    } catch (e) {
      response = e;
      if (isEditorApiErrorResponse(response)) {
        return response;
      }
      return unreachedServerError;
    }
    return response;
  },
};
