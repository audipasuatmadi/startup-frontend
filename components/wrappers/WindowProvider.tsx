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
  dispatch(windowSizeChanged(windowWidth));

  useEffect(() => {
    setWindowWidth(checkBreakpoint(window.innerWidth));

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        setWindowWidth(checkBreakpoint(window.innerWidth));
      });
    }
  }, []);

  return <>{children}</>;
};

export default WindowProvider;
