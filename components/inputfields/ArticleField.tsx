import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState } from 'draft-js';

export interface ArticleFieldProps {
  className?: string;
}

const ArticleField = ({ className }: ArticleFieldProps) => {
  if (typeof window == "undefined") return <p></p>

  const [articleState, setArticleState] = useState(EditorState.createEmpty());
  const editorRef = useRef<Editor>(null)

  useEffect(() => {
    if (editorRef !== null) editorRef.current.focus();
  }, [editorRef]);

  return (
    <section className={`${className}`}>
      <article className="max-w-2xl mx-auto">
        <Editor 
          editorState={articleState} 
          onChange={setArticleState}
          ref={editorRef}
        />
      </article>
    </section>
  );
};

export default ArticleField;
