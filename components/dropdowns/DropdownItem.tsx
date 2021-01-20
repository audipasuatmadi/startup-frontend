import React from 'react';
import TextButton from '../buttons/TextButton';

export interface DropdownItemProps {
  name?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: string;
  disabled?: boolean;

  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  href?: string;

  divider?: boolean
}

const DropdownItem = ({className, divider, ...otherProps}: DropdownItemProps) => {
  return (
    <li
      className={`list-none${
        divider? ' border-t-2 border-gray-300' : ''
      }`}>
      <TextButton
        className='block w-full'
        {...otherProps}
      />
    </li>
  );
};

export default DropdownItem;
