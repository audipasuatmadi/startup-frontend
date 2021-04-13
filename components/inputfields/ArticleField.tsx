import React, { useState, useRef, useEffect } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftHandleValue,
} from 'draft-js';

export interface ArticleFieldProps {
  className?: string;
  articleState: EditorState;
  setArticleState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const ArticleField = ({ className, articleState, setArticleState }: ArticleFieldProps) => {
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
        />
      </article>
    </section>
  );
};

export default ArticleField;
