import React from 'react';
import Link from 'next/link';

export interface BaseButtonProps {
  name?: string
  disabled?: boolean;
  href?: string;
  children?: any;

  className?: string;
  type?: 'button' | 'submit' | 'reset';

  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

/**
 *
 * @version 0.1.0
 * @description this component is the base of all buttons. It does basic things such as deciding what to do if disabled, return Link or button, and many more!
 * @author Putu Audi Pasuatmadi
 */
const BaseButton = ({
  name,
  href,
  disabled,
  onClick,
  onMouseDown,
  children,
  type,
  className,
}: BaseButtonProps) => {
  const finalStyles = `${disabled ? 'cursor-default' : ''}${
    className ? ` ${className}` : ''
  }`;

  return href && !disabled ? (
    <Link href={href}>
      <a className={finalStyles !== '' ? finalStyles : undefined}>{children}</a>
    </Link>
  ) : (
    <button
      name={name}
      className={finalStyles !== '' ? finalStyles : undefined}
      disabled={disabled}
      type={type}
      onClick={!disabled && onClick}
      onMouseDown={!disabled && onMouseDown}
    >
      {children}
    </button>
  );
};

export default BaseButton;
