import React from 'react';
import Image from 'next/image';
import IconButton from '../buttons/IconButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../states/RootReducer';
import { widthHigherThan } from '../../lib/utils/WindowUtil';

interface Props {
  title: string;
  handleSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MobileDevMenu = ({title, handleSave}: Props) => (
  <>
    <IconButton
      icon={
        <Image
          src='/assets/svgs/ic-back-button.svg'
          width={25}
          height={25}
          alt='search bar image'
        />
      }
      className='ml-3'
    />

    <h1 className='text-white'>
      {
        title
          ? title
          : 'Unnamed Article'
      }
    </h1>

    <IconButton
      icon={
        <Image
          src='/assets/svgs/ic-gear.svg'
          width={25}
          height={25}
          alt='search bar image'
        />
      }
      className='mr-3'
    />
  </>
);

const DesktopDevMenu = ({ handleSave, title }: Props) => (
  <>
    <div className="flex gap-10">
      <IconButton
        icon={
          <Image
            src='/assets/svgs/ic-back-button.svg'
            width={25}
            height={25}
            alt='search bar image'
          />
        }
        className='ml-3'
      />
      <IconButton
        icon={
          <Image
            src='/assets/svgs/ic-save.svg'
            width={25}
            height={25}
            alt='search bar image'
          />
        }
        onMouseDown={handleSave}
        className='ml-3'
      />
      <IconButton
        icon={
          <Image
            src='/assets/svgs/ic-upload.svg'
            width={25}
            height={25}
            alt='search bar image'
          />
        }
        className='ml-3'
      />
    </div>

    <h1 className='text-white'>
      {
        title
          ? title
          : 'Unnamed Article'
      }
    </h1>

    <div className='flex gap-10'>
      <IconButton
        icon={
          <Image
            src='/assets/svgs/ic-barchart.svg'
            width={25}
            height={25}
            alt='search bar image'
          />
        }
        className='mr-3'
      />
      <IconButton
        icon={
          <Image
            src='/assets/svgs/ic-play.svg'
            width={25}
            height={25}
            alt='search bar image'
          />
        }
        className='mr-3'
      />
      <IconButton
        icon={
          <Image
            src='/assets/svgs/ic-question.svg'
            width={25}
            height={25}
            alt='search bar image'
          />
        }
        className='mr-3'
      />
    </div>
  </>
);

const DevNavbar = (props: Props) => {
  const screenSize = useSelector((state: RootState) => state.windowWidth);

  return (
    <nav className='fixed w-screen flex items-center justify-between py-2 shadow h-14 bg-brand z-50 top-0'>
      {
        widthHigherThan(screenSize, 'sm')
          ? <DesktopDevMenu {...props} />
          : <MobileDevMenu {...props} />
      }
    </nav>
  );
};

export default DevNavbar;
