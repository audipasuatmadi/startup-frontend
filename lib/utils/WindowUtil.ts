import React from 'react';
import { TailwindBreakpoints } from './UtilTypes';

const breakpoints: [TailwindBreakpoints, number][] = [
  ['2xl', 1536],
  ['xl', 1280],
  ['lg', 1024],
  ['md', 768],
  ['sm', 640],
  ['base', 0],
];

export const checkBreakpoint = (windowWidth: number): TailwindBreakpoints => {
  let returnVal: TailwindBreakpoints = 'base';
  for (let i = 0; i < breakpoints.length; i++) {
    if (breakpoints[i][1] < windowWidth) {
      returnVal = breakpoints[i][0];
      break;
    }
  }
  return returnVal;
};

export default {
  checkBreakpoint,
};
