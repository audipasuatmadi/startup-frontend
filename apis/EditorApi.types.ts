import { AxiosResponse } from "axios";

export interface EditorApiErrorResponse {
  message: string
}

export const isEditorApiErrorResponse = (testedObj: any): testedObj is EditorApiErrorResponse => {
  if ('data' in testedObj) return false;
  if ('response' in testedObj === false) return false;
  if ('message' in testedObj.response.data) return true;
}

export const isEditorApiSuccessResponse = (testedObj: any): testedObj is AxiosResponse<string> => {
  if ('isAxiosError' in testedObj) return false;
  if ('data' in testedObj)
    if (typeof testedObj.data === 'string') return true;
  return false;
}