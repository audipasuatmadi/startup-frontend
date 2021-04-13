import React, { useState } from 'react'
import DevNavbar from '../../components/navbars/DevNavbar'
import WriteToolbar from '../../components/navbars/WriteToolbar'
import ArticleField from '../../components/inputfields/ArticleField'
import { EditorState, RichUtils } from 'draft-js'

interface Props {
  
}

const newArticle = (props: Props) => {
  const [articleState, setArticleState] = useState<EditorState>(EditorState.createEmpty());
  
  // const handleRichText = (e: React.MouseEvent<HTMLButtonElement>) => (inlineStyle: string) => {
  //   RichUtils.toggleInlineStyle(articleState, inlineStyle)
  // }
  const handleRichText = (inlineStyle: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setArticleState(RichUtils.toggleInlineStyle(articleState, inlineStyle))
  }

  return (
    <>
      <DevNavbar />
      <WriteToolbar 
        richTextHandler={handleRichText}
      />
      <ArticleField 
        className="mt-52 mx-2 md:mx-32"
        articleState={articleState}
        setArticleState={setArticleState}
      />
    </>
  )
}

export default newArticle
