import React, { useState } from 'react';
import DevNavbar from '../../components/navbars/DevNavbar';
import WriteToolbar from '../../components/navbars/WriteToolbar';
import ArticleField from '../../components/inputfields/ArticleField';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import createImagePlugin from '@draft-js-plugins/image';
import { useDispatch, useSelector } from 'react-redux';
import ArticleThunks, {
  articleNoAction,
} from '../../lib/article/ArticleActions';
import { RootState } from '../../states/RootReducer';
import Modal from '../../components/modals/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import Button from '../../components/buttons/Button';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const newArticle = () => {
  const [articleState, setArticleState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const dispatch = useDispatch();
  const articleStatusState = useSelector(
    (state: RootState) => state.articleState
  );
  const handleRichText = (inlineStyle: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setArticleState(RichUtils.toggleInlineStyle(articleState, inlineStyle));
  };

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const urlValue = window.prompt('Paste Image Link');
    console.log(urlValue);
    if (urlValue === ' ' || urlValue === '') return;
    setArticleState(imagePlugin.addImage(articleState, urlValue, null));
  };

  const blockTypeHandler = (bType: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setArticleState(RichUtils.toggleBlockType(articleState, bType));
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contentState = articleState.getCurrentContent();
    const preparedContent = JSON.stringify(convertToRaw(contentState));
    dispatch(ArticleThunks.saveArticle(preparedContent));
  };

  return (
    <>
      {articleStatusState === 'loading' && (
        <Modal isLabelOnly>
          <ClipLoader color='#fff' loading size={150} />
        </Modal>
      )}
      {articleStatusState === 'success' && (
        <Modal>
          <div className='bg-white rounded px-8 py-2'>
            <p>Artikel berhasil di simpan!</p>
            <Button
              className='w-full'
              onClick={() => {
                dispatch(articleNoAction());
              }}>
              Siap
            </Button>
          </div>
        </Modal>
      )}
      {articleStatusState === 'error' && (
        <Modal>
          <div className='bg-white rounded px-8 py-2'>
            <p>Artikel gagal disimpan</p>
            <Button
              className='w-full'
              onClick={() => {
                dispatch(articleNoAction());
              }}>
              Siap
            </Button>
          </div>
        </Modal>
      )}
      <DevNavbar handleSave={handleSave} />
      <WriteToolbar
        richTextHandler={handleRichText}
        onImageClick={handleImageClick}
        blockTypeHandler={blockTypeHandler}
      />
      <ArticleField
        className='mt-52 mx-2 md:mx-32'
        articleState={articleState}
        setArticleState={setArticleState}
        plugins={plugins}
      />
    </>
  );
};

export default newArticle;
