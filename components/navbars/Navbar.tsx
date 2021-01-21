import React, { useState, useEffect, useReducer } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TextField from '../inputfields/TextField';
import NavigationItem from './NavigationItem';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';

const searchIcon = (
  <Image
    src='/assets/svgs/ic-search.svg'
    width={25}
    height={25}
    alt='search bar image'
  />
);
const hamburgerIcon = (
  <Image
    src='/assets/svgs/ic-hamburger-menu.svg'
    width={25}
    height={25}
    alt='search bar image'
  />
);

const Navbar = () => {
  const [isMenuOpened, toggleIsMenuOpened] = useReducer(
    (isMenuOpened) => !isMenuOpened,
    false
  );

  return (
    <nav className='fixed w-screen flex items-center py-2 shadow h-14'>
      <Link href='/'>
        <a className='ml-8 whitespace-nowrap text-brand font-bold'>
          Elites Bible
        </a>
      </Link>

      <TextField
        id='searchBar'
        name='searchBar'
        type='text'
        placeholder='Pencarian...'
        solid
        leadingIcon={searchIcon}
        className='hidden md:inline-block md:w-3/12 lg:w-5/12 ml-12 mr-2'
      />

      <ul className='ml-auto md:hidden mr-5 whitespace-nowrap flex items-center'>
        <li className='sm:space-y-0 md:space-y-0 '>
          <IconButton icon={searchIcon} />
        </li>
        <li>
          <IconButton onClick={toggleIsMenuOpened} icon={hamburgerIcon} />
        </li>
      </ul>

      <div
        className={`fixed md:static w-screen h-screen top-0 mt-14 md:mt-0 md:top-auto md:w-auto md:h-auto sm:ml-auto bg-gray-200 md:bg-transparent ${
          isMenuOpened ? 'flex' : 'hidden md:flex'
        } justify-center items-center`}>
        <ul className='flex flex-col space-y-8 md:space-y-0 w-max md:ml-auto md:flex-row md:space-x-10 md:mr-14 items-center'>
          <NavigationItem href='/'>Beranda</NavigationItem>
          <NavigationItem href='/trending'>Trending</NavigationItem>
          <NavigationItem href='/articles'>Artikel</NavigationItem>
          <NavigationItem href='/courses'>Courses</NavigationItem>
          <NavigationItem>
            <Button rounded href='/login'>
              Bergabung
            </Button>
          </NavigationItem>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
