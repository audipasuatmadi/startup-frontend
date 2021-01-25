import React, { useState, useRef } from 'react';

export interface TextFieldProps {
  name: string;
  id: string;
  type: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;

  labelText?: string;

  helperText?: string;
  error?: boolean;
  solid?: boolean;

  className?: string;

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
}


const getIfDisabledStyle = (disabled: boolean) => {
  return `${
    disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-text'
  }`;
};

const getIfSolid = (solid: boolean, error: boolean | undefined) => {
  return `${solid ? 'bg-gray-200' : `bg-none border-2`} ${
    error ? 'border-red-500 border-2' : 'border-gray-300'
  }`;
};

const getFocusedStyle = (solid: boolean) => {
  return `${
    solid
      ? `focus-within:ring-4 ring-brand ring-opacity-50`
      : `focus-within:border-brand focus-within:ring-4 ring-brand ring-opacity-50`
  }`;
};

const getTextFieldContainerStyle = (
  disabled: boolean,
  error: boolean | undefined,
  solid: boolean
) => {
  const finalStyle = `rounded ${getIfDisabledStyle(disabled)} ${getIfSolid(
    solid,
    error
  )} ${disabled ? '' : getFocusedStyle(solid)}`;
  return finalStyle;
};

const TextField = ({
  id,
  labelText,
  name,
  type,
  disabled,
  error,
  helperText,
  leadingIcon,
  onChange,
  onKeyPress,
  placeholder,
  solid,
  value,

  trailingIcon,

  className,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const myRef = useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      {labelText && (
        <>
          <label
            className={`ml-5${error ? ' text-red-600' : ' text-gray-400'} ${
              isFocused ? 'text-brand' : ''
            }`}
            htmlFor={id}>
            {labelText}
          </label>
          <br />
        </>
      )}

      <div
        className={`inline-block px-5 py-2 ${
          labelText ? 'mt-1' : ''
        } ${getTextFieldContainerStyle(disabled!, error, solid!)}${className ? ` ${className}` : ''}`}
        onClick={() => myRef.current && myRef.current.focus()}>
        <div className='flex items-center'>
          {leadingIcon}

          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            ref={myRef}
            className={`bg-transparent focus:outline-none w-full${
              leadingIcon ? ' ml-2' : ''
            }${trailingIcon ? ' mr-2' : ''}`}
            onChange={disabled ? undefined : onChange}
            onKeyPress={disabled ? undefined : onKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
          />

          {trailingIcon}
        </div>
      </div>

          {helperText && (
            <>
              <label
                className={`block ml-5${error ? ' text-red-600' : ' text-gray-400'}`}
                htmlFor={id}>
                {helperText}
              </label>
            </>
          )}
    </React.Fragment>
  );
};

export default TextField;
