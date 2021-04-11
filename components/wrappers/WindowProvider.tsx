import React, { useState, useMemo, useEffect } from 'react';
import { checkBreakpoint } from '../../lib/utils/WindowUtil';
import { useDispatch } from 'react-redux';
import { windowSizeChanged } from '../../lib/utils/WindowActions';
import { TailwindBreakpoints } from '../../lib/utils/UtilTypes';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const WindowProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState<TailwindBreakpoints>('base');
  

  useEffect(() => {
    setWindowWidth(checkBreakpoint(window.innerWidth));

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        const breakpoint = checkBreakpoint(window.innerWidth)
        console.log(breakpoint)
        if (windowWidth !== breakpoint) {
          setWindowWidth(breakpoint);
          dispatch(windowSizeChanged(breakpoint));
        }
      });
    }
  }, []);

  return <>{children}</>;
};

export default WindowProvider;
