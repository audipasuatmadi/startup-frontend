import React from 'react'
import DevNavbar from '../../components/navbars/DevNavbar'
import WriteToolbar from '../../components/navbars/WriteToolbar'

interface Props {
  
}

const newArticle = (props: Props) => {
  return (
    <>
      <DevNavbar />
      <WriteToolbar />
    </>
  )
}

export default newArticle
