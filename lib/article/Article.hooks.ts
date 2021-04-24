import { useState, useEffect } from "react";
import { RawArticleData, ViewArticleData } from "./ArticleActions.types";
import EditorAPI from "../../apis/EditorAPI";
import { isAxiosSuccessResponse } from "../../apis/Index.types";
import { isTypeRawArticle, isTypeViewArticle } from "../../apis/EditorApi.types";
import { UserData } from "../user/userTypes";

export const useArticleData = (articleId: number | string | string[]) => {
  const [articles, setArticles] = useState<ViewArticleData | null>(null);
  const [writerData, setWriterData] = useState<UserData | null>(null);

  const handleGetArticle = async (articleId: number) => {
    const response = await EditorAPI.getArticleById(articleId);
    if (isAxiosSuccessResponse(response)) {
      if (isTypeViewArticle(response.data)) {
        setArticles(response.data);
        setWriterData(response.data.writerData)
      }
    }
  }

  useEffect(() => {
    let finalArticleId: number;
    if (typeof articleId === 'string') {
      finalArticleId = parseInt(articleId);
    };

    if (!isNaN(finalArticleId)) {
      handleGetArticle(finalArticleId);
    }
  }, [articleId]);

  return {articles, writerData};
}