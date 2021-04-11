import React from 'react';
import IconButton from '../buttons/IconButton';
import Image from 'next/image';

interface Props {}

const WriteToolbar = (props: Props) => {
  return (
    <nav className='fixed w-screen flex items-center justify-between py-2 shadow h-14 bg-brand z-40 top-0 mt-12'>
      <ul className='text-center w-full text-white flex items-center justify-center space-x-10'>
        {/* {toolbarMenu.map((val, key) => (<InlineBlockLi key={key} content={val}/>))} */}
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
              <IconButton icon={<strong>B</strong>} />
            </li>

            <li className='inline-block'>
              <IconButton icon={<em>I</em>} />
            </li>
            <li className='inline-block'>
              <IconButton icon={<u>U</u>} />
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
              />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default WriteToolbar;
