import { useEffect, useRef } from 'react';
import {
  startOfMonth,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  subDays,
  addDays,
} from "date-fns";
import { chunk } from "lodash";
import { v4 as uuidv4 } from 'uuid';

export const useGenerateDays = ({ length }) => {
  let arr = [];
  let day = null;
  for (let i = 0; i <= 6; i++) {
    switch (i) {
      case 0: day = "Sunday"; break;
      case 1: day = "Monday"; break;
      case 2: day = "Tuesday"; break;
      case 3: day = "Wednesday"; break;
      case 4: day = "Thursday"; break;
      case 5: day = "Friday"; break;
      case 6: day = "Saturday"; break;
      default: Error("Please supply a day");
    }
    arr.push(<th key={uuidv4()} role="columnheader" aria-label={day}>
      <abbr title={day}>{day.slice(0, length)}</abbr></th>);
  }
  return <tr>{arr}</tr>;
};

export const useGenerateDates = (state) => {
  const daysInMonth = getDaysInMonth(state);
  const firstOfMonth = startOfMonth(state);
  const lastOfMonth = endOfMonth(state);
  const startWeekday = getDay(startOfMonth(state));
  const endWeekday = getDay(endOfMonth(state));
  const daysLeft = 6 - endWeekday;

  let previous = [];
  let next = [];

  const firstDayLastMonth = subDays(firstOfMonth, startWeekday);
  const firstDayNextMonth = addDays(lastOfMonth, 1);
  for (let i = 0; i < startWeekday; i++) {
    previous.push(getDate(addDays(firstDayLastMonth, i)));
  }

  for (let i = 0; i < daysLeft; i++) {
    next.push(getDate(addDays(firstDayNextMonth, i)));
  }
  // concatenate previous, current, and next month dates 
  // dividing by 7, split into week arrays w/lodash's chunk
  const gridDays = chunk(
    [...previous.map(day => setDate(firstDayLastMonth, day)),
    ...Array.from({ length: daysInMonth },
      (_, i) => setDate(state, i + 1)),
    ...next.map(day => setDate(firstDayNextMonth, day))], 7);

  return gridDays;
};

export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
};