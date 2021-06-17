import React from 'react';
import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  description: string;
  writerName?: string;
}

const ViewArticleCard = ({ id, description, name, writerName }: Props) => {
  return (
    <article className='articleList relative mb-4 lg:max-w-3xl'>
      <header className='font-bold text-brand'>
        <Link href={`/articles/${id}`}>{name}</Link>
      </header>
      <p
        className='font-ligh overflow-hidden overflow-ellipsis'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
        <Link href={`/articles/${id}`}>{description}</Link>
      </p>
      <p>{writerName}</p>
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

export default ViewArticleCard;
