import React from 'react';
import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  description: string;
  writerName?: string;
  createdAt?: Date;
}

const ViewArticleCard = ({
  id,
  description,
  name,
  writerName,
  createdAt,
}: Props) => {
  return (
    <article className='articleList relative mb-4 px-4 py-2 rounded-md transition-shadow duraton-200 hover:shadow-lg lg:max-w-3xl'>
      <div className='flex gap-2'>
        <div>
          <div className='rounded-full w-7 h-7 bg-gray-500' />
        </div>
        <div>
          <p>{writerName}</p>
        </div>
      </div>
      <header className='font-bold text-brand'>
        <Link href={`/articles/${id}`}>{name}</Link>
      </header>
      <p
        className='font-light overflow-hidden overflow-ellipsis'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
        <Link href={`/articles/${id}`}>{description}</Link>
      </p>
      <p className='font-light'>{createdAt.toISOString().split('T')[0]}</p>
    </article>
  );
};

export default ViewArticleCard;
