import React from 'react'
import BaseButton from './BaseButton'

export interface IconButtonProps {
  disabled?: boolean;
  href?: string;

  className?: string;
  type?: 'button' | 'submit' | 'reset';

  onClick?: () => void;
  icon:  React.FunctionComponent<React.SVGProps<SVGSVGElement>> | (() => JSX.Element) | JSX.Element;
}

const IconButton = ({disabled, className, icon: Icon, ...otherProps}: IconButtonProps) => {

  const finalStyles = `p-1 rounded outline-none focus:outline-none flex items-center justify-center ${
    disabled
      ? `cursor-not-allowed`
      : `bg-gray-500 bg-opacity-0 hover:bg-opacity-50 transition-all focus:ring-2 ring-brand ring-opacity-50 active:bg-gray-300`
  }`;

  return (
    <BaseButton className={`${finalStyles}${className? ` ${className}`: ''}`} disabled={disabled}>
      {Icon}
    </BaseButton>
  )
}

export default IconButton
