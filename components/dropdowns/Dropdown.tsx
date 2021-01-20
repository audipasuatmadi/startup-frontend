import React, { useEffect, useRef, useState } from 'react';

interface TogglerRenderProps {
  onClick: (e: React.MouseEvent) => void;
}

export interface DropdownProps {
  togglerRender: (props: TogglerRenderProps) => JSX.Element;

  containerAlign?: 'left' | 'center' | 'right';
  children?: JSX.Element | JSX.Element[];
}

export function useOnClickOutsideComponent(ref: React.MutableRefObject<any>, callbackFunction: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackFunction();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callbackFunction]);
}

const getDropdownContainerStyling = (containerAlign: 'left' | 'center' | 'right') => {
  return containerAlign === 'center'
    ? 'w-full'
    : containerAlign === 'left'
    ? 'w-64 left-0'
    : 'w-64 right-0';
};


const Dropdown: React.FC<DropdownProps> = ({
  togglerRender,
  containerAlign,
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClose = () => setIsOpen(!isOpen);
  const wrapperRef: React.MutableRefObject<any> = useRef(null);
  useOnClickOutsideComponent(wrapperRef, () => setIsOpen(false));

  return (
    <div className='relative inline-block' ref={wrapperRef}>
      {togglerRender({ onClick: handleOpenClose })}

      <ul
        className={`${getDropdownContainerStyling(
          containerAlign!
        )} bg-gray-200 rounded absolute shadow-md${
          isOpen ? '' : ' invisible'
        }`}
      >
        {children}
      </ul>
    </div>
  );
  
};

Dropdown.defaultProps = {
  containerAlign: 'center',
};

export default Dropdown;
