import React from 'react';
import Image from 'next/image';
import IconButton from '../buttons/IconButton';

interface Props {}

const DevNavbar = (props: Props) => {
  return (
    <nav className='fixed w-screen flex items-center justify-between py-2 shadow h-14 bg-brand z-50 top-0'>
      <IconButton
        icon={
          <Image
            src='/assets/svgs/ic-back-button.svg'
            width={25}
            height={25}
            alt='search bar image'
          />
        }
        className="ml-3"
      />

      <h1 className="text-white">Unnamed Article</h1>

      <IconButton
        icon={
          <Image
            src='/assets/svgs/ic-gear.svg'
            width={25}
            height={25}
            alt='search bar image'
          />
        }
        className="mr-3"
      />
    </nav>
  );
};

export default DevNavbar;
