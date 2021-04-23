import React, { useEffect, useState } from 'react'
import EditArticleCard from '../../components/cards/EditArticleCard';
import EditorAPI from '../../apis/EditorAPI';
import { RawArticleData, BriefArticleData } from '../../lib/article/ArticleActions.types';
import { RawDraftContentState } from 'draft-js';
import { useSelector } from 'react-redux';
import { RootState } from '../../states/RootReducer';
import { isUserDataType } from '../../lib/user/userTypes';

const me = () => {

  const [articles, setArticles] = useState<RawArticleData[]>([]);
  const userData = useSelector((state: RootState) => state.userData)

  useEffect(() => {
    const handleGetArticles = async () => {
      if (!isUserDataType(userData)) return;
      const resArticles = await EditorAPI.getArticlesByUser(userData.id);
      if (resArticles !== false) {
        const processedArticles: BriefArticleData[] = resArticles.data.contents.map(({content, ...otherArticle}: RawArticleData) => {
          const parsedContent: RawDraftContentState = JSON.parse(content);
          const briefDescription = parsedContent.blocks.map(block => (!block.text.trim() && '\n') || block.text).join(' ');
          return {
            ...otherArticle,
            content: briefDescription
          }
        })
        setArticles(processedArticles);
      }
    }
    handleGetArticles();
  }, [userData]);

  useEffect(() => {
    console.log(articles);
  }, [articles])

  return (
    <section className="mt-20 px-8 flex flex-col gap-5 md:mx-32 lg:mx-64">
      <header className="font-bold text-xl text-brand">Articles</header>
      {
        articles.map(({id, title, content}, key) => (
          <EditArticleCard 
            key={key}
            id={id}
            name={title}
            description={content}
          />
        ))
      }
    </section>
  )
}

export default me
