import React from 'react';

interface TitleField extends React.HTMLProps<HTMLInputElement> {}

const TitleField = ({ id, key, className, placeholder, ...otherProps }: TitleField) => {
  return (
    <form 
      className="w-1/2"
      autoComplete="off"
    >
      <input
        className={
          `focus-within:border-brand focus-within:ring-4 
          ring-brand ring-opacity-50 focus:outline-none 
          rounded-sm w-full p-2 font-bold text-center text-5xl text-brand-light`
        }
        placeholder="Judul"
        {...otherProps}
      />
    </form>
  );
};

export default TitleField;
