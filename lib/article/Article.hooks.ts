import { useState, useEffect } from "react";
import { RawArticleData } from "./ArticleActions.types";
import EditorAPI from "../../apis/EditorAPI";
import { isAxiosSuccessResponse } from "../../apis/Index.types";
import { isTypeRawArticle } from "../../apis/EditorApi.types";

export const useArticleData = (articleId: number | string | string[]) => {
  const [articles, setArticles] = useState<RawArticleData | null>(null);

  const handleGetArticle = async (articleId: number) => {
    const response = await EditorAPI.getArticleById(articleId);
    if (isAxiosSuccessResponse(response)) {
      if (isTypeRawArticle(response.data.content)) {
        setArticles(response.data.content);
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

  return articles;
}