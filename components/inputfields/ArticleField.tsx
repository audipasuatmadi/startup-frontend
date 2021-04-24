import React, { useRef, useEffect } from 'react';
import Editor from '@draft-js-plugins/editor';
import {
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftHandleValue,
  ContentBlock,
} from 'draft-js';

export interface ArticleFieldProps {
  className?: string;
  articleState: EditorState;
  setArticleState: React.Dispatch<React.SetStateAction<EditorState>>;
  plugins?: any[];
  readOnly?: boolean;
}

const typeMap = {
  'header-two': 'text-2xl font-bold',
  'header-three': 'text-xl font-bold',
  'header-four': 'text-lg font-bold',
};

function handleStyling(contentBlock: ContentBlock) {
  const type = contentBlock.getType();
  if (type === 'atomic') {
    return 'content-img-container';
  }
  if (typeMap[type]) {
    return typeMap[type];
  }
}

const ArticleField = ({
  className,
  articleState,
  setArticleState,
  plugins,
  readOnly
}: ArticleFieldProps) => {
  if (typeof window == 'undefined') return <p></p>;

  const editorRef = useRef<Editor>(null);

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setArticleState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  useEffect(() => {
    if (editorRef !== null) editorRef.current.focus();
  }, [editorRef]);

  return (
    <section className={`${className}`}>
      <article className='max-w-2xl mx-auto'>
        <Editor
          editorState={articleState}
          onChange={setArticleState}
          handleKeyCommand={handleKeyCommand}
          ref={editorRef}
          plugins={plugins}
          blockStyleFn={handleStyling}
          readOnly={readOnly}
        />
      </article>
    </section>
  );
};

export default ArticleField;
