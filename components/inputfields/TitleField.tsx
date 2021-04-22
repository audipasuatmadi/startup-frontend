import React from 'react';

interface TitleField extends React.HTMLProps<HTMLTextAreaElement> {}
const TitleField = ({ id, key, className, placeholder, ...otherProps }: TitleField) => {
  return (
    <form 
      className="w-3/4"
      autoComplete="off"
    >
      <textarea
        className={
          `focus-within:border-brand focus-within:ring-4 
          ring-brand ring-opacity-50 focus:outline-none 
          rounded-sm w-full p-2 font-bold text-center text-5xl text-brand-light
          whitespace-pre-line`
        }
        rows={1}
        maxLength={26}
        placeholder="Judul"
        style={{
          resize: 'none'
        }}
        {...otherProps}
      />
    </form>
  );
};

export default TitleField;
