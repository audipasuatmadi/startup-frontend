import React, { useState, useReducer } from 'react'
import DevNavbar from '../../components/navbars/DevNavbar'
import WriteToolbar from '../../components/navbars/WriteToolbar'
import ArticleField from '../../components/inputfields/ArticleField'
import { EditorState, RichUtils } from 'draft-js'
import createImagePlugin from '@draft-js-plugins/image'
import Modal from '../../components/modals/Modal'

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const newArticle = () => {
  const [articleState, setArticleState] = useState<EditorState>(EditorState.createEmpty());
  const handleRichText = (inlineStyle: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setArticleState(RichUtils.toggleInlineStyle(articleState, inlineStyle))
  }

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const urlValue = window.prompt("Paste Image Link");
    console.log(urlValue);
    if (urlValue === ' ' || urlValue === '') return;
    setArticleState(imagePlugin.addImage(articleState, urlValue, null));
  }

  return (
    <>
      <DevNavbar />
      <WriteToolbar 
        richTextHandler={handleRichText}
        onImageClick={handleImageClick}
      />
      <ArticleField 
        className="mt-52 mx-2 md:mx-32"
        articleState={articleState}
        setArticleState={setArticleState}
        plugins={plugins}
      />
    </>
  )
}

export default newArticle
