import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import EditArticleCard from '../../components/cards/EditArticleCard';
import axios from '../../apis/Index';
import EditorAPI from '../../apis/EditorAPI';
import { RawArticleData } from '../../lib/article/ArticleActions.types';

const me = () => {

  const [articles, setArticles] = useState<RawArticleData[]>([]);

  useEffect(() => {
    const handleGetArticles = async () => {
      const resArticles = await EditorAPI.getArticlesBySelfUser();
      if (resArticles !== false) {
        setArticles(resArticles.data.contents)
      }
      console.log(articles);
    }
    handleGetArticles();
  }, []);

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
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa mollitia, velit saepe, voluptatibus vero voluptatum, laborum nesciunt explicabo eveniet quas animi rerum? Vitae totam, alias minima cumque praesentium assumenda ipsam."
          />
        ))
      }
    </section>
  )
}

export default me
