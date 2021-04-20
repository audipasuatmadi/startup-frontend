import { BaseActionType } from "../../states/RootReducer";

export interface ArticleAction extends BaseActionType {
  payload?: string;
}