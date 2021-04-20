import React from 'react';
import IconButton from '../buttons/IconButton';
import Image from 'next/image';

interface WriteToolbarProps {
  richTextHandler: (
    inlineStyle: string
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  onImageClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const WriteToolbar = ({ richTextHandler, onImageClick }: WriteToolbarProps) => {
  return (
    <nav className='fixed w-screen flex items-center justify-between py-2 shadow h-14 bg-brand z-40 top-0 mt-12'>
      <ul className='text-center w-full text-white flex items-center justify-center space-x-10'>
        <li className='inline-block'>
          <ul className='space-x-2'>
            <li className='inline-block'>
              <IconButton icon={<strong>H1</strong>} />
            </li>
            <li className='inline-block'>
              <IconButton icon={<strong>H2</strong>} />
            </li>
            <li className='inline-block'>
              <IconButton icon={<strong>H3</strong>} />
            </li>
          </ul>
        </li>
        <li className='inline-block'>
          <ul className='space-x-2'>
            <li className='inline-block'>
              <IconButton
                icon={<strong>B</strong>}
                onMouseDown={richTextHandler('BOLD')}
              />
            </li>

            <li className='inline-block'>
              <IconButton
                icon={<em>I</em>}
                onMouseDown={richTextHandler('ITALIC')}
              />
            </li>
            <li className='inline-block'>
              <IconButton
                icon={<u>U</u>}
                onMouseDown={richTextHandler('UNDERLINE')}
              />
            </li>
          </ul>
        </li>
        <li className='inline-block'>
          <ul>
            <li className='flex items-center mt-1'>
              <IconButton
                icon={
                  <Image
                    src='/assets/svgs/ic-image.svg'
                    width={17}
                    height={17}
                    alt='search bar image'
                  />
                }
                onMouseDown={onImageClick}
              />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default WriteToolbar;
