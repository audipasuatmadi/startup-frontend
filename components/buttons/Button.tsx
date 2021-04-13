import React from 'react';
import BaseButton from './BaseButton';

type themes = 'brand' | 'add later';

export interface ButtonProps {
  disabled?: boolean;
  href?: string;
  children?: any;

  className?: string;
  type?: 'button' | 'submit' | 'reset';

  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

  rounded?: boolean;
  outlined?: boolean;
  theme?: themes;
}

/**
 * 
 * @version 0.1.0
 * @description basically wraps BaseButton, adding `outlined` and `rounded` features.
 * @param rounded boolean
 * @param outlined boolean
 * @author Putu Audi Pasuatmadi 
 */
const Button: React.FC<ButtonProps> = ({
  outlined,
  rounded,
  theme,
  disabled,
  className,
  ...otherProps
}: ButtonProps) => {
  const finalStyles = `button${rounded ? ' rounded-full' : ''}${
    disabled
      ? ` button-disabled bg-${theme}-dark text-white`
      : `${
          outlined
            ? ` bg-none border-2 border-${theme} text-${theme} hover:text-white`
            : ` bg-${theme} text-white`
        } hover:bg-${theme}-dark active:bg-${theme}-light focus:ring-4 ring-${theme} ring-opacity-50`
  } ${className}`;

  return (
    <BaseButton
      className={`${finalStyles}`}
      disabled={disabled}
      {...otherProps}
    />
  );
};

Button.defaultProps = {
  theme: 'brand'
}

export default Button;
