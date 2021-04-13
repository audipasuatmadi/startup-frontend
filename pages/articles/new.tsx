import React from 'react'
import DevNavbar from '../../components/navbars/DevNavbar'
import WriteToolbar from '../../components/navbars/WriteToolbar'
import ArticleField from '../../components/inputfields/ArticleField'

interface Props {
  
}

const newArticle = (props: Props) => {
  return (
    <>
      <DevNavbar />
      <WriteToolbar />
      <ArticleField className="mt-52 mx-2 md:mx-32"/>
    </>
  )
}

export default newArticle
