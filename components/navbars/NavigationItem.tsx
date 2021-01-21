import React from 'react';
import Link from 'next/link';
import NavLink from './NavLink';

interface Props {
  href?: string;
  children: string | JSX.Element | null;
}

const NavigationItem = ({ children, href }: Props) => {
  if (children != null) {
    return (
      <li
        className='text-center'
        style={{
          height: 'max-content',
        }}>
        {typeof children === 'string' ? (
          <NavLink href={href ? href : '#'} activeClassName='font-semibold'>
            <a className='text-center text-gray-700 focus:outline-none bg-gray-500 bg-opacity-0 px-2 py-1 rounded focus:bg-opacity-50 transition-colors hover:bg-opacity-25'>
              {children}
            </a>
          </NavLink>
        ) : (
          children
        )}
      </li>
    );
  } else {
    return null;
  }
};

export default NavigationItem;
