import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useArticleData } from '../../lib/article/Article.hooks';
import ArticleField from '../../components/inputfields/ArticleField';
import { EditorState, convertFromRaw } from 'draft-js';
import createImagePlugin from '@draft-js-plugins/image';
import IconButton from '../../components/buttons/IconButton';

interface Props {
  
}

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const ViewArticle = (props: Props) => {

  const router = useRouter();
  const { articleId } = router.query
  const {articles: articleData, writerData} = useArticleData(articleId)
  
  const [articleState, setArticleState] = useState<EditorState>(
    EditorState.createEmpty()
  )

  useEffect(() => {
    if (articleData === null) return;
    const contentState = convertFromRaw(JSON.parse(articleData.content));
    setArticleState(EditorState.createWithContent(contentState));
  }, [articleData]);

  if (!articleData  || !writerData) return <p>loading</p>
  return (
    <div className="mt-32 mx-4 sm:mx-12 lg:mx-32">
      <h1 className="text-4xl text-brand font-bold max-w-2xl mx-auto">
        {articleData.title}
      </h1>
      <div className="flex gap-2 max-w-2xl mx-auto mt-4">
        <div className="flex items-center">
          <Link
            href={`/u/${writerData.id}`}
          >
            <a>
              <div className='h-10 w-10 rounded-full bg-gray-700' ></div>
            </a>
          </Link>
        </div>
        <div>
          <Link
            href={`/u/${writerData.id}`}
          >
            <a className="text-brand font-medium">{writerData.name}</a>
          </Link>
          <p className="text-brand font-light">{
            articleData.updatedAt
          }</p>
        </div>
      </div>
      <ArticleField
        className='mt-8'
        articleState={articleState}
        setArticleState={setArticleState}
        readOnly
        plugins={plugins}
      />
    </div>
  )
}

export default ViewArticle
