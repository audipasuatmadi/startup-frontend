import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useArticleData } from '../../lib/article/Article.hooks';

interface Props {
  
}

const ViewArticle = (props: Props) => {
  const router = useRouter();
  const { articleId } = router.query

  const articleData = useArticleData(articleId)
  console.log(articleData);
  return (
    <div className="mt-64">
      {articleId}
    </div>
  )
}

export default ViewArticle
