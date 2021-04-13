import React from 'react';
import BaseButton from './BaseButton';

export interface TextButtonProps {
  name?: string
  disabled?: boolean;
  href?: string;
  children?: any;

  className?: string;
  type?: 'button' | 'submit' | 'reset';

  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  theme?: 'brand' | 'gray';
}

const TextButton: React.FC<TextButtonProps> = ({
  className,
  theme,
  disabled,
  ...otherProps
}: TextButtonProps) => {
  const themeList: [string, string][] = [];
  themeList['brand'] = ['brand', 'brand-light'];
  themeList['gray'] = ['gray-500', 'gray-300'];

  const [bgColor, bgLighterColor] = themeList[theme];

  const disabledFalseTheme = `text-${bgColor} transition-colors duration-200 hover:bg-opacity-30 hover:bg-${bgLighterColor} active:bg-${bgColor} focus:ring-4 ring-${bgColor} ring-opacity-50`;
  const disabledTrueTheme = `text-gray-400 cursor-default`;

  const finalStyles = `button bg-none ${
    disabled ? disabledTrueTheme : disabledFalseTheme
  } `;

  return (
    <BaseButton
      className={`${finalStyles}${className ? ` ${className}` : ''}`}
      disabled={disabled}
      {...otherProps}
    />
  );
};

TextButton.defaultProps = {
  theme: 'brand',
};

export default TextButton;
