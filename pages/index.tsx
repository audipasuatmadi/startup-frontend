import Head from 'next/head';
import { useEffect, useState } from 'react';
import { PublishedArticleData } from '../lib/article/ArticleActions.types';
import EditorAPI from '../apis/EditorAPI';
import { RawDraftContentState } from 'draft-js';
import ViewArticleCard from '../components/cards/ViewArticleCard';
export default function Home() {
  const [articles, setArticles] = useState<PublishedArticleData[]>([]);

  useEffect(() => {
    const handleGetArticles = async () => {
      const resArticles = await EditorAPI.getAllArticles();
      if (resArticles !== false) {
        const processedArticles: PublishedArticleData[] = resArticles.map(
          ({ content, ...otherArticle }: PublishedArticleData) => {
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
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className='mt-20 px-8 flex flex-col gap-5 md:mx-32 lg:mx-64'>
        <header className='font-bold text-xl text-brand'>Articles</header>
        {articles.map(({ id, title, content, createdAt, writer }, key) => (
          <ViewArticleCard
            key={key}
            id={id}
            name={title}
            description={content}
            writerName={writer.name}
            createdAt={new Date(createdAt)}
          />
        ))}
      </section>
    </div>
  );
}
