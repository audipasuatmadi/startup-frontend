import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  RawArticleData,
  BriefArticleData,
} from '../lib/article/ArticleActions.types';
import { useSelector } from 'react-redux';
import { RootState } from '../states/RootReducer';
import { isUserDataType } from '../lib/user/userTypes';
import EditorAPI from '../apis/EditorAPI';
import { RawDraftContentState } from 'draft-js';
import ViewArticleCard from '../components/cards/ViewArticleCard';
export default function Home() {
  const [articles, setArticles] = useState<RawArticleData[]>([]);
  const userData = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    const handleGetArticles = async () => {
      if (!isUserDataType(userData)) return;
      const resArticles = await EditorAPI.getArticlesByUser(userData.id);
      if (resArticles !== false) {
        const processedArticles: BriefArticleData[] = resArticles.data.contents.map(
          ({ content, ...otherArticle }: RawArticleData) => {
            const parsedContent: RawDraftContentState = JSON.parse(content);
            const briefDescription = parsedContent.blocks
              .map((block) => (!block.text.trim() && '\n') || block.text)
              .join(' ');
            return {
              ...otherArticle,
              content: briefDescription,
            };
          }
        );
        setArticles(processedArticles);
      }
    };
    handleGetArticles();
  }, [userData]);

  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className='mt-20 px-8 flex flex-col gap-5 md:mx-32 lg:mx-64'>
        <header className='font-bold text-xl text-brand'>Articles</header>
        {articles.map(({ id, title, content, writerId }, key) => (
          <ViewArticleCard
            key={key}
            id={id}
            name={title}
            description={content}
            writerName={writerId.toString()}
          />
        ))}
      </section>
    </div>
  );
}
