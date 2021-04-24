import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useArticleData } from '../../lib/article/Article.hooks';
import ArticleField from '../../components/inputfields/ArticleField';
import { EditorState, convertFromRaw } from 'draft-js';
import createImagePlugin from '@draft-js-plugins/image';

interface Props {
  
}

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const ViewArticle = (props: Props) => {

  const router = useRouter();
  const { articleId } = router.query
  const articleData = useArticleData(articleId)
  
  const [articleState, setArticleState] = useState<EditorState>(
    EditorState.createEmpty()
  )

  useEffect(() => {
    if (articleData === null) return;
    const contentState = convertFromRaw(JSON.parse(articleData.content));
    setArticleState(EditorState.createWithContent(contentState));
  }, [articleData]);

  if (!articleData) return <p>loading</p>
  return (
    <div className="mt-32 mx-2 sm:mx-12 lg:mx-32">
      <h1 className="text-4xl text-brand font-bold max-w-2xl mx-auto">
        {articleData.title}
      </h1>
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
