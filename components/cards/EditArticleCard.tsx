import React from 'react';
import Link from 'next/link';

export interface EditArticleCard {
  id: number;
  name: string;
  description: string;
}

const EditArticleCard = ({ id, name, description }: EditArticleCard) => {
  return (
    <article className='articleList relative mb-4 lg:max-w-3xl'>
      <header className='font-bold text-brand'>
        <Link href={`/articles/edit/${id}`}>{name}</Link>
      </header>
      <p className="font-ligh overflow-hidden overflow-ellipsis" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
        <Link href={`/articles/edit/${id}`}>
          {description}
        </Link>
      </p>
      <style jsx>
        {`
          .articleList::after {
            content: '';
            margin-top: 1rem;
            position: absolute;
            background-color: #d0d3d8;
            width: 100%;
            height: 0.1rem;
          }
        `}
      </style>
    </article>
  );
};

export default EditArticleCard;
